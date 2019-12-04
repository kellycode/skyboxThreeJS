let scene, camera, renderer, time, controls;
time = timeNow()
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

    controls = new THREE.OrbitControls(camera, renderer.domElement);
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
    textGenerator();
    setInterval(textGenerator, 30000)
    // scene.add(digitalClock);
    animate();
}

function textGenerator(){
    let fontLoader = new THREE.FontLoader();

    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function(font) {
    let digitalClock =  createTextMesh(timeNow(), font, 80, new THREE.MeshPhongMaterial({
        color: 0x40476d,
        specular: 0x555555,
        shininess: 30
    }));
    digitalClock.name ='digitialClock';
    let selectedObject = scene.getObjectByName('digitialClock');
    if(selectedObject){
        scene.remove(selectedObject);
    }
    scene.add(digitalClock);
    });
}
function timeNow() {
    var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
      s = (d.getSeconds()<10?'0':'') + d.getSeconds();
    return h + ':' + m+":"+s;
  }

function changeMaterialArray(part) {
    let texture_ft, texture_bk, texture_up, texture_dn, texture_rt, texture_lf;
//     let imgResourcePath = 'http://localhost:9000/resources/images/';
    let imgResourcePath = 'resources/images/'
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
    controls.update();
    
}

function createTextMesh(text, font, size, mat) {
    var geo = new THREE.TextGeometry(text, {
         font: font,
         size: size,
         height: 10,
         curveSegments: 12,
         bevelEnabled: true,
         material: 0,
         extrudeMaterial: 1
     });

     geo.center();
     geo.computeBoundingBox();

     return new THREE.Mesh(geo, mat);
 }
 function foo(){
    console.log('function is being called')
}



init();
mySceneCreator();
