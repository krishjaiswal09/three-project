// JSON Data representing members and node connections
const jsonData = [
  { Member: 1, "Start Node": 4, "End Node": 30 },
  { Member: 2, "Start Node": 32, "End Node": 8 },
  { Member: 3, "Start Node": 31, "End Node": 6 },
  { Member: 4, "Start Node": 7, "End Node": 1 },
  { Member: 5, "Start Node": 17, "End Node": 28 },
  { Member: 6, "Start Node": 17, "End Node": 21 },
  { Member: 7, "Start Node": 17, "End Node": 19 },
  { Member: 8, "Start Node": 20, "End Node": 14 },
  { Member: 9, "Start Node": 3, "End Node": 16 },
  { Member: 10, "Start Node": 9, "End Node": 13 },
  { Member: 11, "Start Node": 26, "End Node": 22 },
  { Member: 12, "Start Node": 29, "End Node": 27 },
  { Member: 13, "Start Node": 10, "End Node": 23 },
  { Member: 14, "Start Node": 24, "End Node": 27 },
  { Member: 15, "Start Node": 11, "End Node": 27 },
  { Member: 16, "Start Node": 5, "End Node": 2 },
  { Member: 17, "Start Node": 15, "End Node": 18 },
  { Member: 18, "Start Node": 25, "End Node": 12 },
  { Member: 19, "Start Node": 33, "End Node": 34 },
  { Member: 20, "Start Node": 35, "End Node": 36 },
  { Member: 21, "Start Node": 37, "End Node": 38 },
  { Member: 22, "Start Node": 39, "End Node": 40 },
  { Member: 23, "Start Node": 41, "End Node": 42 },
  { Member: 24, "Start Node": 43, "End Node": 44 },
];

// Coordinates for each node
const nodeCoordinates = {
  1: { x: -8.7036, y: 0, z: 49.0748 },
  2: { x: -72.9996, y: 0, z: 49.0748 },
  3: { x: -75, y: 0, z: 49.0748 },
  4: { x: -75.9996, y: 0, z: 43.8788 },
  5: { x: -78.9996, y: 0, z: 38.6828 },
  6: { x: -44.8512, y: 0, z: -13.5384 },
  7: { x: -46.8516, y: 0, z: -16.9996 },
  8: { x: -10.704, y: 0, z: 45.6104 },
  9: { x: -80.0004, y: 0, z: 40.4144 },
  10: { x: -38.148, y: 0, z: -32.0752 },
  11: { x: -34.1484, y: 0, z: -32.0752 },
  12: { x: -6, y: 0, z: -87.7576 },
  13: { x: -5.0004, y: 0, z: -89.4892 },
  14: { x: 8.7036, y: 0, z: 49.0748 },
  15: { x: 72.9996, y: 0, z: 49.0748 },
  16: { x: 75, y: 0, z: 49.0748 },
  17: { x: 75.9996, y: 0, z: 43.8788 },
  18: { x: 78.9996, y: 0, z: 38.6828 },
  19: { x: 44.8512, y: 0, z: -13.5384 },
  20: { x: 46.8516, y: 0, z: -16.9996 },
  21: { x: 10.704, y: 0, z: 45.6104 },
  22: { x: 80.0004, y: 0, z: 40.4144 },
  23: { x: 38.148, y: 0, z: -32.0752 },
  24: { x: 34.1484, y: 0, z: -32.0752 },
  25: { x: 6, y: 0, z: -87.7576 },
  26: { x: 5.0004, y: 0, z: -89.4892 },
  27: { x: 0, y: 0, z: -87.7576 },
  28: { x: 11.3127, y: 0, z: 6.5311 },
  29: { x: 11.3127, y: 0, z: -11.0822 },
  30: { x: -11.3127, y: 0, z: 6.5311 },
  31: { x: -27.4996, y: 0, z: 6.2808 },
  32: { x: -74.4996, y: 0, z: 46.4768 },
  33: { x: -64.0097, y: 60, z: 18.6111 },
  34: { x: -64.0097, y: -12, z: 18.6111 },
  35: { x: 18.5003, y: 60, z: -66.1068 },
  36: { x: 18.5003, y: -12, z: -66.1068 },
  37: { x: 54.5003, y: 60, z: -3.753 },
  38: { x: 54.5003, y: -12, z: -3.753 },
  39: { x: 72.0203, y: 60, z: 26.5926 },
  40: { x: 72.0203, y: -12, z: 26.5926 },
  41: { x: -24.1573, y: 60, z: 45.7931 },
  42: { x: -24.1573, y: -36, z: 45.7931 },
  43: { x: -59.178, y: 60, z: 46.2687 },
  44: { x: -59.178, y: -12, z: 46.2687 },
};

// Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Create the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 100;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Create OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Material for the lines
const material = new THREE.LineBasicMaterial({ color: 0xffffff });

// Create geometry and points for the lines based on the jsonData
jsonData.forEach((item) => {
  const startNode = nodeCoordinates[item["Start Node"]];
  const endNode = nodeCoordinates[item["End Node"]];

  const points = [
    new THREE.Vector3(startNode.x, startNode.y, startNode.z),
    new THREE.Vector3(endNode.x, endNode.y, endNode.z),
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // Create the line
  const line = new THREE.Line(geometry, material);
  scene.add(line);
});

// Add coordinate helper axes
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();
