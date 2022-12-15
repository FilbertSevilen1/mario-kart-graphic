import * as THREE from './three.js/build/three.module.js'
let scene, camera, renderer;
let plane,track;
function init(){
    scene = new THREE.Scene();

    let fov = 45;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspect = width/height;

    camera = new THREE.PerspectiveCamera(fov, aspect);
    camera.position.set(0,5,20);
    // camera.position.set(-5,5,15);
    camera.lookAt(0,0,0);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setClearColor('skyblue');
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
}

function loadTexture(name){
    let loader = new THREE.TextureLoader();
    let texture = loader.load(name);

    return texture
}

//lighting
function createAmbientLight(){
    let light = new THREE.AmbientLight("white", 0.5);
    light.castShadow = true;
    scene.add(light);
}

function createPlane(w,h){
    let texture = loadTexture('./asset/grass.jpeg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(50,50)
    texture.rotation = Math.PI/2
    let geometry = new THREE.PlaneGeometry(w,h);
    let material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: texture,
    })
    let plane = new THREE.Mesh(geometry, material);
    plane.rotateX(Math.PI/2)
    plane.position.x = 0
    plane.receiveShadow = true;
    return plane;
}


function createTrack(w,h){
    let texture = loadTexture('./asset/road.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2,1)
    texture.rotation = Math.PI/2
    let geometry = new THREE.PlaneGeometry(w,h);
    let material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: texture,
    })
    let plane = new THREE.Mesh(geometry, material);
    plane.rotateX(Math.PI/2)
    plane.position.x = 0
    plane.position.y = 0.01
    plane.receiveShadow = true;
    return plane;
}

function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function load(){
    createAmbientLight();

    plane = createPlane(100,50);
    scene.add(plane)

    track = createTrack(10,50);
    scene.add(track)
}

window.onload = () =>{
    init();
    load();
    render();
}