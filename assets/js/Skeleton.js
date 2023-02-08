function Hero(Game, scene, CW, CH, backgrounds){
        let ctx = this;
        Game.hero = {}
        
        let herospritesdim = {dx:CW/5, dw: CW/2.8, dy: CH/2, dh: CH/1.7, }
        let herosprites = {};
        //idle
        herosprites.idle = new CDraw.img("./assets/sprites/Monsters_Creatures_Fantasy/Skeleton/Idle.png", herospritesdim.dx, herospritesdim.dw, herospritesdim.dy, herospritesdim.dh, {}, 0, null, 0, null);
        herosprites.idle.splits = 4;
        scene.add(herosprites.idle);
        
        //attack
        herosprites.attack = new CDraw.img("./assets/sprites/Monsters_Creatures_Fantasy/Skeleton/Attack.png", herospritesdim.dx, herospritesdim.dw, herospritesdim.dy, herospritesdim.dh, {}, 0, null, 0, null);
        herosprites.attack.splits = 8;
        scene.add(herosprites.attack);
        
        //attack2
        herosprites.attack2 = new CDraw.img("./assets/sprites/Monsters_Creatures_Fantasy/Skeleton/Attack.png", herospritesdim.dx, herospritesdim.dw, herospritesdim.dy, herospritesdim.dh, {}, 0, null, 0, null);
        herosprites.attack2.splits = 8;
        scene.add(herosprites.attack2);
        
        //jump
        herosprites.jump = new CDraw.img("./assets/sprites/Medieval Warrior Pack/Jump.png", herospritesdim.dx, herospritesdim.dw, herospritesdim.dy, herospritesdim.dh, {}, 0, null, 0, null);
        herosprites.jump.splits = 2;
        scene.add(herosprites.jump);
        
        
        //run
        herosprites.run = new CDraw.img("./assets/sprites/Monsters_Creatures_Fantasy/Skeleton/Walk.png", herospritesdim.dx, herospritesdim.dw, herospritesdim.dy, herospritesdim.dh, {}, 0, null, 0, null);
        //herosprites.run.autostop = false;
        herosprites.run.splits = 4;
        scene.add(herosprites.run);
        
        
        //throw
        herosprites.throw = new CDraw.img("./assets/sprites/Medieval Warrior Pack/Throw.png", herospritesdim.dx, herospritesdim.dw, herospritesdim.dy, herospritesdim.dh, {}, 0, null, 0, null);
        //herosprites.run.autostop = false;
        herosprites.throw.splits = 3;
        scene.add(herosprites.throw);
        
        this.direction = 1;
        this.changeDirection = function(dir){
            if(dir==this.direction) return;
            this.direction = dir;
            Object.keys(herosprites).map((key)=>{
                let herosprite = herosprites[key];
                herosprite.scale = {x: this.direction, y:1 }
            });
        }
        
        
        
        
        
        
        
        
        
        Object.keys(herosprites).map((key)=>{
          let herosprite = herosprites[key];
          herosprite.alpha = 0;
          scene.add(herosprite);
          if(herosprite.autostop==undefined) 
          herosprite.autostop = true;
          herosprite.animaterunning = false;
          herosprite.animate = function(running=false, btw=()=>{}, after=()=>{}){
              if(!running && herosprite.animaterunning) return;
              Object.keys(herosprites).map((key)=>{let herosprite = herosprites[key];herosprite.alpha = 0;});
              
              
              if(!running)
              herosprite.sprites_ind = 0;
              herosprite.sprites_ind += 0.15;
              let max = herosprite.splits||4;
              let ind = Math.floor(herosprite.sprites_ind)%max;
              if(ind==max-1 && herosprite.autostop) 
                running = false;
              else 
                running = true;
              herosprite.animaterunning = running;
             
              
              Game.hero.currentSprite = herosprite;
              btw(max);
              herosprite.alpha = 1;
              herosprite.sourceX = (herosprite.image.width/max)*ind;
              herosprite.sourceWidth = herosprite.image.width/max;
              if(running) 
              requestAnimationFrame(function(){
                  herosprite.animate(running, btw, after);
              });
              else{
                after(max)
                herosprites.idle.animate();
              }
          }
          herosprite.endanimate = function(running=false){
            
          }
        });//        
        herosprites.idle.animate();
        
        
      
      
      
      
      
        
        
      Game.hero = {
        ...Game.hero,
        attack: function(){
          herosprites.attack.animate(false, function(){
            Game.hero.striking = (Game.hero.striking==undefined?0:Game.hero.striking+1); 
          }, function(){
            Game.hero.striking = 0; 
          });
          console.log("attack")
        },
        attack2: function(){
          herosprites.attack2.animate(false, function(){
            Game.hero.striking++;
          });
          console.log("attack2")
        },
        throw: function(){
          herosprites.throw.animate();
          console.log("throw")
        },
        jump: function(){
          herosprites.jump.animate(false, function(max){ 
              let pivot = (max-1)/2;
              let ind = herosprites.jump.sprites_ind - 0.1;
              //console.log( ind, pivot, ind<=pivot )
              herosprites.jump.y += 1.5*(ind<=pivot?-1:1);
          });
          console.log("jump")
        },
        run: function(dir=1){
          ctx.changeDirection( dir );
          herosprites.run.animate(false, function(){
            Game.herospeed = -dir*3;
          });
          console.log("run");
        }, //EO run
        
        
        checkContact: function(){
          
        },
        checkBound: function(){
            let against = Game.worm;
            Game.hero.bound = false;
            if(!against.position) return;
            if(Game.hero.position.x+Game.hero.size.width
            > against.position.x + against.size.width/3
            && Game.hero.position.x <
            against.position.x+
            against.size.width - against.size.width/3)
            Game.hero.bound = Game.worm;
            else 
            Game.hero.bound = false;
        },
        checkHit: function(){
            if(Game.hero.striking==18 && Game.hero.bound){
              Game.hero.bound.takeHit();
            }
        },
        
        
        
        
        
        active: function(){
              let sprite = Game.hero.currentSprite;
              Game.hero.position = {x: sprite.x, y: sprite.y}
              Game.hero.size = {width: sprite.lengthX, height: sprite.breadthY}
              
              Game.hero.checkBound();
              Game.hero.checkHit();
        }
      };
      

}
export default Hero;