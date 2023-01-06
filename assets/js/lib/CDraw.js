let CDrawf = {};    
class CDraw{
    static scope= this
    static a
    static b
    static init= function(a, b){
        CDraw.a = a; CDraw.b = b;
    }
    static line= function(x, endX, y, endY, color="red", thick=1){
        [this.x, this.endX, this.y, this.endY, this.color,this.thick] =
        [x, endX, y, endY, color, thick];
        this.lengthX = Math.abs(this.x-this.endX);
        this.breadthY = Math.abs(this.y-this.endY);
        this.center = {};
        this.rotation = {rad: 0, about:this.center};
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.updateProps = (B)=>{
            this.center.x=this.x//+this.thick/2;
            this.center.y=this.y+this.breadthY/2;
        }//EO updateProps
        this.autoStyle = new CDraw.autoStyle(this.thick+"_"+this.color, this);
        
        this.draw = (B)=>{      
        B.beginPath();     
        this.autoStyle.call(B);
        B.moveTo(this.x, this.y); 
        B.lineTo(this.endX, this.endY); B.stroke();    
        B.closePath();
        this.updateProps(B);
        }
    }
    static sLine= function(x, lengthX, y, breadthY, color, thick, extras={}){
        [this.x, this.lengthX, this.y, this.breadthY, this.color,this.thick] =
        [x, lengthX, y, breadthY, color, thick];
        this.center = {};
        this.rotation = {rad: 0, about:this.center};
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.updateProps = (B)=>{
            this.center.x=this.x//+this.thick/2;
            this.center.y=this.y+this.breadthY/2;
        }//EO updateProps
        this.autoStyle = new CDraw.autoStyle(this.thick+"_"+this.color, this);
        
        this.draw = (B)=>{   
        this.endX = this.x+this.lengthX; this.endY = this.y+this.breadthY
        B.beginPath();     
        this.autoStyle.call(B);
        for(let key in extras){ B[key] = extras[key]; }
        B.moveTo(this.x, this.y); 
        B.lineTo(this.endX, this.endY); B.stroke();    
        B.closePath();
        this.updateProps()
        }
    }
    static lineShape= function(positions, styling){
        [this.x, this.endX, this.y, this.endY, this.positions, this.styling] =
        [positions[0][0], positions[positions.length-1][0],
        positions[0][1], positions[positions.length-1][1],
        positions, styling];
        this.center = {};
        this.rotation = {rad: 0, about:this.center};
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.updateProps = (B)=>{
            this.center.x=this.x//+this.thick/2;
            this.center.y=this.y//+this.breadthY/2;
        }//EO updateProps
        this.autoStyle = new CDraw.autoStyle(this.styling, this);
        
        
        this.draw = (B)=>{      
        B.beginPath();     
        B.moveTo(this.x, this.y);
        this.positions.map((position, index, array)=>{
            if(index!=0&&index!=array.length-1)
            B.lineTo(position[0], position[1]);
        });
        B.lineTo(this.endX, this.endY);
        this.autoStyle.call(B);
        B.closePath();
        this.updateProps(B);
        }
    }
    static polygon= function(positions=[], styling){
        [this.points, this.styling] =
        [positions, styling];
        this.center = {};
        this.rotation = {rad: 0, about: this.center};
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.updateProps = (B)=>{
            this.center.x=this.x//+this.thick/2;
            this.center.y=this.y//+this.breadthY/2;
        }//EO updateProps
        this.autoStyle = new CDraw.autoStyle(this.styling, this);
        
        
        
        this.drawPoints = (B)=>{
            if(this.points.length==0) return;
            this.x = this.points[0][0];
            this.y = this.points[0][1];
            this.endX = this.points[this.points.length-1][0];
            this.endY = this.points[this.points.length-1][1];
            B.beginPath();     
            B.moveTo(this.x, this.y);
            this.points.map((point, index, array)=>{
                if(index!=0&&index!=array.length-1)
                B.lineTo(point[0], point[1]);
            });
            B.lineTo(this.endX, this.endY);
        }
        this.draw = (B)=>{      
            this.drawPoints(B);
            this.autoStyle.call(B);
            B.closePath();
            this.updateProps(B);
        }
    }
    static text= function(fontStyle, text, x, y,styling, maxWidth=309000){
        this.adjustment = [ MATH$.countIn(fontStyle, "+"), MATH$.countIn(fontStyle, "*")];
        this.textAlign =    ["left", "center", "right"][this.adjustment[0]];
        this.textBaseline=    ["top", "middle", "bottom"][this.adjustment[1]];
        this.value = text; this.x = x; this.y = y; 
        this.font = fontStyle.replace( "+", "" ).replace("*", "");
        this.maxWidth = maxWidth;
        this.styling = styling;
        this.fontSize = this.font.replace(/\D/g, "");
        this.center = {}
        this.rotation = {rad: 0, about:this.center}
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.updateProps = (B)=>{
            this.center.x=this.x+(-(this.adjustment[0]-1)*this.fontSize/2);
            this.center.y=this.y-(-(this.adjustment[1]-1)*this.fontSize/2);
        }//EO updateProps
        this.autoStyle = new CDraw.autoStyle(this.styling, this);
        
        
        this.draw = (B)=>{   
        B.textAlign = this.textAlign; 
        B.textBaseline =  this.textBaseline;
        B.font = this.font;
        this.autoStyle.call(B, ()=>{
            B.strokeText(this.value, this.x, this.y, this.maxWidth); 
        },
        ()=>{
            B.fillText(this.value, this.x, this.y, this.maxWidth);
        });
        this.updateProps(B);
        }//EO draw
    }
    static arc= function(x, y, r, startAngle, endAngle, styling){
        this.x = x; this.y = y, this.radius = r; this.startAngle= startAngle;
        this.endAngle = endAngle; 
        this.styling = styling; this.type = "arc";
        this.center = {};
        this.rotation = {rad: 0, about:this.center}
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.indexInScene = null;
        this.updateProps = (B)=>{
            this.center.x = this.x; this.center.y = this.y;
        }
        this.autoStyle = new CDraw.autoStyle(this.styling, this);
        
        this.draw = (B)=>{   
            B.beginPath();
            B.arc(this.x, this.y, this.radius, this.startAngle,this.endAngle);
            this.autoStyle.call(B);
            B.closePath();
            this.updateProps(B);
        }
    }
    static rect= function( x, lengthX, y, breadthY, styling ){
        this.x = x;   this.lengthX = lengthX;
        this.y = y;   this.breadthY = breadthY;
        this.styling = styling;
        this.center = {};
        this.rotation = {rad: 0, about:this.center};
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.updateProps = (B)=>{
            this.center.x=this.x+this.lengthX/2;
            this.center.y=this.y+this.breadthY/2;
        }//EO updateProps
        this.autoStyle = new CDraw.autoStyle(this.styling, this);
        
        this.draw = (B)=>{      
            
            B.beginPath();
            this.autoStyle.call(B, ()=>{
            B.strokeRect(this.x, this.y, this.lengthX, this.breadthY );
            },
            ()=>{
            B.fillRect(this.x, this.y, this.lengthX, this.breadthY );
            })
            B.closePath();
        this.updateProps(B);
        }//EO draw
    }
    static img = function( src, x, lengthX, y, breadthY, extras={}, sx=null, sw=null, sy=null, sh=null){
        this.src = src;
        this.image = new Image();
        this.image.src = this.src;
        this.image.onload = function(){}
        if(this.src instanceof HTMLElement) this.image = src;
        this.x = x; this.lengthX = lengthX;
        this.y = y; this.breadthY = breadthY;
        this.sourceX = sx; this.sourceWidth = sw;
        this.sourceY = sy; this.sourceHeight = sh;
        this.center = {};
        this.rotation = {rad: 0, about:this.center}; this.scale = {x: 1, y: 1};
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.updateProps = (B)=>{
            this.center.x=this.x+this.lengthX/2;
            this.center.y=this.y+this.breadthY/2;
        }//EO updateProps
        
        
        this.draw = (B)=>{   
            B.drawImage(this.image,
            this.sourceX??0, this.sourceY??0, 
            this.sourceWidth??this.image.width, this.sourceHeight??this.image.height,
            this.x, this.y, this.lengthX, this.breadthY);
            if(this.postStyle) this.postStyle(B);
            this.updateProps(B);
        }//EO draw
    }
    static group = function(){
        
    }
    static Group = function(){
        this.children = [];
        this.x = 0;
        this.y = 0;
        this.add = (...children)=>{
            //[...children].map((a)=> alert(a) );
            this.children = [...this.children, ...children];
        }
        let animFrame = ()=>{
            this.children.map((child)=>{
                child.x = this.x;//+child.x;
                child.y = this.y;//+child.y;
            });
            requestAnimationFrame(animFrame)
        }
        //animFrame();
    }
    static autoStyle = function(styling, object){
       this.set = (styling)=>{
            var spl;
            if(typeof styling === "string") spl = styling.split("_");
            else spl = styling;
            this.object = object;
            this.color = this.object.color = spl[1]; 
            this.strokeWidth = this.object.strokeWidth = Number(spl[0]);
            this.styleType = "FILL";
            if(spl[0] == "") this.styleType = "FILL";    
            if(spl[0] != "") this.styleType = "STROKE";
       }
       this.call = (B,
       callStroke=function(){B.stroke();},
       callFill=function(){B.fill();},
       wild=function(){}
       )=>{
           //It is Reactive.
           this.color = this.object.color
           this.strokeWidth = this.object.strokeWidth
           if(this.styleType=="FILL"){ 
               B.fillStyle = this.color;
               callFill(); 
           }
           if(this.styleType =="STROKE"){
               B.lineWidth = this.strokeWidth; 
               B.strokeStyle = this.color;
               callStroke(); 
           }
           
           
           if(this.object.postStyle !== undefined) 
           this.object.postStyle(B);
           if(this.object.props !== undefined)
           for(let key in this.object.props){B[key]= this.object.props[key];}
       }//EO call
       this.set(styling);
    }
    //Transform
    static rotate= function(child, B){
        if(!child.scale) child.scale = {x:1, y:1};
        let rotrad = (child.rotation.rad!==0)
        if(rotrad) 
        B.translate(child.rotation.about.x , child.rotation.about.y);
        B.translate(child.scale.x==-1?(B.canvas.width-(B.canvas.width/2-child.x)*2+child.lengthX)*1:0, 0)
        B.rotate(child.rotation.rad);
        B.scale(child.scale.x||1, child.scale.y||1);
        //B.translate(child.scale.x==-1?(B.canvas.width/2-child.x)*2:0, 0)
        if(rotrad)
        B.translate(-child.rotation.about.x, -child.rotation.about.y);
        //B.translate(child.scale.x==-1?(B.canvas.width+child.x-child.lengthX/2)*-1:0, 0)
    }
    static shadow = function(B, params){
        [B.shadowColor, B.shadowOffsetX, B.shadowOffsetY, B.shadowBlur] =
        [params[2], params[0], params[1], params[3]];
    }
    static stylesAndComposites = {
        draw: function(child, B){
            B.globalAlpha = child.alpha; 
            CDraw.shadow(B, child.GCParams.shadow);
            B.globalCompositeOperation = (child.GCParams.op!=undefined?child.GCParams.op:"source-over");
            B.globalCompositeOperation = (child.color=="clear"?"destination-out":B.globalCompositeOperation);
        },
        restore: function(B, child){
            B.globalAlpha = 1;  
            CDraw.shadow(B, [0, 0, "transparent", 0]);
            if(child.GCParams.norestore){  }
            else
            B.globalCompositeOperation = "source-over";
        }
    }
    static useScene= function(context, runnable=function(){}){
        ["rect", "img", "text", "arc", "line", "sLine", "lineShape", "polygon"]
        .map((object)=>{
            //CDraw[object].prototype.rotation = {rad:0};
            CDraw[object].prototype.shapeName = object;
            /*
            CDraw[object].prototype.GCParams = {
                shadow: [0, 0, "transparent", 0],
            }
            */
        })
        this.B = context;
        this.allChildren = [];
        let animFrame = ()=>{
            CDraw.clearCanvas(this.B); 
            this.allChildren.map((child, childIn) =>{
                child.indexInScene = childIn;
                this.B.save();
                CDraw.stylesAndComposites.draw(child, this.B);
                CDraw.rotate(child, this.B);
                child.draw(this.B);
                CDraw.stylesAndComposites.restore(this.B, child);
                this.B.restore();
            });
            runnable(this);
            requestAnimationFrame(animFrame);
            //console.log("all", this.allChildren)
        }
        animFrame();
        this.add = (child)=>{
            child.indexInScene = this.allChildren.length;
            //Translation should be declared after scene.add().
            child.translation = {x:0, y:0, allow:false};
            this.allChildren.push(child);
        }
        this.remove = (child)=>{
        if(child.indexInScene)this.allChildren.splice(child.indexInScene,1);
        else {}
        }
    }//EO useScene
    static clearCanvas= function(B){
        B.clearRect(0, 0, B.canvas.width, B.canvas.height)
    }
    
    
    
    
    
    
    
    static functions = {
        getOpaquePixels: (B, startX, limitX, startY, limitY, option, callback)=>{
        var arr_opaq_pos = [];  
	    var imD = B.getImageData(startX, startY, limitX, limitY);   
    	var _width = imD.width*4;   
	    var allPixels = imD.data;   
	    var length = allPixels.length;
	    var rP = 0; var gP=0; var bP=0; var aP = 0; 
        for(let pos=0; pos <= length -4; pos+=4) {
		    var posX = (pos - Math.floor(pos/_width)*_width)/4;
		    var posY = Math.floor(pos/_width);
            rP = allPixels[pos],
		    gP = allPixels[pos+1],
		    bP = allPixels[pos+2],
		    aP = allPixels[pos+3];
		    
		    for(let i=0; option.length<4; i++){option.push(null)}
		    for(let i=0; option.length>i; i++){
		        if(option[i]==null) option[i] = 256
		    }
		    if(rP>option[0] ||
		       gP>option[1] ||
		       bP>option[2] ||
		       aP>option[3]
		    ) arr_opaq_pos.push({x: posX, y: posY, rgba: [rP,gP,bP,aP]});
        }//EO for
        callback( arr_opaq_pos );
        }// EO getOpaquePixels
    }
}//EO CDraw
        
        
        
      
/***
 * ADD: sourceWidth, sourceHeight for --- img
 * ADD: postStyle
 * 
 * //CONSISTENT
 */