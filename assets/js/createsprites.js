let createsprites = {};
createsprites.do = function(canvas){
    
    
    
    
    
    
    
    
    
    
    
        
        
        
    
    
    
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
         let init = initWorld();
         window.Game = {...window.Game, canvas: init.canvas, context: init.context, paused:false}; 
         draw();
    }    
    run();
                     
                     
                     
    function draw(){
        let {canvas: a, context: b} = Game;
        let ww = a.parentNode.clientWidth/1.4;
        let wh = a.parentNode.clientHeight/1.7; console.log(ww, wh);
        let CW = a.width = ww;
        let CH = a.height = wh;
        let CR = MATH$.resultantOf(CW, CH);
        Game.CW = CW, Game.CH = CH;
        let scene = new CDraw.useScene(b); console.log(b)
        let bgRect = new CDraw.rect(0,CW,0,CH,"_#ffffff55");
        //scene.add(bgRect);
        let text = new CDraw.text("+60px iFi", "COOL ASF", CW/2, CH/2, "_white");
        scene.add(text);
        
        
        
        let art = new CDraw.img("./assets/sprites/Medieval Warrior Pack/Attack1.png", 0, CW, 0, CH );
        scene.add(art); console.log(art);
        art.image.onload = (function(){
            a.width = art.image.width;
            a.height = art.image.height;
            art.lengthX = a.width*(4/3);
            art.breadthY = a.height;
            art.postStyle = function(ctx){
              ctx.clearRect(45*4/3, 20, 27, 27); 
              ctx.clearRect(245*4/3, 20, 25, 25); 
              ctx.clearRect(420*4/3, 0, 200, 40); 
              ctx.clearRect(497*4/3, 40, 80, 80); 
              ctx.clearRect(680*4/3, 40, 50, 80); 
            }
            let knife = new CDraw.polygon([[495*4/3, 35], [497*4/3+10, 40-10], [497*4/3+10+4, 40-10], [495*4/3+4, 35.0]], "_white");
            scene.add(knife);
        });
        
        
        
        
        
        function animate(){ requestAnimationFrame(animate);}
        animate();
    }//EO draw
    
    Game.canvas.onclick = function(){
      let a = document.createElement("a");
      a.href = Game.canvas.toDataURL();
      a.download = "sprite.png";
      a.click()
    }
    
    
}//EO loadGame





export default createsprites;