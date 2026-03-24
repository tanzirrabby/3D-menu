import * as THREE from "https://unpkg.com/three@0.163.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.163.0/examples/jsm/controls/OrbitControls.js";

const dishCatalog = {
  "truffle-pasta": {
    title: "Truffle Cream Pasta",
    baseColor: 0xfbbf24,
    garnish: 0x3f3f46,
    type: "pasta"
  },
  "volcano-burger": {
    title: "Volcano Burger",
    baseColor: 0x92400e,
    garnish: 0xdc2626,
    type: "burger"
  },
  "sushi-zen": {
    title: "Sushi Zen Platter",
    baseColor: 0xf8fafc,
    garnish: 0xfb7185,
    type: "sushi"
  },
  "choco-dome": {
    title: "Chocolate Dome",
    baseColor: 0x451a03,
    garnish: 0xbe123c,
    type: "dessert"
  }
};

const params = new URLSearchParams(window.location.search);
const dishId = params.get("dish") || "truffle-pasta";
const dish = dishCatalog[dishId] || dishCatalog["truffle-pasta"];

document.getElementById("viewer-title").textContent = dish.title;

const canvas = document.getElementById("dish-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020617);

const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
camera.position.set(4.8, 3.4, 4.8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0.9, 0);

scene.add(new THREE.HemisphereLight(0xffffff, 0x222233, 1));
const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
keyLight.position.set(3, 6, 2);
scene.add(keyLight);

const dishGroup = new THREE.Group();
scene.add(dishGroup);

function plate() {
  const plateGeo = new THREE.CylinderGeometry(2.4, 2.5, 0.22, 64);
  const plateMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.3, metalness: 0.05 });
  const plateMesh = new THREE.Mesh(plateGeo, plateMat);
  plateMesh.position.y = -0.15;
  return plateMesh;
}

function addPasta() {
  const base = new THREE.Mesh(
    new THREE.TorusGeometry(1.05, 0.42, 24, 90),
    new THREE.MeshStandardMaterial({ color: dish.baseColor, roughness: 0.75 })
  );
  base.rotation.x = Math.PI / 2;
  dishGroup.add(base);

  for (let i = 0; i < 18; i += 1) {
    const truffle = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 12, 12),
      new THREE.MeshStandardMaterial({ color: dish.garnish, roughness: 0.9 })
    );
    truffle.position.set((Math.random() - 0.5) * 1.6, 0.18 + Math.random() * 0.2, (Math.random() - 0.5) * 1.5);
    dishGroup.add(truffle);
  }
}

function addBurger() {
  const bunTop = new THREE.Mesh(
    new THREE.SphereGeometry(1.02, 36, 26, 0, Math.PI * 2, 0, Math.PI / 1.9),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.7 })
  );
  bunTop.position.y = 1.05;
  dishGroup.add(bunTop);

  const layers = [
    { y: 0.78, h: 0.2, color: 0x166534 },
    { y: 0.56, h: 0.24, color: 0x92400e },
    { y: 0.33, h: 0.17, color: 0xfacc15 },
    { y: 0.15, h: 0.15, color: dish.garnish }
  ];

  layers.forEach((layer) => {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, layer.h, 40),
      new THREE.MeshStandardMaterial({ color: layer.color, roughness: 0.7 })
    );
    mesh.position.y = layer.y;
    dishGroup.add(mesh);
  });

  const bunBottom = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 0.2, 40),
    new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 })
  );
  dishGroup.add(bunBottom);
}

function addSushi() {
  const plank = new THREE.Mesh(
    new THREE.BoxGeometry(2.1, 0.18, 1.4),
    new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.95 })
  );
  plank.position.y = 0.03;
  dishGroup.add(plank);

  const positions = [
    [-0.65, 0.2, -0.32],
    [0, 0.2, -0.32],
    [0.65, 0.2, -0.32],
    [-0.33, 0.2, 0.35],
    [0.33, 0.2, 0.35]
  ];

  positions.forEach(([x, y, z], i) => {
    const rice = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.22, 0.28),
      new THREE.MeshStandardMaterial({ color: dish.baseColor, roughness: 0.65 })
    );
    rice.position.set(x, y, z);

    const fish = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.09, 0.3),
      new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? dish.garnish : 0xf97316, roughness: 0.45 })
    );
    fish.position.set(x, y + 0.15, z);

    dishGroup.add(rice, fish);
  });
}

function addDessert() {
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1.08, 44, 30, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: dish.baseColor, roughness: 0.35, metalness: 0.08 })
  );
  dome.position.y = 0.9;
  dishGroup.add(dome);

  const sauce = new THREE.Mesh(
    new THREE.TorusGeometry(1.18, 0.08, 14, 80),
    new THREE.MeshStandardMaterial({ color: dish.garnish, roughness: 0.5 })
  );
  sauce.rotation.x = Math.PI / 2;
  sauce.position.y = 0.02;
  dishGroup.add(sauce);
}

dishGroup.add(plate());

if (dish.type === "pasta") addPasta();
if (dish.type === "burger") addBurger();
if (dish.type === "sushi") addSushi();
if (dish.type === "dessert") addDessert();

function resize() {
  const { width, height } = canvas.getBoundingClientRect();
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", resize);
resize();

function animate() {
  controls.update();
  dishGroup.rotation.y += 0.0018;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
