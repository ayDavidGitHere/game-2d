import Hero from './Hero.js';
import BadGuy from './Worm.js';
let cdrawlogic = {};
cdrawlogic.loadGame = function(canvas){
    
    
    
    
    
    
    
    
    
    
    
        
        
        
    
    
    
    let setCanvasStyle = function(a, settings){
            if(settings.type == "background"){
                a.width = a.parentNode.scrollWidth;
                a.height = a.parentNode.scrollHeight;
                //bad fixrs
                a.style.zIndex = -100;
                a.parentNode.style.overflow =
                (a.parentNode!=document.body?"hidden":0);
            }
            a.style.position = settings.position;
            if(settings.pinToTop ){
                if( a.style.position == "absolute" ||
                a.style.position == "relative"){
                a.style.top = 0+"%";
                a.style.left = 0+"%";
                }
                if( a.style.position == "static"){
                a.style.marginLeft = 0;
                a.style.marginTop = 0;
                }
            }//EO if
    }
    function initWorld(){ 
        let a = canvas;
        let b = a.getContext("2d");
        setCanvasStyle(a, {type: "fill", alpha: 0, position: "static", pinToTop: true});   
        a.style.position = "absolute";
        a.style.top = "50%";
        a.style.left = "50%"
        a.style.display = "block";
        a.style.margin = "0 auto"
        a.style.transform = "translate(-50%,-50%)";
        a.style.border = "1px solid yellow"; 
        return {canvas: a, context: b};
    }
    
    function run(){ 
         window.Game = {};
         window.Game.assetsLoader = new AssetsLoader();
         let init = initWorld();
         window.Game = {...window.Game, canvas: init.canvas, context: init.context, paused:false}; 
         draw();
    }    
    run();
                     
                     
                     
    function draw(){
        let {canvas: a, context: b} = Game;
        let ww = a.parentNode.clientWidth/1.4;
        let wh = a.parentNode.clientHeight/1.7; console.log(a.parentNode.clientHeight);
        let CW = a.width = ww;
        let CH = a.height = wh;
        let CR = MATH$.resultantOf(CW, CH);
        Game.CW = CW, Game.CH = CH;
        let scene = new CDraw.useScene(b);
        let bgRect = new CDraw.rect(0,CW,0,CH,"_#ffffff55");
        scene.add(bgRect);
        let text = new CDraw.text("+60px iFi", "COOL ASF", CW/2, CH/2, "_white");
        //scene.add(text);
        console.log(text, Game.assetsLoader.assets.forestp1.src);
        
        
        
        
        let backgrounds = {};
        backgrounds.frst0 = new CDraw.img(Game.assetsLoader.assets.forestp0.src, 0, CW, 0, CH );
        backgrounds.frst1 = new CDraw.img(Game.assetsLoader.assets.forestp1.src, 0, CW, 0, CH );
        backgrounds.frst3 = new CDraw.img("./assets/sprites/Parallax Forest Background (Seamless)/Parallax Forest Background - Blue/07_Forest.png", 0, CW*1.5, 0, CH );
        backgrounds.frst2 = new CDraw.img(Game.assetsLoader.assets.forestp2.src, 0, CW*1.5, 0, CH );
        backgrounds.bushes = new CDraw.img("./assets/sprites/Parallax Forest Background (Seamless)/Parallax Forest Background - Blue/02_Bushes.png", 0, CW*1.5, 0, CH );
        Object.keys(backgrounds).map((key)=>{
          let background = backgrounds[key];
          scene.add(background);
          background.extend = function(){
            if(background.static) return;
            if(!background.extension){
            background.extension = 
            new CDraw.img(background.src, background.x+background.lengthX, background.lengthX, 0, CH );
            scene.add(background.extension); 
            }
            if(background.x+background.lengthX<0)
            background.x = background.extension.x+background.extension.lengthX;
            if(background.extension.x+background.extension.lengthX<0)
            background.extension.x = background.x+background.lengthX;
            //backwards
            if(background.extension.x>0&&background.extension.x>0){
            //if(background.extension.x>background.x)
            //background.extension.x = background.x-background.lengthX;
            }
            
            
            
          }// background.extend
          background.extend();
          background.move = function(direction, speed){
              background.extend();
              background[direction] += speed;
              background.extension[direction] += speed;
          }
        });
        Game.herospeed = 0;
        new Hero(Game, scene, CW, CH, backgrounds);
        new BadGuy(Game, scene, CW, CH, backgrounds);
        
      /*
       Object.keys(backgrounds).map((key)=>{
          let background = backgrounds[key];
          backgrounds.scale = {x:1.03, y:1.03}
       });
      Object.keys(herosprites).map((key)=>{
          let herosprite = herosprites[key];
          herosprite.scale = {x:1.03, y:1.03}
       });
        */
        
        
        
        
        
        
        
        function animate(){anim(CW, CH, backgrounds); requestAnimationFrame(animate);}
        animate();
    }//EO draw
    
    function anim(CW, CH, backgrounds){
            backgrounds.frst1.move("x", Game.herospeed*0.8);
            backgrounds.frst3.move("x", Game.herospeed*0.92);
            backgrounds.frst2.move("x", Game.herospeed*0.95);
            backgrounds.bushes.move("x", Game.herospeed*0.99);
            Game.hero.active();
            Game.worm.active();
           
            Game.herospeed = 0;
            Game.hero.striking = 0;
            Game.hero.takingHit = false;
            Game.worm.takingHit = false;
    }//anim
    document.addEventListener("keydown", e=>{ 
      if(e.key=="z") Game.hero.attack2();
      if(e.key=="x") Game.hero.attack();
      if(e.key=="d") Game.hero.throw();
      if(e.key=="ArrowRight"||e.key=="ArrowDown") 
      Game.hero.run(1);
      if(e.key=="ArrowLeft"||e.key=="Arrow") 
      Game.hero.run(-1);
      if(e.key=="ArrowUp") Game.hero.jump();;
    })
    document.addEventListener("keyup", e=>{
      
    })
    
    
    
    
    
    
    
    
    
    
    
    function AssetsLoader(){
      this.assets = {};
      this.finishload = function(){
        return new Promise((resolve, reject)=>{
            this.assets.forestp1.onload = function(){
              resolve({forestp1});
            }
        });
      }//EO finishload
      
      
      let forestp0src = "./assets/sprites/Parallax Forest Background (Seamless)/Parallax Forest Background - Blue/10_Sky.png"
      let forestp0 =  {};
      forestp0.src = forestp0src; //console.log(forestp1)
      this.assets.forestp0 = forestp0;
      let forestp1src = "./assets/sprites/Parallax Forest Background (Seamless)/Parallax Forest Background - Blue/08_Forest.png"
      let forestp1 =  {};
      forestp1.src = forestp1src; //console.log(forestp1)
      this.assets.forestp1 = forestp1;
      let forestp2src = "./assets/sprites/Parallax Forest Background (Seamless)/Parallax Forest Background - Blue/04_Forest.png"
      let forestp2 =  {};
      forestp2.src = forestp2src; //console.log(forestp1)
      this.assets.forestp2 = forestp2;
    }
          
        
    
    
    
    
    
}//EO loadGame





export default cdrawlogic;