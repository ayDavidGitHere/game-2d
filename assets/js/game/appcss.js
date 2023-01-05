        

function AppCss(tms){ 
    window.setInterval(function(){
        tms.map(tm=>{
            tm.inscreen = tm.getAttribute("inscreen")?true:false;
            if(!tm.inscreen && tm.getBoundingClientRect().top<=window.innerHeight/2) {  tm.setAttribute("inscreen", "yes"); }
        });
    }, 300)
}

export default AppCss;