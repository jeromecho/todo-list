const body = document.querySelector("body"); 

const generateInterface = function() {
    body.appendChild(makeMain()); 
}

const makeMain = function () {
    const main = document.createElement("main"); 
    main.appendChild(makeMenu()); 
    main.appendChild(makeContent());

    return main; 
}

const makeMenu = function() {
    const menu = document.createElement("div");
    menu.id = "menu"; 

    return menu;
}

const makeContent = function() {
    const content = document.createElement("div"); 
    content.id = "content"; 

    return content;
}

export default generateInterface; 

