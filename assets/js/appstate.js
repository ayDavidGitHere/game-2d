

function AppState(){
    let ctx = this;
    this.pages = [...document.querySelectorAll("[app-page]")];
    this.pageso = {};
    this.registerPages = function(){
        ctx.pages.map(page=>{
            ctx.pageso[page.getAttribute("app-page")] = page;
        });
    }
    this.registerPages();
    this.goneAllPages = function(){
        ctx.pages.map(page=>{
            page.setAttribute("gone", "")
        });
    };
    this.showAllPages = function(){
        ctx.pages.map(page=>{
            page.removeAttribute("gone", "")
        });
    };
    this.gonepage = function(pagename, call=()=>{}){
        ctx.showAllPages();
        ctx.pageso[pagename].setAttribute("gone", "");
        call();
    };
    this.showpage = function(pagename, call=()=>{}){
        ctx.goneAllPages();
        ctx.pageso[pagename].removeAttribute("gone", "");
        call();
    };
}

export default AppState;