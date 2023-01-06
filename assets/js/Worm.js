function Worm(Game, scene, CW, CH, backgrounds){
        let ctx = this;
        Game.worm = {}
        
        let wormspritesdim = {dx:CW/1.5, dw: CW/4*0.8, dy: CH/1.5, dh: CH/3*0.8, }
        wormspritesdim.dy = CH - wormspritesdim.dh; 
        let wormsprites = {};
        //idle
        wormsprites.idle = new CDraw.img("./assets/sprites/Fire Worm/Sprites/Worm/Idle.png", wormspritesdim.dx, wormspritesdim.dw, wormspritesdim.dy, wormspritesdim.dh, {}, 0, null, 0, null);
        wormsprites.idle.splits = 9;
        scene.add(wormsprites.idle);
        wormsprites.idle.postStyle = function(B){
          
        }
        //wormsprites.idle.GCParams.shadow = [0, 0, "red", 10];
        
        
        
        
        
        //attack
        wormsprites.attack = new CDraw.img("./assets/sprites/Fire Worm/Sprites/Worm/Attack.png", wormspritesdim.dx, wormspritesdim.dw, wormspritesdim.dy, wormspritesdim.dh, {}, 0, null, 0, null);
        wormsprites.attack.splits = 16;
        scene.add(wormsprites.attack);
        
                
        
        //getHit
        wormsprites.getHit = new CDraw.img("./assets/sprites/Fire Worm/Sprites/Worm/Get Hit.png", wormspritesdim.dx, wormspritesdim.dw, wormspritesdim.dy, wormspritesdim.dh, {}, 0, null, 0, null);
        wormsprites.getHit.splits = 3;
        scene.add(wormsprites.getHit);
        /*
        //attack2
        wormsprites.attack2 = new CDraw.img("./assets/sprites/Medieval Warrior Pack/Attack2.png", wormspritesdim.dx, wormspritesdim.dw, wormspritesdim.dy, wormspritesdim.dh, {}, 0, null, 0, null);
        wormsprites.attack2.splits = 4;
        scene.add(wormsprites.attack2);
        
        //jump
        wormsprites.jump = new CDraw.img("./assets/sprites/Medieval Warrior Pack/Jump.png", wormspritesdim.dx, wormspritesdim.dw, wormspritesdim.dy, wormspritesdim.dh, {}, 0, null, 0, null);
        wormsprites.jump.splits = 2;
        scene.add(wormsprites.jump);
        */
        
        //walk
        wormsprites.walk = new CDraw.img("./assets/sprites/Fire Worm/Sprites/Worm/Attack.png", wormspritesdim.dx, wormspritesdim.dw, wormspritesdim.dy, wormspritesdim.dh, {}, 0, null, 0, null);
        wormsprites.walk.splits = 8;
        scene.add(wormsprites.walk);
        

        
        
        
        
        
        Object.keys(wormsprites).map((key)=>{
          let wormsprite = wormsprites[key];
          wormsprite.alpha = 0;
          scene.add(wormsprite);
          if(wormsprite.autostop==undefined) 
          wormsprite.autostop = true;
          wormsprite.animaterunning = false;
          wormsprite.animate = function(running=false, call=()=>{}){
              if(!running && wormsprite.animaterunning) return;
              Object.keys(wormsprites).map((key)=>{let wormsprite = wormsprites[key];wormsprite.alpha = 0;});
              
              
              if(!running)
              wormsprite.sprites_ind = 0;
              wormsprite.sprites_ind += 0.2;
              let max = wormsprite.splits||4;
              let ind = Math.floor(wormsprite.sprites_ind)%max;
              if(ind==max-1 && wormsprite.autostop) 
                running = false;
              else 
                running = true;
              wormsprite.animaterunning = running;
             
             
              
              Game.worm.currentSprite = wormsprite;
              call(max);
              wormsprite.alpha = 1;
              wormsprite.sourceX = (wormsprite.image.width/max)*ind;
              wormsprite.sourceWidth = wormsprite.image.width/max;
              if(running) 
              requestAnimationFrame(function(){
                  wormsprite.animate(running, call);
              });
              else{
                wormsprites.idle.animate();
              }
          }
          wormsprite.endanimate = function(running=false){
            
          }
        });//        
        wormsprites.idle.animate();
        
        
      
      
      
      
      
        
        
      Game.worm = {
        ...Game.worm,
        health: 100,
        direction: 1,
        attack: function(){
          wormsprites.attack.animate(false, function(){
            //console.log("worm attack anim")
          });
        },
        attack2: function(){
          wormsprites.attack2.animate();
          console.log("attack2")
        },
        getHit: function(){
          wormsprites.getHit.animate(false, function(){
              Game.worm.takingHit = true;
          });
          Game.worm.health -= 20;
          console.log(Game.worm.health)
        },
        jump: function(){
          wormsprites.jump.animate(false, function(max){
              wormsprites.jump.y += 0.9*(wormsprites.jump.sprites_ind<max/2?-1:1);
          });
          console.log("jump")
        },
        walk: function(dir=1){
          console.log("worm walk");
        }, //EO walk
        
        
        
        
        
        dead: function(){
          Object.keys(wormsprites).map(key=>{
              let sprite = wormsprites[key];
              sprite.opacity = 0;
              sprite.GCParams.shadow = [0, 0, "red", 10];
          });
        },
        takeHit: function(){
          Game.worm.getHit();
        }, 
        switchdir: function(dir=1){
          Object.keys(wormsprites).map(key=>{
              let sprite = wormsprites[key];
              sprite.scale = {x: dir, y: 1};
          });
          Game.worm.direction = dir;
          console.log("switchdir", dir)
        }, //EO switchdir
        movement: function(){
          Object.keys(wormsprites).map(key=>{
              let sprite = wormsprites[key];
              sprite.x += 0+Game.herospeed*1; 
          });
        },
        autoAttack: function(){
          if(Math.abs(Game.hero.position.x-Game.worm.position.x) <CW/3) {
            if(  (Game.hero.position.x>Game.worm.position.x) && Game.worm.direction==-1 ) 
            Game.worm.switchdir(+1);
            if(  (Game.hero.position.x<Game.worm.position.x) && Game.worm.direction==+1 ) 
            Game.worm.switchdir(-1); 
            if(Math.random()>0.95 && !Game.worm.takingHit)
            Game.worm.attack();
          }
        },
        
        
        
        
        active: function(){
            let sprite = Game.worm.currentSprite;
            Game.worm.position = {x: sprite.x, y: sprite.y}
            Game.worm.size = {width: sprite.lengthX, height: sprite.breadthY}
            Game.worm.movement();
            Game.worm.autoAttack();
            if(Game.worm.health<=0) Game.worm.dead();
        }
      };
      
      
      
      
      
      
    document.addEventListener("keydown", e=>{ 
      if(e.key=="p") Game.worm.switchdir(-1);
      if(e.key=="o") Game.worm.switchdir(1);
      if(e.key=="i") Game.worm.attack();
    });

}
export default Worm;