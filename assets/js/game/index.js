import ThreeLogic from "./threelogic.js";
function LoadElements(){
    this.canvasContainer = document.querySelector("threejs");
}





function Index(){
    let loadElements = new LoadElements();
    let threelogic = new ThreeLogic(loadElements.canvasContainer);
}
Index();
export default Index;