//import * as THREE from 'three';
//import * as THREE from '../../node_modules/three/build/three.js';
import * as THREE from 'three';//'../../node_modules/three/src/Three.js';
import {OBJLoader} from 'OBJLoader';
import {GLTFLoader} from 'GLTFLoader';
import {DRACOLoader} from 'DRACOLoader';
import {FontLoader} from 'FontLoader';
import {TextGeometry} from 'TextGeometry';
let colors = { bg_secondary: window.getComputedStyle(document.documentElement).getPropertyValue("--bg-secondary")};
let assets_url = window.location.origin+"/assets";
if(window.location.href.includes("ternatepage")) 
assets_url = "https://aydavidgithere.github.io/ternatepage/assets";
let mousePos = {x:.5,y:.5}; let touchList = [], touchmoveList = [];
document.addEventListener('mousemove', function (event) {
    event.preventDefault(); mousePos = {x:event.clientX/window.innerWidth, y:event.clientY/window.innerHeight};
});


let Game = {};
function GameControl(){
    let moves = [], movesrght = [], movesleft = [];
    Game.canvas = document;
    Game.canvas.ontouchstart = function(e){ 
        e.preventDefault();
    }
    Game.canvas.addEventListener('touchmove', function(e){ 
        e.preventDefault();
        moves.push(   e.touches[0].pageX    ); 
        moves.map((m, ind)=>{ 
            if(moves[ind-1] == undefined) return;
            let m1 = moves[ind-1];
            if(m>m1) movesrght.push("");
            if(m<m1) movesleft.push("")
        })
    });
    Game.canvas.addEventListener('touchend', function(e){
        e.preventDefault();
        if(Game.heromoveleft || Game.heromoverght) return;
        if(movesrght.length>movesleft.length) Game.heromoveleft = true;
        if(movesrght.length<movesleft.length) Game.heromoverght = true;
        moves = []; movesrght = []; movesleft = [];
    });
}//GameControl








function ThreeLogic(container) {
    let ctx = this;
    let camera, SCamera, scene, renderer;
    let lights, cubes, texts;
    let cubeAnimation = ()=>{}, particleAniation = ()=>{}, sphereAnimation = ()=>{}, animations = [];
    let particlesList = [];
    function LoadAssets(finished) {
        finished()
    }
    function init() {
        renderer = new THREE.WebGLRenderer({
             alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
        camera.position.set(0, 15.0, 100);
        camera.lookAt(new THREE.Vector3(0, 20, -100));
        SCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
        SCamera.position.set(0, 15.0, 100);
        SCamera.lookAt(new THREE.Vector3(0, 20, -100));
        
        lights = 
            addLights(); 
        let ring = addSphere(scene);
        //cubes = addCubes(scene); console.log(cubes);
        //texts = addTexts(scene)
        //ctx.particleManager = addParticles();
        window.addEventListener('resize', onWindowResized, false);
        //GameControl
        Game.canvas = renderer.domElement;
        GameControl();
    }
    function animate() {
        makeAnimation();
        requestAnimationFrame(animate);
        render();
    }
    function render() {
        renderer.render(scene, SCamera);
    }
    function onWindowResized() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    function addLights() {
    //mainLight
        let mainLightColor = "white";//"#ffffff"
        let mainLight = new THREE.DirectionalLight( mainLightColor, 0.5);
        mainLight.position.set( 0, 50, 50 );
        mainLight.target.position.set( 0, -50, -50 );
        mainLight.castShadow = true;
        mainLight.shadow.camera.visible = true;
        {
        let d = 200;
        mainLight.shadow.camera.left = - d;
        mainLight.shadow.camera.right = d;
        mainLight.shadow.camera.top = d;
        mainLight.shadow.camera.bottom = -d;
        mainLight.shadow.camera.far = 100;
        mainLight.shadow.camera.fov *= 1;
        mainLight.shadow.camera.near = 0;
        mainLight.shadow.mapSize.width = 2 * 512;
        mainLight.shadow.mapSize.height = 2 * 512;
        mainLight.shadow.darkness = 1;
        }
        scene.add(mainLight, mainLight.target);
    //hemiLight
        let hemiLight = new THREE.HemisphereLight(mainLightColor, mainLightColor, 0.99);
        scene.add(hemiLight);
    //ambientLight
        let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        //scene.add(ambientLight)
    //spotLight
        let spotLight = new THREE.SpotLight ("red", 5);
        spotLight.position.set(0, 0, 0 );
        spotLight.castShadow = true;
        spotLight.angle = 3*Math.PI/3;
        spotLight.distance = 200; //spotLight.penumbra = 1;
        spotLight.power = 5; //spotLight.decay *= 1.1
        spotLight.lookAt(new THREE.Vector3( 0, 50, 50));
        //scene.add(spotLight);
    //pointLight
        let pointLight = new THREE.PointLight ("crimson", 10);
        pointLight.position.set(0, 0, 0 );
        pointLight.castShadow = true;
        scene.add(pointLight);
        return {mainLight, pointLight};
    }
    function createObstacle(sphere){
        let obs = null
        obs = new THREE.Mesh(new THREE.SphereGeometry(2, 80, 80), new THREE.MeshStandardMaterial({
                color: 0x00ff00,
        }));console.log(sphere.geometry.vertices)   //.getAttribute("position").array;
        let ind = Math.floor(Math.floor(Math.random()*sphere.geometry.vertices.length)/3)*3; console.log(ind)
        obs.position.x = sphere.geometry.vertices[ind+0];
        obs.position.y = sphere.geometry.vertices[ind+1];
        obs.position.z = sphere.geometry.vertices[ind+2];
        return {object: obs}
    }
    function addSphere() {
        function makeSphere(position, color) {
            color = (new THREE.Color(color))
            color.setRGB((50+Math.random()*100)/255, (20+Math.random()*50)/255, (50+Math.random()*100)/255);
            let material = new THREE.MeshLambertMaterial({
                color: color,
            });
            let mats = [];
            for(let i=0; 20>i; i++){     mats.push(new THREE.MeshBasicMaterial({ color: new THREE.Color(`rgb(${(50+Math.random()*100)/255}, ${(20+Math.random()*50)/255}, ${(50+Math.random()*100)/255})`) }));        }
            //material = new THREE.MeshFaceMaterial(mats);
            //material = new THREE.MeshBasicMaterial( { vertexColors: true } );
            
            
            
            let ring = null;
            //ring = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), material);
            ring = new THREE.Mesh(new THREE.IcosahedronGeometry(10), material);
            scene.add(ring);
            ring.position.x = position[0];
            ring.position.y = position[1];
            ring.position.z = position[2];
            ring.rotation.x += Math.PI/2;
            ring.geometry.vertices = ring.geometry.getAttribute("position").array;
            ring.traverse( function ( child ) { 
                 if ( child instanceof THREE.Mesh || child.isMesh ) ring.geometry.vertices = child.geometry.getAttribute("position").array; 
            });
             
             
            
            ring.material = new THREE.MeshLambertMaterial( { vertexColors: true } );
            let positionAttribute = ring.geometry.getAttribute( 'position' );
            let colors = [];
            color = new THREE.Color();
            for ( let i = 0; i < positionAttribute.count; i += 3 ) {
                color.setRGB((125+Math.random()*100)/255, (2+Math.random()*5)/255, (20+Math.random()*20)/255);
                if(i%4==0) color.setRGB((175+Math.random()*50)/255, (175+Math.random()*50)/255, (175+Math.random()*50)/255);
                colors.push( color.r, color.g, color.b );
                colors.push( color.r, color.g, color.b );
                colors.push( color.r, color.g, color.b );
            }
            console.log("positionAttribute count", positionAttribute.count);
            ring.material = new THREE.MeshBasicMaterial( { vertexColors: true } );
            ring.geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
            
            
            
            
            
            
            
            
            
            //console.log(ring.geometry.faces)
            ring.obstacles = [(createObstacle(ring).object)];
            let ringobs1 = (ring.obstacles[0])
            console.log(ring.obstacles[0].geometry)//applyMatrix(new THREE.Matrix4().makeTranslation(-ringobs1.position.x,-ringobs1.position.y,-ringobs1.position.z));
            scene.add(ring.obstacles[0])
            return ring;
        }
        let ring = (makeSphere([0, 150-20, 50], 0x00BBBB));
        ring.rotation.dsty = ring.rotation.y;
        //sphereAnimation
        sphereAnimation = ()=>{
            ring.rotation.x += Math.PI/(64*8);
            //ring.rotation.y += Math.PI/(64*4*4);
            ring.obstacles[0].rotation.z = ring.rotation.z;
            
            
            
            if(Game.heromoveleft)   ring.rotation.dsty = ring.rotation.y+Math.PI/(4); //change destination
            if(Game.heromoverght)   ring.rotation.dsty = ring.rotation.y-Math.PI/(4);  //change destination
            ring.rotation.dsty = Math.floor(ring.rotation.dsty*100)/100;//round up
            ring.rotation.y = Math.floor(ring.rotation.y*100)/100;//round up
            if(ring.rotation.dsty!==ring.rotation.y)
            ring.rotation.y += Math.PI/(64)*(ring.rotation.dsty>ring.rotation.y?1:-1) //go to destination
            Game.heromoveleft = Game.heromoverght = false;
        }

        SCamera.position.set(0, 160, 50);
        SCamera.target = new THREE.Vector3(0, 100, 50);
        SCamera.rotation.x += (Math.PI/2)*3;
        camera.position.set(0, 100, 200);
        camera.target = new THREE.Vector3(0, 100, -100);
        return ring;
    }   
        
        
        
        
        
        
        
        
        
        
    function makeAnimation(){
        cubeAnimation();
        particleAniation();
        if(sphereAnimation) sphereAnimation();
        animations.map(animation=>{
            animation();
        });
    }
    /////START
    LoadAssets(function() {
        init();
        animate();
    });
    
    
    
}


export default ThreeLogic;