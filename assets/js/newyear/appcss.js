import cdrawlogic from "./cdrawlogic.js";

function AppCss(threelogic){  
    let rotTexts = [...document.querySelectorAll("body.page .bg.html .rot-text")]
    rotTexts.map(rotText=>{
      rotText.addEventListener('mousemove', function (event) {
        event.preventDefault();
        let mousePos = {x:event.clientX/window.innerWidth, y:event.clientY/window.innerHeight};
        let left = (event.clientX>window.innerWidth/2?true:false);
        rotText.setAttribute("rot", left?"left":"right"); 
      });
    });
    document.querySelector("body.page .bg.html .rot-text.to").innerText = new URL(window.location).searchParams.get("to").toLowerCase() || "reciever";
    document.querySelector("body.page .bg.html .by").innerText = new URL(window.location).searchParams.get("by").toLowerCase() || "sender"
}

export default AppCss;