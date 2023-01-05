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
        
        
        let herospritesdim = {dx:CW/5, dw: CW/2.8, dy: CH/2, dh: CH/2, }
        let herosprites = {};
        //idle
        herosprites.idle = new CDraw.img("./assets/sprites/Medieval Warrior Pack/Idle.png", herospritesdim.dx, herospritesdim.dw, herospritesdim.dy, herospritesdim.dh, {}, 0, null, 0, null);
        herosprites.idle.splits = 6;
        scene.add(herosprites.idle);
        
        //attack
        herosprites.attack = new CDraw.img("./assets/sprites/Medieval Warrior Pack/Attack1.png", herospritesdim.dx, herospritesdim.dw, herospritesdim.dy, herospritesdim.dh, {}, 0, null, 0, null);
        herosprites.attack.splits = 4;
        scene.add(herosprites.attack);
        
        //attack2
        herosprites.attack2 = new CDraw.img("./assets/sprites/Medieval Warrior Pack/Attack2.png", herospritesdim.dx, herospritesdim.dw, herospritesdim.dy, herospritesdim.dh, {}, 0, null, 0, null);
        herosprites.attack2.splits = 4;
        scene.add(herosprites.attack2);
        
        //jump
        herosprites.jump = new CDraw.img("./assets/sprites/Medieval Warrior Pack/Jump.png", herospritesdim.dx, herospritesdim.dw, herospritesdim.dy, herospritesdim.dh, {}, 0, null, 0, null);
        herosprites.jump.splits = 2;
        scene.add(herosprites.jump);
        
        
        //run
        herosprites.run = new CDraw.img("./assets/sprites/Medieval Warrior Pack/Run.png", herospritesdim.dx, herospritesdim.dw, herospritesdim.dy, herospritesdim.dh, {}, 0, null, 0, null);
        //herosprites.run.autostop = false;
        herosprites.run.splits = 8;
        scene.add(herosprites.run);
        
        
        //throw
        herosprites.throw = new CDraw.img("./assets/sprites/Medieval Warrior Pack/Throw.png", herospritesdim.dx, herospritesdim.dw, herospritesdim.dy, herospritesdim.dh, {}, 0, null, 0, null);
        //herosprites.run.autostop = false;
        herosprites.throw.splits = 3;
        scene.add(herosprites.throw);
        
        
        
        
        
        Object.keys(herosprites).map((key)=>{
          let herosprite = herosprites[key];
          herosprite.alpha = 0;
          scene.add(herosprite);
          if(herosprite.autostop==undefined) 
          herosprite.autostop = true;
          herosprite.animaterunning = false;
          herosprite.animate = function(running=false, call=()=>{}){
              if(!running && herosprite.animaterunning) return;
              Object.keys(herosprites).map((key)=>{let herosprite = herosprites[key];herosprite.alpha = 0;});
              
              
              if(!running)
              herosprite.sprites_ind = 0;
              herosprite.sprites_ind += 0.1;
              let max = herosprite.splits||4;
              let ind = Math.floor(herosprite.sprites_ind)%max;
              if(ind==max-1 && herosprite.autostop) 
                running = false;
              else 
                running = true;
              herosprite.animaterunning = running;
             
             
              call(max);
              herosprite.alpha = 1;
              herosprite.sourceX = (herosprite.image.width/max)*ind;
              herosprite.sourceWidth = herosprite.image.width/max;
              if(running) 
              requestAnimationFrame(function(){
                  herosprite.animate(running, call);
              });
              else{
                herosprites.idle.animate();
              }
          }
          herosprite.endanimate = function(running=false){
            
          }
        });//        
        herosprites.idle.animate();
        
        
      
      
      
      
      
        
        
      Game.hero = {
        attack: function(){
          herosprites.attack.animate();
          console.log("attack")
        },
        attack2: function(){
          herosprites.attack2.animate();
          console.log("attack2")
        },
        throw: function(){
          herosprites.throw.animate();
          console.log("throw")
        },
        jump: function(){
          herosprites.jump.animate(false, function(max){
              herosprites.jump.y += 0.9*(herosprites.jump.sprites_ind<max/2?-1:1);
          });
          console.log("jump")
        },
        run: function(dir=1){
          herosprites.run.animate(false, function(){
            backgrounds.frst2.move("x", -dir*2*1.5);
            backgrounds.frst1.move("x", -dir*1.12*1.5);
            backgrounds.bushes.move("x", -dir*2.0*1.5);
          });
          console.log("run");
        }, //EO run
      };
      
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
        
        
        
        
        
        
        
        function animate(){anim(CW, CH, backgrounds, herosprites); requestAnimationFrame(animate);}
        animate();
    }//EO draw
    
    function anim(CW, CH, backgrounds, herosprites){
      
      
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