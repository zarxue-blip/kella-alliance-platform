import { findPath, simplifyPath } from './pathfinding.js';

const ASSET = '/assets/base-game/assets/';
const WORLD = { width: 1448, height: 1086 };
const GRID = { columns: 24, rows: 18, cellWidth: WORLD.width / 24, cellHeight: WORLD.height / 18 };
const SAVE_KEY = 'kella_private_base_v1';

const buildingDefinitions = {
  hub: { name: 'Alliance Hub', category: 'Buildings', asset: 'alliance-hub.png', scale: .34, footprint: [78, 48], cost: { gold: 900, wood: 700, stone: 600 } },
  archery: { name: 'Archery Range', category: 'Buildings', asset: 'archery-range.png', scale: .38, footprint: [70, 40], cost: { gold: 480, wood: 850, stone: 220 } },
  eagle: { name: 'Eagle Nest', category: 'Buildings', asset: 'eagle-nest.png', scale: .36, footprint: [70, 42], cost: { gold: 760, wood: 520, stone: 420 } },
  stable: { name: 'Elk Stable', category: 'Buildings', asset: 'elk-stable.png', scale: .34, footprint: [82, 46], cost: { gold: 620, wood: 780, stone: 260 } },
  research: { name: 'Research Sanctuary', category: 'Buildings', asset: 'research.png', scale: .34, footprint: [74, 44], cost: { gold: 820, wood: 400, stone: 720 } },
  sentry: { name: 'Ranger Sentry Post', category: 'Buildings', asset: 'ranger-sentry-post.png', scale: .4, footprint: [56, 35], cost: { gold: 320, wood: 560, stone: 180 } },
  arch: { name: 'Longleaf Arch', category: 'Decorations', asset: 'longleaf-arch.png', scale: .36, footprint: [72, 32], cost: { gold: 240, wood: 360, stone: 120 } },
  notice: { name: 'Notice Board', category: 'Decorations', asset: 'notice-board.png', scale: .42, footprint: [45, 28], cost: { gold: 120, wood: 220, stone: 40 } }
};

const defaultBuildings = [
  ['hub', 714, 530], ['archery', 500, 565], ['eagle', 900, 500], ['stable', 790, 728],
  ['research', 1015, 680], ['sentry', 405, 690], ['arch', 370, 455], ['notice', 1035, 455]
].map(([type, x, y], index) => ({ id: `starter-${index}`, type, x, y, level: 1 }));

const canvas = document.querySelector('#base-world');
const context = canvas.getContext('2d', { alpha: false });
const viewport = document.querySelector('.base-viewport');
const buildPanel = document.querySelector('#build-panel');
const selectionPanel = document.querySelector('#selection-panel');
const toast = document.querySelector('#game-toast');
const freyaVideo = document.querySelector('#freya-video');
const altarVideo = document.querySelector('#altar-video');
const resourceNodes = Object.fromEntries([...document.querySelectorAll('[data-resource]')].map((node) => [node.dataset.resource, node]));
const images = new Map();
let deviceScale = 1;
let viewWidth = 0;
let viewHeight = 0;
let selectedId = null;
let placement = null;
let category = 'Buildings';
let saveTimer = 0;

const state = loadState();
const camera = { x: WORLD.width / 2, y: WORLD.height / 2, zoom: .72, targetZoom: .72 };
const input = { pointers: new Map(), dragging: false, moved: false, lastX: 0, lastY: 0, pinchDistance: 0 };
const npc = { x: 665, y: 765, path: [], segment: 0, state: 'IDLE', idleUntil: performance.now() + 2200, facing: 1, targetLabel: 'Taking in the city' };

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (saved?.version === 1 && Array.isArray(saved.buildings)) return saved;
  } catch {}
  return { version: 1, buildings: defaultBuildings, resources: { gold: 18420, wood: 12780, stone: 9360 } };
}

function queueSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => localStorage.setItem(SAVE_KEY, JSON.stringify(state)), 120);
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
  return Math.max(.38, Math.min(viewWidth / 1180, viewHeight / 870) * .82);
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

function overlaps(a, b) {
  const ad = buildingDefinitions[a.type];
  const bd = buildingDefinitions[b.type];
  return Math.abs(a.x - b.x) < ad.footprint[0] + bd.footprint[0] && Math.abs(a.y - b.y) < ad.footprint[1] + bd.footprint[1];
}

function canPlace(candidate) {
  const definition = buildingDefinitions[candidate.type];
  if (!isInsideBase(candidate.x, candidate.y, Math.max(...definition.footprint))) return false;
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
  if (!isInsideBase(point.x, point.y, 30)) return false;
  return !state.buildings.some((building) => {
    const definition = buildingDefinitions[building.type];
    return Math.abs(point.x - building.x) < definition.footprint[0] + 18 && Math.abs(point.y - building.y) < definition.footprint[1] + 18;
  });
}

function routeTo(target) {
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
    const point = { x: 724 + Math.cos(angle) * 465 * radius, y: 575 + Math.sin(angle) * 300 * radius };
    const cell = gridFromWorld(point.x, point.y);
    if (canWalkGrid(cell.x, cell.y)) return point;
  }
  return { x: 724, y: 760 };
}

function chooseNpcDestination(now) {
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
  if (!routeTo(target)) {
    npc.state = 'IDLE';
    npc.idleUntil = now + 1800;
  }
}

function updateNpc(delta, now) {
  if (npc.state !== 'WALK') {
    if (now > npc.idleUntil) chooseNpcDestination(now);
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

function drawBuilding(building, alpha = 1, valid = true) {
  const definition = buildingDefinitions[building.type];
  const image = images.get(definition.asset);
  if (!image?.complete || !image.naturalWidth) return;
  const width = image.naturalWidth * definition.scale;
  const height = image.naturalHeight * definition.scale;
  context.save();
  context.globalAlpha = alpha;
  context.drawImage(image, building.x - width / 2, building.y - height, width, height);
  if (alpha < 1) {
    context.globalCompositeOperation = 'source-atop';
    context.fillStyle = valid ? '#57f58a66' : '#ff5d616f';
    context.fillRect(building.x - width / 2, building.y - height, width, height);
  }
  context.restore();
  if (selectedId === building.id || alpha < 1) {
    context.save();
    context.strokeStyle = alpha < 1 ? (valid ? '#75ffa0' : '#ff7478') : '#f3cd73';
    context.lineWidth = 3 / camera.zoom;
    context.setLineDash([8 / camera.zoom, 6 / camera.zoom]);
    context.beginPath();
    context.ellipse(building.x, building.y - 7, definition.footprint[0], definition.footprint[1], 0, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }
}

function drawAltar() {
  const x = 720, y = 345, width = 126, height = 126;
  context.save();
  context.shadowColor = '#8b5cff';
  context.shadowBlur = 22;
  context.beginPath();
  context.ellipse(x, y - 50, width * .48, height * .44, 0, 0, Math.PI * 2);
  context.clip();
  if (altarVideo.readyState >= 2) context.drawImage(altarVideo, x - width / 2, y - height, width, height);
  else { context.fillStyle = '#3e295d'; context.fill(); }
  context.restore();
}

function drawFreya(now) {
  const bob = npc.state === 'WALK' ? Math.sin(now * .012) * 2 : Math.sin(now * .002) * 1.2;
  const width = 74, height = 78;
  context.save();
  context.fillStyle = '#05110a66';
  context.beginPath();
  context.ellipse(npc.x, npc.y - 3, 30, 11, 0, 0, Math.PI * 2);
  context.fill();
  context.translate(npc.x, npc.y - height + bob);
  context.scale(npc.facing < 0 ? -1 : 1, 1);
  context.shadowColor = '#cab6ff';
  context.shadowBlur = 12;
  context.beginPath();
  context.roundRect(-width / 2, 0, width, height, 24);
  context.clip();
  if (freyaVideo.readyState >= 2) context.drawImage(freyaVideo, -width / 2, 0, width, height);
  else { context.fillStyle = '#2d2743'; context.fill(); context.fillStyle = '#efe5ff'; context.font = 'bold 24px Georgia'; context.textAlign = 'center'; context.fillText('F', 0, 47); }
  context.restore();
  context.save();
  context.strokeStyle = '#dcc47d';
  context.lineWidth = 2 / camera.zoom;
  context.beginPath();
  context.roundRect(npc.x - width / 2, npc.y - height + bob, width, height, 24);
  context.stroke();
  context.restore();
}

function render(now) {
  camera.zoom += (camera.targetZoom - camera.zoom) * .13;
  clampCamera();
  context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
  const gradient = context.createLinearGradient(0, 0, 0, viewHeight);
  gradient.addColorStop(0, '#0d1520');
  gradient.addColorStop(1, '#07100b');
  context.fillStyle = gradient;
  context.fillRect(0, 0, viewWidth, viewHeight);
  context.save();
  context.translate(viewWidth / 2, viewHeight / 2);
  context.scale(camera.zoom, camera.zoom);
  context.translate(-camera.x, -camera.y);
  if (mapImage.complete && mapImage.naturalWidth) context.drawImage(mapImage, 0, 0, WORLD.width, WORLD.height);
  const layers = state.buildings.filter((building) => building.id !== placement?.movingId).map((building) => ({ y: building.y, draw: () => drawBuilding(building) }));
  layers.push({ y: 345, draw: drawAltar });
  layers.push({ y: npc.y, draw: () => drawFreya(now) });
  layers.sort((a, b) => a.y - b.y).forEach((layer) => layer.draw());
  if (placement) drawBuilding(placement.preview, .68, placement.valid);
  context.restore();
  requestAnimationFrame(loop);
}

let previousTime = performance.now();
function loop(now) {
  const delta = Math.min(.05, (now - previousTime) / 1000);
  previousTime = now;
  updateNpc(delta, now);
  render(now);
}

function updateResources() {
  for (const [key, node] of Object.entries(resourceNodes)) node.textContent = Number(state.resources[key] || 0).toLocaleString();
}

function canAfford(definition) {
  return Object.entries(definition.cost).every(([key, amount]) => state.resources[key] >= amount);
}

function spend(definition) {
  for (const [key, amount] of Object.entries(definition.cost)) state.resources[key] -= amount;
  updateResources();
}

function renderBuildMenu() {
  document.querySelectorAll('[data-build-category]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.buildCategory === category)));
  const list = document.querySelector('#build-list');
  list.innerHTML = Object.entries(buildingDefinitions).filter(([, definition]) => definition.category === category).map(([key, definition]) => `
    <button class="build-card" data-build="${key}" ${canAfford(definition) ? '' : 'disabled'}>
      <img src="${ASSET}${definition.asset}" alt="" width="64" height="64"><span><strong>${definition.name}</strong><small>${definition.cost.gold} gold · ${definition.cost.wood} wood · ${definition.cost.stone} stone</small></span>
    </button>`).join('');
  list.querySelectorAll('[data-build]').forEach((button) => button.addEventListener('click', () => beginPlacement(button.dataset.build)));
}

function beginPlacement(type, movingId = null) {
  const source = movingId ? state.buildings.find((building) => building.id === movingId) : null;
  placement = { type, movingId, preview: { id: movingId || `building-${crypto.randomUUID()}`, type, x: source?.x ?? camera.x, y: source?.y ?? camera.y, level: source?.level || 1 }, valid: false };
  placement.valid = canPlace(placement.preview);
  selectedId = null;
  selectionPanel.hidden = true;
  buildPanel.classList.remove('open');
  viewport.classList.add('placing');
  document.querySelector('#placement-name').textContent = buildingDefinitions[type].name;
  document.querySelector('#placement-bar').hidden = false;
  notify('Move the preview, then tap the ground to place it.');
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
  if (npc.state === 'WALK') chooseNpcDestination(performance.now());
}

function selectAt(point) {
  const ordered = [...state.buildings].sort((a, b) => b.y - a.y);
  const hit = ordered.find((building) => {
    const definition = buildingDefinitions[building.type];
    return Math.abs(point.x - building.x) <= definition.footprint[0] && point.y <= building.y + 18 && point.y >= building.y - definition.footprint[1] * 3.2;
  });
  selectedId = hit?.id || null;
  if (!hit) { selectionPanel.hidden = true; return; }
  const definition = buildingDefinitions[hit.type];
  document.querySelector('#selection-name').textContent = definition.name;
  document.querySelector('#selection-level').textContent = `Level ${hit.level || 1}`;
  document.querySelector('#selection-image').src = ASSET + definition.asset;
  selectionPanel.hidden = false;
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
  freyaVideo.play().catch(() => {});
  altarVideo.play().catch(() => {});
});

canvas.addEventListener('pointermove', (event) => {
  if (!input.pointers.has(event.pointerId)) return;
  const position = pointerPosition(event);
  input.pointers.set(event.pointerId, position);
  if (placement) {
    const point = screenToWorld(position.x, position.y);
    placement.preview.x = point.x;
    placement.preview.y = point.y;
    placement.valid = canPlace(placement.preview);
    return;
  }
  if (input.pointers.size === 2) {
    const [a, b] = [...input.pointers.values()];
    const distance = Math.hypot(a.x - b.x, a.y - b.y);
    if (input.pinchDistance) camera.targetZoom = clamp(camera.targetZoom * distance / input.pinchDistance, minimumZoom(), 1.4);
    input.pinchDistance = distance;
    input.moved = true;
    return;
  }
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
    if (placement) confirmPlacement();
    else selectAt(screenToWorld(position.x, position.y));
  }
  if (input.pointers.size < 2) input.pinchDistance = 0;
});

canvas.addEventListener('pointercancel', (event) => input.pointers.delete(event.pointerId));
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

document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { cancelPlacement(); buildPanel.classList.remove('open'); selectionPanel.hidden = true; } });
document.querySelector('#build-toggle').addEventListener('click', () => { buildPanel.classList.toggle('open'); selectionPanel.hidden = true; renderBuildMenu(); });
document.querySelector('#build-close').addEventListener('click', () => buildPanel.classList.remove('open'));
document.querySelector('#placement-cancel').addEventListener('click', cancelPlacement);
document.querySelector('#move-building').addEventListener('click', () => { const building = state.buildings.find((item) => item.id === selectedId); if (building) beginPlacement(building.type, building.id); });
document.querySelector('#building-info').addEventListener('click', () => notify('Production and detailed stats are coming in the next expansion.'));
document.querySelector('#upgrade-building').addEventListener('click', () => notify('Building upgrades are coming soon.'));
document.querySelector('#focus-freya').addEventListener('click', () => { camera.x = npc.x; camera.y = npc.y; camera.targetZoom = Math.max(.9, minimumZoom()); notify(npc.targetLabel); });
document.querySelectorAll('[data-build-category]').forEach((button) => button.addEventListener('click', () => { category = button.dataset.buildCategory; renderBuildMenu(); }));

window.addEventListener('resize', resize);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { freyaVideo.pause(); altarVideo.pause(); }
  else { freyaVideo.play().catch(() => {}); altarVideo.play().catch(() => {}); }
});

resize();
updateResources();
renderBuildMenu();
requestAnimationFrame(loop);
