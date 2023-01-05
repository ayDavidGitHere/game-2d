import cdrawlogic from "./cdrawlogic.js";
import createsprites from "./createsprites.js";
function LoadElements(){
    this.canvas = document.querySelector("canvas#game-canvas")
}








function App(){
    let loadElements = new LoadElements();
    //createsprites.do(loadElements.canvas);
    cdrawlogic.loadGame(loadElements.canvas);
}
App();//calling app here rather than html else wepack would t do full compile
export default App;