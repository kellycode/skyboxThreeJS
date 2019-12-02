let scene, camera, renderer;

const daySelect = document.getElementById("day-select");
const renderButton = document.getElementById("render-btn");

renderButton.addEventListener("click", (ev) => {
    mySceneCreator();
});

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
    camera.position.set(-900, -200, -900);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);
    controls.minDistance = 500;
    controls.maxDistance = 1500;
}

function mySceneCreator(){
    let materialArray = changeMaterialArray(document.getElementById("day-select").value);

    for (let i = 0; i < 6; i++) {
        materialArray[i].side = THREE.BackSide;
    }
    let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);
    animate();
}

function changeMaterialArray(part) {
    let texture_ft, texture_bk, texture_up, texture_dn, texture_rt, texture_lf;
    let imgResourcePath = 'http://localhost:9000/resources/images/';
    let materialArray =[];
    if (part == 'Night') {
        texture_ft = new THREE.TextureLoader().load(imgResourcePath + 'arid_ft.jpg');
        texture_bk = new THREE.TextureLoader().load(imgResourcePath + 'arid_bk.jpg');
        texture_up = new THREE.TextureLoader().load(imgResourcePath + 'arid_up.jpg');
        texture_dn = new THREE.TextureLoader().load(imgResourcePath + 'arid_dn.jpg');
        texture_rt = new THREE.TextureLoader().load(imgResourcePath + 'arid_rt.jpg');
        texture_lf = new THREE.TextureLoader().load(imgResourcePath + 'arid_lf.jpg');
    }
    else {
        texture_ft = new THREE.TextureLoader().load(imgResourcePath + 'arid2_ft.jpg');
        texture_bk = new THREE.TextureLoader().load(imgResourcePath + 'arid2_bk.jpg');
        texture_up = new THREE.TextureLoader().load(imgResourcePath + 'arid2_up.jpg');
        texture_dn = new THREE.TextureLoader().load(imgResourcePath + 'arid2_dn.jpg');
        texture_rt = new THREE.TextureLoader().load(imgResourcePath + 'arid2_rt.jpg');
        texture_lf = new THREE.TextureLoader().load(imgResourcePath + 'arid2_lf.jpg');
    }
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));
    return materialArray;
}

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();
mySceneCreator();