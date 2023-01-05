import cdrawlogic from "./cdrawlogic.js";

function AppCss(tms, threelogic){  
    document.querySelector(".page .about")
    .addEventListener("scroll", function(evt){ 
        tms.map((tm, ind)=>{
            if(tm.getBoundingClientRect().top<=window.innerHeight/2 && tm.getBoundingClientRect().top+tm.clientHeight>0) {  tm.setAttribute("inscreen", "yes"); }
            //if(tm.getBoundingClientRect().top+tm.clientHeight<=0) { tm.removeAttribute("inscreen", "yes"); }
            tm.inscreen = tm.getAttribute("inscreen")?true:false;
            
            
            if(ind==2 && tm.inscreen && !tm.justoccured){ 
                threelogic.particleManager.moveSphere(25);
                tm.justoccured = true;
            }
            if(ind==2 && tm.inscreen && !tm.justoccured){ 
                threelogic.particleManager.moveSphere(-25);
                tm.justoccured = true;
            }
            if(ind==3 && tm.inscreen && !tm.justoccured){ 
                threelogic.particleManager.enterSphere();
                tm.justoccured = true;
            }
            if(ind==4 && tm.inscreen && !tm.justoccured){
                //threelogic.particleManager.enterParticleInSphere();
                tm.rotateAndZoom();
                tm.justoccured = true;
                //tm.parentNode.style.overflowY = "hidden";
                document.querySelector(".page .boxs").style.display = "none";
                setTimeout(function(){
                    tm.parentNode.style.overflowY = "scroll";
                    document.querySelector(".page .boxs").style.display = "block";
                    tm.parentNode.scrollTop = document.querySelector(".page .boxs").offsetTop;
                    cdrawlogic.writeBoxs(document.querySelector(".page .boxs"));
                    tm.parentNode.style.overflowY = "hidden";
                },20000)
            }
            
            
            
            
            
        });
    });
    

    document.querySelector(".page .about .texts.text-last1").rotateAndZoom = function(){
        let tm = document.querySelector(".page .about .texts.text-last1");
        tm.setAttribute("rot", "0");
        setTimeout(function(){
            //tm.setAttribute("zoom", "");
        }, 4000)
    }
    
    
    
    
    
    
    
    //main-text texts animator
    let interval = 400;
    let timecount = 0;
    let blurind = 0;
    let xlist = [...document.querySelectorAll(".page .welcome .main-text x")];
    setInterval(function(){
        //if(timecount%(interval*15)==0) blurind = 0; //restart at every 
        timecount += interval;
        xlist.map(x=>{
            x.removeAttribute("blur", "");
        });
        if(blurind>=xlist.length) return;
        xlist[blurind].setAttribute("blur", "");
        blurind++;
    }, interval);
    
    
    
    
    
}

export default AppCss;