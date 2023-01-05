let cdrawlogic = {};
cdrawlogic.startSnow = function(el){
    
    
    
    
    
    
    
    
    
    
    
        
        
        
    
    
    
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
        let a = document.createElement("canvas");
        el.appendChild(a)
        let b = a.getContext("2d");
        setCanvasStyle(a, {type: "fill", alpha: 0, position: "static", pinToTop: true});   
        a.style.position = "absolute";
        a.style.top = "50%";
        a.style.left = "50%"
        a.style.display = "block";
        a.style.margin = "0 auto"
        a.style.transform = "translate(-50%,-50%)";
        return {canvas: a, context: b};
    }
    
    function run(){ 
         let init = initWorld();
         window.Game = {canvas: init.canvas, context:init.context, paused:false}; 
         draw();
    }    
    run();
                     
                     
                     
    function draw(){  
        let {canvas: a, context: b} = Game;
        let ww = a.parentNode.clientWidth/1, wh = a.parentNode.clientHeight/1;
        let CW = a.width = ww;
        let CH = a.height = wh; console.log(ww, wh)
        let CR = MATH$.resultantOf(CW, CH);
        Game.CW = CW, Game.CH = CH;
        let scene = new CDraw.useScene(b); //a.style.border = "1px solid tra"
        let bgRect = new CDraw.rect(0,CW,0,CH,"_transparent");
            
        let nightskycolor = b.createLinearGradient(0, 0, 0, CH);
    	  nightskycolor.addColorStop(0, "black")
        nightskycolor.addColorStop(1, ["crimson", "indigo", "midnightblue"][2])
        bgRect.color = nightskycolor;
        //bgRect.color = "#660099"; bgRect.alpha = 0.7;
        scene.add(bgRect);
        
        
        
        
        
        
        
        
        
        
        
        
        let text = new CDraw.text("+*35px iFk", "MERRY CHRISTMAS", CW/2, CH/4-80, "_crimson");
        let text3 = new CDraw.text("+*100px iF", "&", CW/2, CH/4, "_white");
        let text2 = new CDraw.text("+*35px iFk", "NEW YEAR", CW/2, CH/4+80, "_crimson");
        let text4 = new CDraw.text("+*35px iFi", "Happy", text2.x-35*5, text2.y-40, "_white");
        text4.rotation.rad -= 0.4;
        
        
        
        
        let curl = new CDraw.arc(CW/2, CH/2, CH/20, 0, 6.3, "5_transparent");
        curl.run = function(){ 
            if(curl.startAngle<curl.endAngle) { 
               curl.endAngle -= 6.4/128;
               requestAnimationFrame(curl.run)
            }
            else {
              curl.alpha = 0;
            }
        }
        curl.act = function(){
              curl.startAngle = 0;
              curl.endAngle = 6.3;
              curl.alpha = 1;
              curl.color = "crimson";
              curl.radius = (CH/15)*(1+Math.random()*0.5);
              curl.thick = 2+Math.random()*2;
              curl.lineCap = "round"; 
              curl.x = (Math.random()*CW)+CW*2; curl.y = (Math.random()*CH);
              curl.GCParams = {shadow: [0.5-CW*2, 0.5, curl.color, 15]};
              curl.run();
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        let snows = [];
        for(let i=0; 60>i; i++){
          snows.push(new CDraw.arc( 10*Math.random()*(CW/10), 20+Math.random()*(CW-40), 2*(1+Math.random()*2), 0, 6.3, "_red"));
          scene.add(snows[i]);
          let snow = (snows[i]);
          snow.ind = 0;
          snow.color = "white";
          //if(Math.random()>0.5) snow.color = "crimson";
          snow.GCParams = {shadow: [0.5, 0.5, snow.color, 20]};
          snow.resetDest = function (){
              snow.dxo = CW/4; snow.dyo = CH/4;
              snow.dest = {x: snow.x+snow.dxo-Math.random()*snow.dxo*2, y: snow.y+snow.dyo-Math.random()*snow.dyo*2};
          }
          snow.proximity = function (){ 
              snows.map((snowc, indc)=>{
                  if(snow.ind == indc) return;
                  if((snow.x>snowc.x-5 && snow.x<snowc.x+5 && snow.y>snowc.y-5 && snow.y<snowc.y+5) && snow.dest.x !== snowc.dest.x && snow.dest.y !== snowc.dest.y){
                      if(snow.color !== snowc.color) snow.follow = snowc;
                      else snow.follow = false;
                  }
              });
          } 
        }
        
        
        
        
        scene.add(curl);
        scene.add(text);;
        scene.add(text3);
        scene.add(text2);
        scene.add(text4);
        
        
        
        
        
        
        
        
        function animation(){
            if(!snows.anim){snows.anim = 0;}
            snows.anim++;
            snows.map((snow, ind)=>{ 
                if(snow.follow) snow.dest = snow.follow.dest;
                if(!snow.dest){ snow.resetDest();  }
                else {  }
                if( (snow.x>snow.dest.x-5 && snow.x<snow.dest.x+5 && snow.y>snow.dest.y-5 && snow.y<snow.dest.y+5) ){
                    snow.dest = false;
                }
                else {
                    snow.x += 0.51*(snow.x>snow.dest.x?-1:1);
                    snow.y += 0.51*(snow.y>snow.dest.y?-1:1);
                }// 
                if(snow.x>CW || snow.x<0 || snow.y>CH || snow.y<0) snow.dest = false
                
                
                //snow.proximity();
            });
            
            
            
            //if(!curl.last || curl.last>(100+Math.random()*30)){    curl.act(); curl.last = 0; }
            //curl.last++;
            
            
            //if(snows.anim>120 && text.y>100) {text.y--; text2.y--; text3.y--; text4.y--;}
        }
        function animate(){animation();requestAnimationFrame(animate);}
        animate();
    }//EO draw
    
          
        
    
    
    
    
    
}//EO startSnow





export default cdrawlogic;