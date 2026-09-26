import { GROUND, toGround, fromGround, snapPoint, corners, fits, collides } from './placement.js?v=2';
import { createScenery, drawBuildingShadow, drawBuildingMagic, drawAtmosphere } from './scenery.js?v=1';
import { findPath, simplifyPath } from './pathfinding.js';

const ASSET = '/assets/base-game/assets/';
const WORLD = { width: 1448, height: 1086 };
const GRID = { columns: 24, rows: 18, cellWidth: WORLD.width / 24, cellHeight: WORLD.height / 18 };
const plotSizes = { hub: 5, archery: 4, eagle: 4, stable: 5, research: 4, sentry: 3, arch: 4, notice: 3, infantry: 4, admin: 4 };
const BUILDING_SCALE = .82;
let editorMode = false;
const LAYOUT_VERSION = 6;
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let reducedMotion = motionPreference.matches;
motionPreference.addEventListener('change', () => { reducedMotion = motionPreference.matches; });

const characterDefinitions = [
  { name: 'Elven Seer', asset: 'elf-1.mp4', scale: .74 },
  { name: 'Elven Ranger', asset: 'elf-4.mp4', scale: .72 },
  { name: 'Goblin Guard', asset: 'goblin-1.mp4', scale: .68 },
  { name: 'Goblin Scout', asset: 'goblin-5.mp4', scale: .66 },
  { name: 'Meadow Pixie', asset: 'pixie-1.mp4', scale: .62, flying: true },
  { name: 'Lantern Pixie', asset: 'pixie-4.mp4', scale: .6, flying: true },
  { name: 'Star Wizard', asset: 'wizard-1.mp4', scale: .7 },
  { name: 'Woodland Mage', asset: 'wizard-5.mp4', scale: .68 }
];

const buildingDefinitions = {
  hub: { name: 'Alliance Hub', category: 'Buildings', asset: 'alliance-hub.png', scale: .28, footprint: [78, 48], cost: { gold: 900, wood: 700, stone: 600 } },
  archery: { name: 'Archery Range', category: 'Buildings', asset: 'archery-range.png', scale: .31, footprint: [70, 40], cost: { gold: 480, wood: 850, stone: 220 } },
  eagle: { name: 'Flying Unit', category: 'Buildings', asset: 'eagle-nest.png', scale: .29, footprint: [70, 42], cost: { gold: 760, wood: 520, stone: 420 } },
  stable: { name: 'Cavalry', category: 'Buildings', asset: 'elk-stable.png', scale: .28, footprint: [82, 46], cost: { gold: 620, wood: 780, stone: 260 } },
  research: { name: 'Research Sanctuary', category: 'Buildings', asset: 'research.png', scale: .23, footprint: [62, 38], cost: { gold: 820, wood: 400, stone: 720 } },
  sentry: { name: 'Archer', category: 'Buildings', asset: 'ranger-sentry-post.png', scale: .27, footprint: [48, 30], cost: { gold: 320, wood: 560, stone: 180 } },
  arch: { name: 'Mage', category: 'Decorations', asset: 'longleaf-arch.png', scale: .24, footprint: [60, 28], cost: { gold: 240, wood: 360, stone: 120 } },
  notice: { name: 'Notice Board', category: 'Decorations', asset: 'notice-board.png', scale: .27, footprint: [38, 24], cost: { gold: 120, wood: 220, stone: 40 } },
  infantry: { name: 'Infantry', category: 'Buildings', asset: 'infantry.png', scale: .39, footprint: [48, 34], cost: {} },
  admin: { name: 'Admin Tools', category: 'Buildings', asset: 'admin-tools.png', scale: .34, footprint: [54, 38], cost: {} }
};

const defaultBuildings = [
  ['hub', 476, 532], ['archery', 700, 504], ['stable', 924, 504], ['sentry', 448, 616],
  ['arch', 504, 700], ['notice', 644, 728], ['research', 784, 700], ['eagle', 924, 672],
  ['infantry', 590, 820], ['admin', 800, 820]
].map(([type, x, y], index) => ({ id: `starter-${index}`, type, x, y, level: 1 }));

const canvas = document.querySelector('#base-world');
const context = canvas.getContext('2d', { alpha: false });
const viewport = document.querySelector('.base-viewport');
const buildPanel = document.querySelector('#build-panel');
const toast = document.querySelector('#game-toast');
const characterVideos = [...document.querySelectorAll('[data-character-video]')];
const buildingToolModal = document.querySelector('#building-tool-modal');
const buildingToolFrame = document.querySelector('#building-tool-frame');
const buildingToolTitle = document.querySelector('#building-tool-title');
const images = new Map();
let deviceScale = 1;
let viewWidth = 0;
let viewHeight = 0;
let hoveredId = null;
let placement = null;
let category = 'Buildings';


const state = { version: LAYOUT_VERSION, buildings: defaultBuildings.map((building) => ({ ...building })) };
let layoutLoaded = false;
let saveTimer = 0;
const camera = { x: WORLD.width / 2, y: WORLD.height / 2, zoom: .72, targetZoom: .72 };
const input = { pointers: new Map(), dragging: false, moved: false, lastX: 0, lastY: 0, pinchDistance: 0 };
const roamingVillagers = characterDefinitions.map((definition, index) => ({
  definition,
  video: characterVideos[index],
  frame: document.createElement('canvas'),
  x: 565 + (index % 4) * 105,
  y: 590 + Math.floor(index / 4) * 110,
  path: [], segment: 0, state: 'IDLE',
  idleUntil: performance.now() + 500 + index * 420,
  facing: index % 2 ? -1 : 1,
  targetLabel: 'Exploring the sanctuary', lastFrameAt: 0
}));
const npcs = roamingVillagers;

function normalizeBuildings(raw) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  return raw.filter((building) => {
    if (!buildingDefinitions[building?.type] || seen.has(building.type)) return false;
    if (!Number.isFinite(building.x) || !Number.isFinite(building.y)) return false;
    seen.add(building.type);
    return true;
  }).map((building) => ({ id: String(building.id || `building-${crypto.randomUUID()}`), type: building.type, x: building.x, y: building.y, level: Number(building.level || 1) }));
}

function queueSave() {
  if (!layoutLoaded) return;
  clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => persistLayout(), 300);
}

async function persistLayout(keepalive = false) {
  try {
    const response = await fetch('/api/dashboard/base-layout', {
      method: 'PUT', credentials: 'same-origin', keepalive, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { version: LAYOUT_VERSION, buildings: state.buildings } })
    });
    if (!response.ok) throw new Error('save failed');
  } catch { if (!keepalive) notify('Your layout could not be saved. Please try again.'); }
}

async function loadMemberLayout() {
  try {
    const response = await fetch('/api/dashboard/base-layout', { credentials: 'same-origin', cache: 'no-store' });
    if (!response.ok) throw new Error('load failed');
    const payload = await response.json();
    const saved = payload?.data?.version === LAYOUT_VERSION ? normalizeBuildings(payload.data.buildings) : [];
    if (saved.length) state.buildings.splice(0, state.buildings.length, ...saved);
  } catch { notify('Using the default layout until your saved base is available.'); }
  layoutLoaded = true;
  renderBuildMenu();
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove('visible'), 2200);
}

function loadImage(file) {
  if (images.has(file)) return images.get(file);
  const image = new Image();
  image.decoding = 'async';
  image.src = ASSET + file;
  images.set(file, image);
  return image;
}

const mapImage = loadImage('map.png');
const scenery = createScenery(mapImage, motionPreference);
Object.values(buildingDefinitions).forEach((definition) => loadImage(definition.asset));

function resize() {
  const bounds = viewport.getBoundingClientRect();
  viewWidth = bounds.width;
  viewHeight = bounds.height;
  deviceScale = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(viewWidth * deviceScale);
  canvas.height = Math.round(viewHeight * deviceScale);
  canvas.style.width = `${viewWidth}px`;
  canvas.style.height = `${viewHeight}px`;
  context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
  camera.zoom = clamp(camera.zoom, minimumZoom(), 1.4);
  camera.targetZoom = camera.zoom;
  clampCamera();
}

function minimumZoom() {
  return Math.max(.2, Math.min(viewWidth / WORLD.width, (viewHeight - 120) / WORLD.height) * .96);
}

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

function clampCamera() {
  const halfWidth = Math.min(WORLD.width / 2, viewWidth / (2 * camera.zoom));
  const halfHeight = Math.min(WORLD.height / 2, viewHeight / (2 * camera.zoom));
  camera.x = clamp(camera.x, halfWidth, WORLD.width - halfWidth);
  camera.y = clamp(camera.y, halfHeight, WORLD.height - halfHeight);
}

function screenToWorld(x, y) {
  return { x: (x - viewWidth / 2) / camera.zoom + camera.x, y: (y - viewHeight / 2) / camera.zoom + camera.y };
}

function worldToScreen(x, y) {
  return { x: (x - camera.x) * camera.zoom + viewWidth / 2, y: (y - camera.y) * camera.zoom + viewHeight / 2 };
}

function isInsideBase(x, y, margin = 0) {
  const dx = (x - 724) / (500 - margin);
  const dy = (y - 575) / (335 - margin);
  return dx * dx + dy * dy < 1;
}

function isFootprintInside(candidate) { return fits(candidate, plotSizes[candidate.type]); }
function overlaps(a,b) { return collides(a,plotSizes[a.type],b,plotSizes[b.type]); }

function canPlace(candidate) {
  if (!isFootprintInside(candidate)) return false;
  if (!placement?.movingId && state.buildings.some((building) => building.type === candidate.type)) return false;
  return !state.buildings.some((building) => building.id !== placement?.movingId && overlaps(candidate, building));
}

function gridFromWorld(x, y) {
  return { x: clamp(Math.floor(x / GRID.cellWidth), 0, GRID.columns - 1), y: clamp(Math.floor(y / GRID.cellHeight), 0, GRID.rows - 1) };
}

function worldFromGrid(x, y) {
  return { x: (x + .5) * GRID.cellWidth, y: (y + .5) * GRID.cellHeight };
}

function canWalkGrid(x, y) {
  if (x < 0 || y < 0 || x >= GRID.columns || y >= GRID.rows) return false;
  const point = worldFromGrid(x, y);
  if (!isInsideBase(point.x, point.y, 95)) return false;
  return !state.buildings.some((building) => {
    const definition = buildingDefinitions[building.type];
    return Math.abs(point.x - building.x) < definition.footprint[0] + 18 && Math.abs(point.y - building.y) < definition.footprint[1] + 18;
  });
}

function routeTo(npc, target) {
  const start = gridFromWorld(npc.x, npc.y);
  const goal = gridFromWorld(target.x, target.y);
  const gridPath = simplifyPath(findPath(start, goal, canWalkGrid));
  if (gridPath.length < 2) return false;
  npc.path = gridPath.slice(1).map((cell) => worldFromGrid(cell.x, cell.y));
  npc.segment = 0;
  npc.state = 'WALK';
  npc.targetLabel = target.label || 'Exploring the grounds';
  return true;
}

function randomOpenPoint() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * .72;
    const point = { x: GROUND.x + Math.cos(angle) * (GROUND.rx - 28) * radius, y: GROUND.y + Math.sin(angle) * (GROUND.ry - 28) * radius };
    const cell = gridFromWorld(point.x, point.y);
    if (canWalkGrid(cell.x, cell.y)) return point;
  }
  return { x: 724, y: 760 };
}

function chooseNpcDestination(npc, now) {
  const roll = Math.random();
  let target;
  if (roll < .52 && state.buildings.length) {
    const building = state.buildings[Math.floor(Math.random() * state.buildings.length)];
    const offset = Math.random() > .5 ? 1 : -1;
    target = { x: building.x + offset * (buildingDefinitions[building.type].footprint[0] + 48), y: building.y + 38, label: `Visiting ${buildingDefinitions[building.type].name}` };
  } else if (roll < .67) {
    target = { x: 724, y: 650, label: 'Checking the heart of the base' };
  } else if (roll < .82) {
    npc.state = 'IDLE';
    npc.idleUntil = now + 3500 + Math.random() * 5000;
    npc.targetLabel = 'Watching over the settlement';
    return;
  } else {
    target = { ...randomOpenPoint(), label: 'Walking the green' };
  }
  if (!routeTo(npc, target)) {
    npc.state = 'IDLE';
    npc.idleUntil = now + 1800;
  }
}

function updateNpc(npc, delta, now) {
  if (npc.state !== 'WALK') {
    if (now > npc.idleUntil) chooseNpcDestination(npc, now);
    return;
  }
  const target = npc.path[npc.segment];
  if (!target) {
    npc.state = 'IDLE';
    npc.idleUntil = now + 1800 + Math.random() * 4200;
    npc.targetLabel = Math.random() > .45 ? 'Looking around' : 'Resting beside the path';
    return;
  }
  const dx = target.x - npc.x;
  const dy = target.y - npc.y;
  const distance = Math.hypot(dx, dy);
  const speed = 62;
  npc.facing += (Math.sign(dx || npc.facing) - npc.facing) * Math.min(1, delta * 9);
  if (distance < speed * delta) {
    npc.x = target.x;
    npc.y = target.y;
    npc.segment += 1;
  } else {
    npc.x += dx / distance * speed * delta;
    npc.y += dy / distance * speed * delta;
  }
}

function drawBuilding(building, alpha = 1, valid = true, now = performance.now()) {
  const definition = buildingDefinitions[building.type];
  const image = images.get(definition.asset);
  if (!image?.complete || !image.naturalWidth) return;
  const width = image.naturalWidth * definition.scale * BUILDING_SCALE;
  const height = image.naturalHeight * definition.scale * BUILDING_SCALE;
  context.save();
  context.globalAlpha = alpha;
  if (alpha === 1) drawBuildingShadow(context, image, building.x, building.y, width, height);
  if (alpha === 1 && hoveredId === building.id && !placement) {
    context.shadowColor = '#ffffff';
    context.shadowBlur = 22;
  }
  context.drawImage(image, building.x - width / 2, building.y - height, width, height);
  context.restore();
  if (alpha === 1) drawBuildingMagic(context, building, width, height, now, reducedMotion);
  if (alpha < 1) {
    context.save();
    context.fillStyle = valid ? '#48f27c40' : '#ff4f5645';
    context.strokeStyle = valid ? '#75ffa0' : '#ff7478';
    context.lineWidth = 3 / camera.zoom;
    context.setLineDash([]);
    const points = corners(building, plotSizes[building.type]);
    context.beginPath(); points.forEach((p,i) => i ? context.lineTo(p.x,p.y) : context.moveTo(p.x,p.y));
    context.closePath(); context.fill(); context.stroke();
    context.restore();
  }
}

function updateCharacterFrame(npc, now) {
  if (!npc.video || npc.video.readyState < 2 || now - npc.lastFrameAt < 66) return;
  npc.lastFrameAt = now;
  const size = 86;
  npc.frame.width = size;
  npc.frame.height = size;
  const frameContext = npc.frame.getContext('2d', { willReadFrequently: true });
  frameContext.clearRect(0, 0, size, size);
  frameContext.drawImage(npc.video, 0, 0, size, size);
  const pixels = frameContext.getImageData(0, 0, size, size);
  for (let offset = 0; offset < pixels.data.length; offset += 4) {
    const red = pixels.data[offset];
    const green = pixels.data[offset + 1];
    const blue = pixels.data[offset + 2];
    if (red > 155 && blue > 115 && green < 145 && red > green * 1.25 && blue > green * 1.1) pixels.data[offset + 3] = 0;
  }
  frameContext.putImageData(pixels, 0, 0);
}

function drawNpc(npc, now) {
  updateCharacterFrame(npc, now);
  const isFlying = Boolean(npc.definition.flying);
  const isWalking = npc.state === 'WALK';
  const flightLift = isFlying ? 21 + Math.sin(now * .006 + npc.x * .01) * 5 : 0;
  const bob = isFlying
    ? Math.sin(now * .01 + npc.y * .01) * 3
    : isWalking ? Math.abs(Math.sin(now * .011)) * 3 : Math.sin(now * .002) * 1.2;
  const width = 46 * npc.definition.scale;
  const height = 50 * npc.definition.scale;
  context.save();
  context.fillStyle = isFlying ? '#d7f8ff2b' : '#05110a66';
  context.beginPath();
  context.ellipse(npc.x, npc.y - 2, width * (isFlying ? .24 : .36), height * (isFlying ? .07 : .12), 0, 0, Math.PI * 2);
  context.fill();
  context.translate(npc.x, npc.y - height - flightLift + bob);
  context.scale(npc.facing < 0 ? -1 : 1, 1);
  context.shadowColor = '#f4cf72aa';
  context.shadowBlur = 5;
  if (npc.frame.width) context.drawImage(npc.frame, -width / 2, 0, width, height);
  context.restore();
}

function drawBuildingLabel(building) {
  const definition = buildingDefinitions[building.type];
  context.save();
  context.font = '600 13px Georgia, serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  const labelWidth = context.measureText(definition.name).width + 16;
  const labelY = building.y + 15;
  context.fillStyle = '#101710ef';
  context.strokeStyle = '#d6b45dcc';
  context.lineWidth = 1.4 / camera.zoom;
  context.beginPath();
  context.roundRect(building.x - labelWidth / 2, labelY - 11, labelWidth, 22, 7);
  context.fill();
  context.stroke();
  context.fillStyle = '#fff0c8';
  context.fillText(definition.name, building.x, labelY + .5);
  context.restore();
}

function drawPlacementGrid() {
  if (!placement && !editorMode) return;
  context.save(); context.beginPath();
  context.ellipse(GROUND.x,GROUND.y,GROUND.rx,GROUND.ry,0,0,Math.PI*2); context.clip();
  context.strokeStyle='#e5f7c866'; context.lineWidth=.8/camera.zoom; context.beginPath();
  for(let i=-50;i<=50;i++) {
    for(const endpoints of [[[i,-50],[i,50]],[[-50,i],[50,i]]]) {
      const a=fromGround(...endpoints[0]),b=fromGround(...endpoints[1]);context.moveTo(a.x,a.y);context.lineTo(b.x,b.y);
    }
  }
  context.stroke();context.restore();
}

function updatePlacement(point) {
  if(!placement) return;
  Object.assign(placement.preview,snapPoint(point.x,point.y,plotSizes[placement.type]));
  placement.valid=canPlace(placement.preview);
  document.querySelector('#placement-confirm').disabled=!placement.valid;
  document.querySelector('#placement-status').textContent=placement.valid?'Ready to place':'Blocked or outside walls';
}

function render(now) {
  camera.zoom += (camera.targetZoom - camera.zoom) * .13;
  clampCamera();
  context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
  const gradient = context.createLinearGradient(0, 0, 0, viewHeight);
  gradient.addColorStop(0, '#243a35');
  gradient.addColorStop(1, '#101d1c');
  context.fillStyle = gradient;
  context.fillRect(0, 0, viewWidth, viewHeight);
  context.save();
  context.translate(viewWidth / 2, viewHeight / 2);
  context.scale(camera.zoom, camera.zoom);
  context.translate(-camera.x, -camera.y);
  scenery.draw(context, now);
  drawPlacementGrid();
  const layers = state.buildings.filter((building) => building.id !== placement?.movingId).map((building) => ({ y: building.y, draw: () => drawBuilding(building, 1, true, now) }));
  npcs.forEach((npc) => layers.push({ y: npc.y, draw: () => drawNpc(npc, now) }));
  layers.sort((a, b) => a.y - b.y).forEach((layer) => layer.draw());
  drawAtmosphere(context, now, reducedMotion);
  const hoveredBuilding = state.buildings.find((building) => building.id === hoveredId && building.id !== placement?.movingId);
  if (hoveredBuilding) drawBuildingLabel(hoveredBuilding);
  if (placement) drawBuilding(placement.preview, .68, placement.valid, now);
  context.restore();
  requestAnimationFrame(loop);
}

let previousTime = performance.now();
function loop(now) {
  const delta = Math.min(.05, (now - previousTime) / 1000);
  previousTime = now;
  npcs.forEach((npc) => updateNpc(npc, delta, now));
  render(now);
}

function canAfford(definition) {
  return Boolean(definition);
}

function spend() {}

function renderBuildMenu() {
  document.querySelectorAll('[data-build-category]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.buildCategory === category)));
  const list = document.querySelector('#build-list');
  list.innerHTML = Object.entries(buildingDefinitions).filter(([, definition]) => definition.category === category).map(([key, definition]) => {
    const alreadyPlaced = state.buildings.some((building) => building.type === key);
    return `
    <button class="build-card" data-build="${key}" ${canAfford(definition) && !alreadyPlaced ? '' : 'disabled'}>
      <img src="${ASSET}${definition.asset}" alt="" width="64" height="64"><span><strong>${definition.name}</strong><small>Place inside the alliance grounds</small></span>
      ${alreadyPlaced ? '<em>Placed</em>' : ''}
    </button>`;
  }).join('');
  list.querySelectorAll('[data-build]').forEach((button) => button.addEventListener('click', () => beginPlacement(button.dataset.build)));
}

function beginPlacement(type, movingId = null) {
  if (!layoutLoaded) return notify('Your base is still loading.');
  const source = movingId ? state.buildings.find((building) => building.id === movingId) : null;
  placement = { type, movingId, preview: { id: movingId || `building-${crypto.randomUUID()}`, type, x: source?.x ?? camera.x, y: source?.y ?? camera.y, level: source?.level || 1 }, valid: false };
  updatePlacement(placement.preview);
  buildPanel.classList.remove('open');
  viewport.classList.add('placing');
  document.querySelector('#placement-name').textContent = buildingDefinitions[type].name;
  document.querySelector('#placement-bar').hidden = false;
  notify('Drag or tap a square, then confirm with the check mark.');
}

function cancelPlacement() {
  placement = null;
  viewport.classList.remove('placing');
  document.querySelector('#placement-bar').hidden = true;
}

function confirmPlacement() {
  if (!placement?.valid) return notify('That space is blocked.');
  const definition = buildingDefinitions[placement.type];
  if (placement.movingId) {
    const index = state.buildings.findIndex((building) => building.id === placement.movingId);
    state.buildings[index] = { ...placement.preview };
    notify(`${definition.name} moved.`);
  } else {
    if (!canAfford(definition)) return notify('Not enough resources.');
    spend(definition);
    state.buildings.push({ ...placement.preview });
    notify(`${definition.name} placed.`);
  }
  cancelPlacement();
  queueSave();
  npcs.filter((npc) => npc.state === 'WALK').forEach((npc) => chooseNpcDestination(npc, performance.now()));
}

function buildingAt(point) {
  const ordered = [...state.buildings].sort((a, b) => b.y - a.y);
  return ordered.find((building) => {
    const definition = buildingDefinitions[building.type];
    return Math.abs(point.x - building.x) <= definition.footprint[0] && point.y <= building.y + 18 && point.y >= building.y - definition.footprint[1] * 3.2;
  });
}

function selectAt(point) {
  const hit = buildingAt(point);
  if (hit && editorMode) { beginPlacement(hit.type,hit.id); return; }
  if (!hit) return;
  if (hit.type === 'hub') window.location.assign('/members');
  else if (hit.type === 'notice') window.location.assign('/calendar');
  else if (hit.type === 'research') openBuildingTool('/research?embedded=1', 'Research Sanctuary');
  else if (hit.type === 'infantry') openTrainingTool('infantry', 'Infantry');
  else if (hit.type === 'arch') openTrainingTool('mage', 'Mage');
  else if (hit.type === 'sentry' || hit.type === 'archery') openTrainingTool('archer', 'Archer');
  else if (hit.type === 'stable') openTrainingTool('cavalry', 'Cavalry');
  else if (hit.type === 'eagle') openTrainingTool('flying', 'Flying Unit');
  else if (hit.type === 'admin') window.location.assign('/officer');
}

function openBuildingTool(path, title) {
  buildingToolTitle.textContent = title;
  buildingToolFrame.title = title;
  buildingToolFrame.src = path;
  buildingToolModal.hidden = false;
}

function openTrainingTool(troopType, title) {
  openBuildingTool(`/training-tools?troop=${encodeURIComponent(troopType)}&embedded=1`, `${title} Training`);
}

function closeBuildingTool() {
  buildingToolModal.hidden = true;
  buildingToolFrame.src = 'about:blank';
}

function pointerPosition(event) {
  const bounds = canvas.getBoundingClientRect();
  return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
}

canvas.addEventListener('pointerdown', (event) => {
  canvas.setPointerCapture(event.pointerId);
  const position = pointerPosition(event);
  input.pointers.set(event.pointerId, position);
  input.lastX = position.x;
  input.lastY = position.y;
  input.dragging = false;
  input.moved = false;
  if (input.pointers.size === 2) {
    const [a, b] = [...input.pointers.values()];
    input.pinchDistance = Math.hypot(a.x - b.x, a.y - b.y);
  }
  characterVideos.forEach((video) => video.play().catch(() => {}));
});

canvas.addEventListener('pointermove', (event) => {
  const position = pointerPosition(event);
  if (!input.pointers.has(event.pointerId)) {
    hoveredId = buildingAt(screenToWorld(position.x, position.y))?.id || null;
    viewport.classList.toggle('building-hovered', Boolean(hoveredId) && !editorMode);
    return;
  }
  input.pointers.set(event.pointerId, position);
  if (input.pointers.size === 2) {
    const [a, b] = [...input.pointers.values()];
    const distance = Math.hypot(a.x - b.x, a.y - b.y);
    if (input.pinchDistance) camera.targetZoom = clamp(camera.targetZoom * distance / input.pinchDistance, minimumZoom(), 1.4);
    input.pinchDistance = distance;
    input.moved = true;
    return;
  }
  if (placement) { updatePlacement(screenToWorld(position.x,position.y)); input.moved=true; return; }
  const dx = position.x - input.lastX;
  const dy = position.y - input.lastY;
  if (Math.hypot(dx, dy) > 2) input.dragging = input.moved = true;
  if (input.dragging) {
    camera.x -= dx / camera.zoom;
    camera.y -= dy / camera.zoom;
    clampCamera();
  }
  input.lastX = position.x;
  input.lastY = position.y;
});

canvas.addEventListener('pointerup', (event) => {
  const position = pointerPosition(event);
  input.pointers.delete(event.pointerId);
  if (!input.moved) {
    if (placement) updatePlacement(screenToWorld(position.x,position.y));
    else selectAt(screenToWorld(position.x, position.y));
  }
  if (input.pointers.size < 2) input.pinchDistance = 0;
});

canvas.addEventListener('pointercancel', (event) => input.pointers.delete(event.pointerId));
canvas.addEventListener('pointerleave', () => { hoveredId = null; viewport.classList.remove('building-hovered'); });
canvas.addEventListener('contextmenu', (event) => { event.preventDefault(); cancelPlacement(); });
canvas.addEventListener('wheel', (event) => {
  event.preventDefault();
  const position = pointerPosition(event);
  const before = screenToWorld(position.x, position.y);
  camera.targetZoom = clamp(camera.targetZoom * Math.exp(-event.deltaY * .0012), minimumZoom(), 1.4);
  const afterZoom = camera.targetZoom;
  camera.x = before.x - (position.x - viewWidth / 2) / afterZoom;
  camera.y = before.y - (position.y - viewHeight / 2) / afterZoom;
  clampCamera();
}, { passive: false });

document.addEventListener('keydown', (event) => { if (event.key === 'Enter' && placement) { event.preventDefault(); confirmPlacement(); } if (event.key === 'Escape') { cancelPlacement(); buildPanel.classList.remove('open'); closeBuildingTool(); } });
document.querySelector('#build-toggle').addEventListener('click', () => { buildPanel.classList.toggle('open'); renderBuildMenu(); });
document.querySelector('#build-close').addEventListener('click', () => buildPanel.classList.remove('open'));
document.querySelector('#placement-cancel').addEventListener('click', cancelPlacement);
document.querySelector('#placement-confirm').addEventListener('click',confirmPlacement);
document.querySelector('#edit-layout').addEventListener('click', () => {
  editorMode=!editorMode;cancelPlacement();
  document.querySelector('#edit-layout').textContent=editorMode?'Done':'Arrange';
  document.querySelector('#edit-layout').setAttribute('aria-pressed',String(editorMode));
  notify(editorMode?'Select a building to move it. Drag empty ground to explore.':'Layout saved.');
});
document.querySelector('#fit-base').addEventListener('click', () => {
  camera.x=724;camera.y=560;camera.targetZoom=minimumZoom();
});
document.querySelector('#building-tool-close').addEventListener('click', closeBuildingTool);
buildingToolModal.addEventListener('click', (event) => { if (event.target === buildingToolModal) closeBuildingTool(); });
document.querySelectorAll('[data-build-category]').forEach((button) => button.addEventListener('click', () => { category = button.dataset.buildCategory; renderBuildMenu(); }));

window.addEventListener('resize', resize);
window.addEventListener('pagehide', () => { if (layoutLoaded) persistLayout(true); });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) characterVideos.forEach((video) => video.pause());
  else characterVideos.forEach((video) => video.play().catch(() => {}));
});

resize();
renderBuildMenu();
loadMemberLayout();
requestAnimationFrame(loop);
