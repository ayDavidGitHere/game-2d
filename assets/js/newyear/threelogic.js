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
let mousePos = {x:.5,y:.5};
document.addEventListener('mousemove', function (event) {
    event.preventDefault(); mousePos = {x:event.clientX/window.innerWidth, y:event.clientY/window.innerHeight};
});
document.addEventListener('touchmove+', function (event) {
    event.preventDefault(); mousePos = {x:event.clientX/window.innerWidth, y:event.clientY/window.innerHeight};
});




function ThreeLogic(container) {
    let ctx = this;
    let camera, scene, renderer;
    let lights, balls, texts;
    let ballsAnimation = ()=>{}, particleAniation = ()=>{}, enterSphereAnimation = false, enterParticleInSphereAnimation, animations = [];
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
        //renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
        camera.position.set(0, 15.0, 100);
        camera.lookAt(new THREE.Vector3(0, 20, -100));
        lights = 
            addLights();
        //balls = addBalls(scene);
        
        //texts = addTexts(scene)
        //ctx.particleManager = addParticles();
        window.addEventListener('resize', onWindowResized, false);  
    }
    function animate() {
        makeAnimation();
        requestAnimationFrame(animate);
        render();
    }
    function render() {
        renderer.render(scene, camera);
    }
    function onWindowResized() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    function addLights() {
    //mainLight
        let mainLightColor = "white";//"#ffffff"
        let mainLight = new THREE.DirectionalLight( mainLightColor, 1);
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
        let pointLight = new THREE.PointLight ("white", 10);
        pointLight.position.set(-100, 100, 0 );
        pointLight.castShadow = true;
        //scene.add(pointLight);
        return {mainLight, pointLight};
    }
    function addBalls() {
        function makeBalls(position, color) {
            color = (new THREE.Color(color))
            color.setRGB((50+Math.random()*100)/255, (50+Math.random()*100)/255, (50+Math.random()*100)/255);
            color = (new THREE.Color(["#3f1edc", "#7744ee", "#dc1e3f"][Math.floor(Math.random()*3)]));
            let material = new THREE.MeshPhongMaterial({
                color: color, metal: true, shininess: 60,
            });
            let ball = new THREE.Mesh(new THREE.SphereGeometry(15*(1+Math.random()*0.5), 20, 20), material);
            scene.add(ball);
            ball.position.x = position[0];
            ball.position.y = position[1];
            ball.position.z = position[2];
            ball.rotspeedx = .025+Math.random()*0.05;
            return ball;
        }
        let balls = [];
        for (let i = 0; 3 > i; i++) {
            balls.push(makeBalls([-150+Math.random()*300, 75+Math.random()*75, -100+i*40], 0x00BBBB));
            //balls.push(makeBalls([0, 100, -100+i*40], 0x00BBBB));
        }
        camera.position.set(0, 100, 250);
        camera.target = new THREE.Vector3(0, 100, -100);
        //ballsAnimation
        ballsAnimation = ()=>{
            balls.map(ball=>{
                //ball.rotation.y += ball.rotspeedx;
                //ball.rotation.x += ball.rotspeedx;
                //ball.rotation.z += ball.rotspeedx; 
                return;
                if(!ball.destx || Math.random()<0.01){
                    ball.destx = ball.position.x+100-Math.random()*200;
                    ball.desty = ball.position.y+100-Math.random()*200;
                    ball.destz = ball.position.z+100-Math.random()*200;
                }
                if(ball.position.x<ball.destx)ball.position.x += 0.1;
                else ball.position.x -= 0.1;
                if(ball.position.y<ball.desty)ball.position.y += 0.1;
                else ball.position.y -= 0.1;
                if(ball.position.z<ball.desty)ball.position.z += 0.1;
                else ball.position.z -= 0.1;
            });
        }
        return balls;
    }
    function addTexts() {
        let material = new THREE.MeshLambertMaterial({
                color: 0x00BBBB,
            });
        let text = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), material);
        scene.add(text);
        text.position.x = 0;
        text.position.y = 100;
        text.position.z = 50;
        return text;
    }
    function addModel(){
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '../../node_modules/three/examples/js/libs/draco/' );
        loader.setDRACOLoader( dracoLoader );
        loader.load(
        	//'http://100.115.92.2:1111/canvas//models/model.gltf',
        	assets_url+'/canvas//models/chariot.gltf',
        	function ( gltf ) {
        		scene.add( gltf.scene );
        		gltf.animations; // Array<THREE.AnimationClip>
        		gltf.scene; // THREE.Group
        		gltf.scenes; // Array<THREE.Group>
        		gltf.cameras; // Array<THREE.Camera>
        		gltf.asset; // Object
        		gltf.scene.scale.x *= 20;
        		gltf.scene.scale.y *= 20;
        		gltf.scene.scale.z *= 20;
        		
        	},
        	function ( xhr ) {
        		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        	},
        	function ( error ) {
        		console.log( 'An error happened' );
        	}
        ); 
        console.log("to load model")
    }
    function addParticles(){
        let p, p_material, p_geom, animopts; 
        function initparticles(){
              // particles
                p_geom = new THREE.BufferGeometry();
                p_material = new THREE.PointsMaterial({size: 0.55});
                p = new THREE.Points(
                  p_geom,
                  p_material
                );
                p.animsettings = {};
                
                
              let sy = null, py = null;
              function pendulum(sy,py,d0,d1,lim0,lim1){
                  sy = sy==d0&&py>lim0?d0:sy
                  sy = sy==d0&&py<lim0?d1:sy
                  sy = sy==d1&&py<lim1?d1:sy
                  sy = sy==d1&&py>lim1?d0:sy
                  return sy;
              }
              particleAniation = function(){
                animopts = p.animsettings;
                ;(function (){
                    if(!animopts.autopendulumrotate) return;
                    //rotation
                    py = p.rotation.y;
                    if(sy==null) sy = -0.2;
                    sy = pendulum(sy,py,-0.2,+0.2,-1.6,+1.6);
                    p.rotation.y += 0.05*sy;
                })();
                ;(function (){
                    if(!animopts.autopendulumscale) return;
                    //scale
                    py = p.scale.y;
                    if(sy==null) sy = -0.1/10;
                    sy = pendulum(sy,py,-0.1/10,+0.1/10,100*0.1/10,200*0.1/10);
                    p.scale.x = p.scale.y = p.scale.z += sy;
                })();
                ;(function (){
                    if(!animopts.autorotate) return;
                    //rotation
                    let [vx,vy,vz] = animopts.autorotate;
                    p.rotation.x += 0.05*vx;
                    p.rotation.y += 0.05*vy;
                    p.rotation.z += 0.05*vz;
                })();
                ;(function (){
                    if(!animopts.mouserotate) return;
                    p.rotation.x = (mousePos.y-0.5) * Math.PI;
                    p.rotation.z = (mousePos.x-0.5) * Math.PI;
                    p.rotation.y = (mousePos.x-0.5) * Math.PI;
                })();
              }
              animations.push(particleAniation);
              
              
        }
        function doparticles( object, parameters = {}, animsettings={}) {
              
              p_material = p.material;
              p_geom = p.geometry;
              p_geom.verticespoints = [];
              p_geom.vertices = null;
              p.rotation.x = p.rotation.y = p.rotation.z = 0;
              p.scale.x = p.scale.y = p.scale.z = 1;
                
              console.log("doing particles from object");
              if(object.traverse !== undefined)
              object.traverse( function ( child ) { 
                 if ( child instanceof THREE.Mesh || child.isMesh ) {
                    var scale = 8;
                    p_geom.vertices = child.geometry.getAttribute("position").array; 
                    //console.log(p_geom.vertices)
                 }
              });
              
              
              
              
              let p_postn = parameters.postn?parameters.postn:[30,20,20];
              let p_color = parameters.color?parameters.color:colors.bg_secondary;
              p.material.color = new THREE.Color(p_color);
              p_geom.setAttribute('position', new THREE.BufferAttribute( p_geom.vertices, 3 ));
              p_geom.center();
              p.position.set(p_postn[0], p_postn[1], p_postn[2]);
              p.scale.x = p.scale.y = p.scale.z += 0.75;
              scene.add(p);
              particlesList.push(p);
              //animating
              p.animsettings = animsettings;
              if(!p.animsettings.autopendulumscale){   p.scale.x = p.scale.y = p.scale.z += 0.25;  }
              if(!p.animsettings.autopendulumrotate){  p.rotation.y = 0;      }
              return p;
        }
        function getRandomVertex(geometry){
            let positionAttribute = geometry.getAttribute( 'position' );
            let vertex = new THREE.Vector3();
            let ind = Math.floor(Math.random()*positionAttribute.count);
            vertex.fromBufferAttribute( positionAttribute, ind); // read vertex
            // do something with vertex
            //positionAttribute.setXYZ( i, vertex.x, vertex.y, vertex.z ); // write coordinates back
            console.log(vertex,  ind, camera.position);
            return vertex;
        }
        
        
        
        
        
        let headparticle = function() {   
           var manager = new THREE.LoadingManager();
           manager.onProgress = function ( item, loaded, total ) {};
           var loader = new OBJLoader( manager );
           loader.load(assets_url+'/canvas/models/head.obj', function(object){  doparticles(object, {}, {autopendulumscale: 0.31, mouserotate: 1}) });
        } 
        let spheregeometry = function() {   
            let material = new THREE.MeshLambertMaterial({
                    color: 0x00BBBB,
                });
            let text = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), material);
            scene.add(text);
            text.position.x = 0;
            text.position.y = 100;
            text.position.z = 50;
            doparticles(text, {color: "green"}, {autopendulumrotate: 1})
        } 
        let othergeometry = function() {   
            let material = new THREE.MeshLambertMaterial({
                    color: 0x00BBBB,
                });
            let text = new THREE.Mesh(new THREE.OctahedronGeometry(10, 10, 10), material);
            scene.add(text);
            text.position.x = 0;
            text.position.y = 100;
            text.position.z = 50;
            doparticles(text, {postn: [0,+15.0,camera.position.z-70]}, {autorotate: [0.0521,0,0.025]})
        } ;
        let textgeometry = function() {   
            const loader = new FontLoader();
            loader.load( '../../node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
            	const geometry = new TextGeometry( 'Hekk', {
            		font: font,
            		size: 16,
            		height: 1,
            		curveSegments: 12,
            		//bevelEnabled: true,
            		bevelThickness: 2,
            		bevelSize: 0.8,
            		bevelOffset: 0,
            		bevelSegments: 5
            	});
                let material = new THREE.MeshLambertMaterial({color: 0x00bb88,});
                let text = new THREE.Mesh(geometry, material);
                scene.add(text)
            	//doparticles(text, {postn: [0,+15.0,20], color: "green"}, {autorotate: [0.0521,0,0.025]})
            });
        }
        let planeparticle = function() {
           let p = particlesList[0];
           let p_geom = p.geometry;
           let pgv = p_geom.vertices;
           for(let i=0; pgv.length>i+3; i+=3){
             let vx = pgv[i], vy = pgv[i+1], vz = pgv[i+2];
             //pgv[i] += -2+Math.floor(Math.random()*3); pgv[i+1] += -2+Math.floor(Math.random()*3); pgv[i+2] += -2+Math.floor(Math.random()*3)
             pgv[i] += -8;
           }
            p_geom.setAttribute('position', new THREE.BufferAttribute( p_geom.vertices, 3 ));
            p_geom.center();
        }
        let enterSphere = function(){
            if(!camera.enterSphere) camera.enterSphere = false;
            camera.enterSphere = !camera.enterSphere;
            
            if(enterSphereAnimation) return;
            enterSphereAnimation = function(){
                if(camera.enterSphere)
                if(camera.position.z>p.position.z-10&&camera.position.z<p.position.z+10) {}
                else camera.position.z -= 2.0-1.9*(p.position.z/camera.position.z);
                
                
                if(!camera.enterSphere)
                if(camera.position.z<p.position.z+70) camera.position.z += 2.0-1.9*(camera.position.z/(p.position.z+70)); 
            }
            animations.push(enterSphereAnimation);
        }
        let enterParticleInSphere = function(){
            if(!camera.enterParticleInSphere) camera.enterParticleInSphere = false;
            camera.enterParticleInSphere = !camera.enterParticleInSphere;
            
            
            let vertex = getRandomVertex(p.geometry);
            if(enterParticleInSphereAnimation) return;
            enterParticleInSphereAnimation = function(){ 
                if(camera.enterParticleInSphere)
                if(camera.position.z>p.position.z-100){ camera.position.z -= 2.0; camera.lookAt(camera.position.x, camera.position.y, camera.position.z-30)}
                else {} 
            }
            animations.push(enterParticleInSphereAnimation);
        }
        //textgeometry(); 
        //othergeometry();
        //spheregeometry();
        //headparticle();
        
        
        
        
        
        
        
        let removeAllParticles = function(){
            particlesList.map(p=>{
                scene.remove(p)
            });
            particlesList = [];
        }
        let addParticle = function(typeto){
            camera.position.set(0, 15.0, 100);
            camera.lookAt(new THREE.Vector3(0, 20, -100));
            if(typeto=="head") headparticle();
            if(typeto=="shapes") othergeometry();
        }
        let transformParticle = function(typeto){
            if(typeto=="plane") planeparticle(true);
            if(typeto=="head") headgeometry(true);
        }
        initparticles();
        return {initparticles, removeAllParticles, addParticle, transformParticle, enterSphere, enterParticleInSphere}
    }
    function makeAnimation(){
        ballsAnimation();
        particleAniation();
        animations.map(animation=>{
            animation();
        })
    }
    /////START
    LoadAssets(function() {
        init();
        animate();
    });
    
    
    
}


export default ThreeLogic;