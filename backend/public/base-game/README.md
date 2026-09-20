# Freya's Sanctuary

Private browser prototype served at `/base`. Production access requires an authenticated Kella user whose stored role is `Owner`.

## Controls

- Drag or touch-drag the world to pan.
- Use the mouse wheel or pinch gesture to zoom.
- Open **Build**, choose a structure, move the preview, and click/tap a clear location.
- Select an existing structure for Move, Info, and Upgrade controls.
- Press Escape, right-click, or choose Cancel to leave placement mode.
- Choose **Find Freya** to center the camera on her.

Placed structures and prototype resource balances are saved in browser `localStorage` under `kella_private_base_v1`.

## Architecture

- `game.js` owns rendering, input, camera movement, placement, saving, resources, and Freya's NPC state.
- `pathfinding.js` contains A* navigation and path simplification.
- `base-game.css` contains the responsive HUD and game panels.
- `assets/` contains copies of the owner-provided source artwork. Original files remain unchanged in the source folder.

Freya uses the supplied rendered MP4 because the asset pack contains no GLB, GLTF, FBX, or OBJ model. Her walking controller, path state, and target selection live in `game.js`. A future 3D model can replace `drawFreya` while keeping the same navigation state.

Building definitions live in the `buildingDefinitions` object near the top of `game.js`. Add a transparent PNG to `assets/`, then add its name, category, scale, collision footprint, and resource cost to that object.
