import Project from './project';
import Task from './task'

const body = document.querySelector("body"); 

const generateInterface = function() {
    body.appendChild(makeMain()); 
}

const deleteInterace = function() {
    while (body.firstChild) {
        body.removeChild(body.lastChild);
    }

}

const updateInterface = function() {
    deleteInterace(); 
    generateInterface();
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

    // appends projects names to menu
    appendProjects(menu);

    menu.appendChild(makePButton());

    return menu;
}

const appendProjects = function (menu) {
    let projectNames = Project.returnProjectNames();

    for (let i = 0; i < projectNames.length; i++) {
        let projectContainer = document.createElement("div");
        let project = document.createElement("h2");

        projectContainer.className = "project-container";
        project.id = `project${i}`;
        project.className = "project";
        project.textContent = projectNames[i];

        projectContainer.appendChild(project);

        menu.appendChild(projectContainer);
    }
}


// project button 
const makePButton = function() {

    const addProject = document.createElement("div");

    addProject.id = "project-button";
    addProject.className = "add-button";

    addProject.addEventListener("click", () => {
        let newProject = Project.makeProject({name: "Untitled"});
        Project.addProjectToList(newProject);
        // update entire interface 
        updateInterface();
    });

    /* ERROR here
    // create new project
    addProject.addEventListener("click", () => {
        let newProject = Project.makeProject({"Untitled Project"});
        Project.addProjectToList(newProject);
        // add to project list 
        // append the new project using appendProjects to menu 
        // issue, don't have access to menu right now 
    });
    */


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

    // TODO 
    addTask.addEventListener("click", () => {
       console.log("Harmless");
    });

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

