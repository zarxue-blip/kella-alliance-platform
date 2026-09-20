import * as THREE from 'three';
import { GLTFLoader } from './vendor/GLTFLoader.js';
import { MeshoptDecoder } from './vendor/meshopt_decoder.module.js';

export function createSibylRenderer(modelUrl) {
  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 180;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setSize(canvas.width, canvas.height, false);
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, canvas.width / canvas.height, .01, 20);
  camera.position.set(0, .12, 4.25);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xfff2cd, 0x243b2b, 3.1));
  const key = new THREE.DirectionalLight(0xffd98b, 4.4);
  key.position.set(2.5, 3.5, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x83d7ff, 2.1);
  rim.position.set(-3, 1.5, -2);
  scene.add(rim);
  let model = null;
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(modelUrl, (gltf) => {
    model = gltf.scene;
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 1.82 / Math.max(size.y, .001);
    model.scale.setScalar(scale);
    model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    scene.add(model);
  });
  return {
    canvas,
    render(time, facing = 1) {
      if (model) {
        model.rotation.y = (facing < 0 ? -.38 : .38) + Math.sin(time * .55) * .035;
        model.position.y = Math.sin(time * 1.7) * .018;
      }
      renderer.render(scene, camera);
    }
  };
}
