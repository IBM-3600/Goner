ctx = document.getElementById("ctx");
scene = new THREE.Scene();

arrowHelper = new THREE.ArrowHelper(
  new THREE.Vector3(1, 0, 0).normalize(),
  new THREE.Vector3(0, 0, 0),
  1,
  0xffff00
);
scene.add(arrowHelper);
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 9;
camera.rotation.x = 0.5;
//orbit controls
//control = new THREE.OrbitControl(camera, ctx);
renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  canvas: ctx,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//controls = new OrbitControls(camera, renderer.domElement);

//controls.update();
//light
light = new THREE.AmbientLight(0xffffff, 0.5);
light.position.x = 2;
light.position.y = 3;
light.position.z = 4;
scene.add(light);
//light2
light2 = new THREE.DirectionalLight(0xffffff, 0.5);
light2.position.x = 10;
light2.position.y = 5;
light2.position.z = 9;
scene.add(light2);
//plane
planeGeometry = new THREE.PlaneGeometry(10, 10);
planeMaterial = new THREE.MeshBasicMaterial({ color: 0xff11ff });
plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.position.set(0, 0, 0);
