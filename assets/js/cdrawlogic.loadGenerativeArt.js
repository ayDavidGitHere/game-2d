
let loadGenerativeArt1 = function(canvas){
    
    
    
    
    
    
    
    
    
    
    
        
        
        
    
    
    
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
        let ww = a.parentNode.clientWidth/2;
        let wh = ww
        let CW = a.width = ww;
        let CH = a.height = wh;
        let CR = MATH$.resultantOf(CW, CH);
        Game.CW = CW, Game.CH = CH;
        let scene = new CDraw.useScene(b);
        let bgRect = new CDraw.rect(0,CW,0,CH,"_#ffffff55");
        scene.add(bgRect);
        
        let units = 32;
        function Node(startpos=[Math.floor(Math.random()*33),0]){
          this.chnglist = [];
          this.poslist = [ startpos ];
          this.addPosR = function(){
            let pos = [  -2+Math.floor(Math.random()*5), 0+Math.floor(Math.random()*2)  ];
            if(pos[0]==0&&pos[1]==0) return false;
            if(pos[0]!=0 && pos[1]==1){console.log("bad climb: ", -1==-1, pos); return this.addPosR(); }
            this.chnglist.push(pos); //console.log(pos)
            return true;
          }
          this.spawnPos = function(){
            let poslen = this.poslist.length,  chnglen = this.chnglist.length;
            while(this.poslist[poslen-1][0] <=32 && this.addPosR() ){
              poslen = this.poslist.length;
              chnglen = this.chnglist.length;
              this.poslist.push([ this.poslist[poslen-1][0]+this.chnglist[chnglen-1][0],   this.poslist[poslen-1][1]+this.chnglist[chnglen-1][1]]);
                  if(Math.random()>0.8) {
                            let newnode = new Node([ this.poslist[poslen-1][0]+this.chnglist[chnglen-1][0],   this.poslist[poslen-1][1]+this.chnglist[chnglen-1][1]]);
                            newnode.spawnPos();
                            newnode.drawPos();
                  }
            }
          }
          this.drawPos = function(){
            this.poslist.map((pos)=>{
              let sq = new CDraw.rect(0,0,0,0,"_red");
              sq.x = CW*(pos[0]/32); sq.y = CW*(pos[1]/32);
              sq.lengthX = CW/32; sq.breadthY = CW/32; 
              scene.add(sq); //console.log(sq)
            })
          }
        }
        let nodes = [];
        for(let i=0; 5>i; i++){
        let newnode = new Node();
        newnode.spawnPos();
        newnode.drawPos();
        }
        
        
        
        
        
        function animate(){anim(CW, CH); requestAnimationFrame(animate);}
        animate();
    }//EO draw
    
    function anim(CW, CH){
        
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
              resolve({});
        });
      }//EO finishload
    }
          
        
    
    
    
    
    
}//EO loadGame





export default loadGenerativeArt1;