import Project from './project';
import Task from './task'

const body = document.querySelector("body"); 

const generateInterface = function() {
    body.appendChild(makeMain()); 
}

const makeMain = function () {
    const main = document.createElement("main"); 

    main.appendChild(makeHeader()); 
    main.appendChild(makeContent());

    return main; 
}

const makeHeader = function() {
    const header = document.createElement("div");
    const title = document.createElement("h1");
    header.id = "header";
    title.id = "title"; 

    title.textContent = "Too-doo!";

    header.appendChild(title);

    return header; 
}

const makeContent = function() {
    const content = document.createElement("div"); 
    content.id = "content";

    content.appendChild(makeMenu()); 
    content.appendChild(makeTaskboard());

    return content;
}

const makeMenu = function() {
    const menu = document.createElement("div");
    menu.id = "menu"; 

    // hard code 
    const project1 = document.createElement("h2"); 
    const project2 = document.createElement("h2"); 
    const project3 = document.createElement("h2");

    project1.textContent = "Project 1"; 
    project2.textContent = "Project 2";
    project3.textContent = "Project 3";
    
    project1.id = "project1"; 
    project2.id = "project2"; 
    project3.id = "project3"; 


    menu.appendChild(project1);
    menu.appendChild(project2); 
    menu.appendChild(project3);
    menu.appendChild(makePButton());

    return menu;
}

const makePButton = function() {

    const addProject = document.createElement("div");

    addProject.id = "project-button";
    addProject.className = "add-button";

    const verticalCross = document.createElement("div"); 
    const horizontalCross = document.createElement("div");

    verticalCross.className = "vertical-cross";
    horizontalCross.className = "horizontal-cross";

    addProject.appendChild(verticalCross);
    addProject.appendChild(horizontalCross);

    return addProject; 
};

const makeTaskboard = function() {
    const taskBoard = document.createElement("div"); 
    taskBoard.id = "taskboard"; 

    const projectTitle = document.createElement("h1");

    projectTitle.id = "project-title";

    projectTitle.textContent = "Dummy Project"; 

    taskBoard.appendChild(projectTitle);
    taskBoard.appendChild(makeProjectDisplay());

    return taskBoard;
}

const makeProjectDisplay = () => {
    const projectDisplay = document.createElement("div");

    projectDisplay.id = "project-display";

    // dummy values 
    for (let i = 0; i < 5; i ++) {
        let text = document.createElement("p");
        text.textContent = `task ${i}`;
        projectDisplay.appendChild(text);
    }

    // !!!
    projectDisplay.appendChild(makeAddContainer());

    return projectDisplay;
};


const makeAddContainer = function() {
    const container = document.createElement("div");
    const addTask = document.createElement("div");
    container.id = "add-container";

    addTask.id = "add-task-button";
    addTask.className = "add-button";

    const verticalCross = document.createElement("div");
    const horizontalCross = document.createElement("div");

    verticalCross.className = "vertical-cross"; 
    horizontalCross.className = "horizontal-cross";

    addTask.appendChild(verticalCross);
    addTask.appendChild(horizontalCross);
    
    container.appendChild(addTask);

    return container;
};

export default generateInterface; 

