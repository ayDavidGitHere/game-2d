import AppState from "./appstate.js";
import AppCss from "./appcss.js";
import ThreeLogic from "./threelogic.js";
import cdrawlogic from "./cdrawlogic.js";
function LoadElements(){
    this.canvasContainer = document.querySelector(".page .bg.three");
    this.cdrawcontainer = document.querySelector(".page .bg.cdraw");
    this.page = document.querySelector(".page");
}

function App(){
    let loadElements = new LoadElements();
    let threelogic = new ThreeLogic(loadElements.canvasContainer);
    let page = loadElements.page
    cdrawlogic.startSnow(loadElements.cdrawcontainer);
    AppCss(threelogic);
}
App();//calling app here rather than html else wepack would t do full compile
export default App;