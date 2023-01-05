
class MATH${
    
    static compareArr(arr, arrComp, callback){
        if( JSON.stringify(arr) == JSON.stringify(arrComp) ){
            callback()
        }
    }
    static randOpt(val, val2){
        return arguments[Math.floor(Math.random()*arguments.length)]
    }
    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static convDegRad(deg){
        return deg*(Math.PI/180)
    }
    static objCallB( elementsBy, callback ){
        [].slice.call( elementsBy ).map( function(elementAt, elementInd){
            callback(elementAt, elementInd);
        });  
    }
    static indexFrom(cnt, i, j){
        return i*cnt+j; //5, 3, 2 = 
    }
    static clamp(val, min, max) {
        return Math.min(Math.max(min, +val), max);
    }
    static resultantOf(x, y){
        return Math.sqrt( Math.pow(x, 2)+Math.pow(y, 2) );
    }
    static signelta(num, over){
      return (1- 2*(Math.floor(num/over)%2));
    }
    static countIn(string, substring){
        return ( string.split(substring).length -1 );
    }
    static breakUndefined(arg, context){
        arg.map((a)=>{
            if(a==undefined)context.return;
        })
    };
}//EO MATH$






class ObjHelp{
    static getPropsOf(obj, props = []){
        return obj == null ? props :
        this.getPropsOf(Object.getPrototypeOf(obj),
        props.concat(Object.getOwnPropertyNames(obj)));
    }
}//EO ObjHelp
    
    
    
    
class DOM${
    static _(string, index=0){
        let element = DOM$.SLT(string, index);
        return element;
    }
    static $(string){ 
          return  document.getElementById(string);
    }
    static CLS(string, index){ 
        if(typeof index == "number"){
          return  document.getElementsByClassName(string)[index];
        }
        if(index == "length"){
         return  document.getElementsByClassName(string).length;    
        }
        if(index == "class"){ 
         return  document.getElementsByClassName(string);
        }
    }
    static TAGN(string, index){
        if(typeof index == "number"){
          return  document.getElementsByTagName(string)[index];
        }
        if(index == "length"){
         return  document.getElementsByTagName(string).length;    
        }
        if(index == "class"){ 
        return  document.getElementsByTagName(string);
        }
    }//EO tagn
    static SLT(string, index){
        if(typeof index == "number"){ 
          return  document.querySelectorAll(string)[index];
        }
        if(index == "length"){
         return  document.querySelectorAll(string).length;    
        }
        if(index == "this"){ 
        return  document.querySelectorAll(string);
        }
    }
    static Temps = [];
    static GetTemp(name, remove=false){
        /**
        * The temp element does not disappear,
        * the optional 2nd argument (Boolean remove) removes it.
        * If you remove it with css-hide, it may cause problems with specifity of element's selector(id, ...)
        **/
        var thisTemp = null;
        DOM$.Temps.map((val)=>{
            if(val[name] !== undefined && val[name] != null){ 
                thisTemp = val[name];
            }
        });
        if(thisTemp == null){   
            if(DOM$._(name) == undefined) return ;
            let val = {}; 
            val[name] = DOM$._(name).innerHTML;
            DOM$.Temps.push(val);
            if(remove) DOM$._(name).innerHTML = "";
            return DOM$.GetTemp(name);
        }
        if(thisTemp != null){
            return thisTemp;
        }
    }
    static SetTemp(name, value){
        let val = {}; 
        val[name] = value
        DOM$.Temps.push(val);
        return DOM$.GetTemp(name);
    }
    static x = {
    box: function(string){
        let box = document.createElement("div");
        DOM$._("body").appendChild(box);
        box.style =`
            width: 90%;
            height: 50px;
            background-color: #000000ef;
            position: fixed;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            display: block;
            margin: 0 auto;
            border-radius: 5px;
            padding: 10px; box-sizing: border-box;
            `;
        box.innerHTML =`
            <p style="color: white; text-align: center;">${string}</p>
        `;
        box.opacity = 1;
        //setTimeout
        let timer = (function(){
            box.opacity -= 0.005/(box.opacity);
            box.style.opacity = box.opacity;
            if(box.opacity < 0) DOM$._("body").removeChild(box);
            else setTimeout(timer, 10);
        });
        timer();
    },//EO box
    toast: function(string, color="#0C0E12"){
        let box = document.createElement("div");
        DOM$._("body").appendChild(box);
        box.style =`
            width: 90%;
            height: 50px;
            background-color: ${color};
            position: fixed;
            top: 100%; left: 50%;
            transform: translate(-50%, -100%);
            z-index: 10000;
            display: block;
            margin: 0 auto;
            border-radius: 5px;
            padding: 10px; box-sizing: border-box;
            `;
        box.innerHTML =`
            <p style="color: white; text-align: center;">${string}</p>
        `;
        box.opacity = 1;
        //setTimeout
        let timer = (function(){
            box.opacity -= 0.002/(box.opacity);
            box.style.opacity = box.opacity;
            if(box.opacity < 0) DOM$._("body").removeChild(box);
            else setTimeout(timer, 10);
        });
        timer();
        

    },//EO toast
    }//EO x
    
    
    
    
    static OnLoad = function(event){}
    static OnLoadList = [];
    static RunOnLoad(event){ DOM$.OnLoadList.push(event); };
}
    
document.addEventListener("DOMContentLoaded", function(event) {
 DOM$.OnLoad(event);
 DOM$.OnLoadList.map((fnct)=>{
     fnct();
 });
});








class BROWSERHelp{
    static Copy(text){
        window.navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }
}
    

class NETHelp {
    
    static AJAX(type, params, address, callback, callbackYet=function(){} ){
        var url = address + '?'; var notFirst = false;
        for (var key in params) {
            if (params.hasOwnProperty(key)) {url += (notFirst ? '&' : '') + key + "=" + params[key];}
            notFirst = true;
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4){
            if(xmlhttp.status == 200){callback(xmlhttp.responseText);}
        }
        else{callbackYet(xmlhttp);}
        };
        xmlhttp.open(type, url, true);
        xmlhttp.send();
    }   
             
}//EO NETHelp
    