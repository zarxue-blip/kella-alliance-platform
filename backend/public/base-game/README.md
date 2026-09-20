# Sibyl's Sanctuary

Private browser prototype served at `/base`. Production access requires an authenticated Kella user whose stored role is `Owner`.

## Controls

- Drag or touch-drag the world to pan.
- Use the mouse wheel or pinch gesture to zoom.
- Open **Build**, choose a structure, move the preview, and click/tap a clear location.
- Select an existing structure for Move, Info, and Upgrade controls.
- Press Escape, right-click, or choose Cancel to leave placement mode.
- Choose **Find a villager** to center the camera on Sibyl or a roaming villager.

Placed structures and prototype resource balances are saved in browser `localStorage` under `kella_private_base_v1`.

## Architecture

- `game.js` owns rendering, input, camera movement, square-grid placement, saving, resources, and NPC state.
- `pathfinding.js` contains A* navigation and path simplification.
- `base-game.css` contains the responsive HUD and game panels.
- `assets/` contains copies of the owner-provided source artwork. Original files remain unchanged in the source folder.

Sibyl uses the supplied FBX model converted to an optimized GLB. The smaller villagers use chroma-keyed character clips as animated sprites. Every character shares the same pathfinding controller and stays inside the sanctuary.

Building definitions live in the `buildingDefinitions` object near the top of `game.js`. Add a transparent PNG to `assets/`, then add its name, category, scale, collision footprint, and resource cost to that object.
