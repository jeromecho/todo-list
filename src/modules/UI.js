import Project from './project';
import Task from './task'

const body = document.querySelector("body"); 

const generateInterface = function() {
    body.appendChild(makeMain()); 
}

const deleteInterface = function() {
    while (body.firstChild) {
        body.removeChild(body.lastChild);
    }

}

const updateInterface = function() {
    deleteInterface(); 
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
        let project = document.createElement("input");

        projectContainer.className = "project-container";

        project.id = `project${i}`;
        project.className = "project";
        project.type = "text";

        // POTENTIAL EDIT 
        project.value = projectNames[i];
        
        projectContainer.addEventListener("click", () => {
            let tempProject = Project.returnByName(project.textContent);

            Project.currentProjectTitle = tempProject.name;
            Task.currentTaskList = tempProject.taskList; 

            updateInterface();
        });

        // TODO: implement dblclick name change 
        projectContainer.addEventListener("dblclick", () => {
            if (project.hasAttribute("readonly")) {
                project.removeAttribute("readonly");
            } else {
                project.setAttribute("readonly", "true");
            }
        });

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

    projectTitle.textContent = Project.currentProjectTitle; 

    taskBoard.appendChild(projectTitle);
    taskBoard.appendChild(makeProjectDisplay(projectTitle));

    return taskBoard;
}

const makeProjectDisplay = (projectTitle) => {
    const projectDisplay = document.createElement("div");

    projectDisplay.id = "project-display";
    
    appendTasks(projectDisplay);

    projectDisplay.appendChild(makeAddContainer(projectTitle));

    return projectDisplay;
};

const appendTasks = function(pd) {
    // For initialization
    checkTaskList();

    for (let i = 0; i < Task.currentTaskList.length; i ++) {
        let container = document.createElement("div");
        let text = document.createElement("p");
        container.className = "task";
        text.textContent = Task.currentTaskList[i].title;
        // insert more task functionality 
        container.appendChild(text);
        pd.appendChild(container);
    }
}

const checkTaskList = function() {
    // when user loads webpage
    if (Task.currentTaskList.length == []) {
        Task.currentTaskList = (Project.returnByName(Project.returnProjectNames()[0])).taskList;
    } else {
        return; 
    }
}

// takes in project title from decsending inheritance, uses it to access project
const makeAddContainer = function(projectTitle) {
    const container = document.createElement("div");
    const addTask = document.createElement("div");
    container.id = "add-container";

    addTask.id = "add-task-button";
    addTask.className = "add-button";

    // TODO 
    addTask.addEventListener("click", () => { 
       
       let tempProj = Project.returnByName(projectTitle.textContent);

       tempProj.addTask({title: "Untitled", dueDate: 0, priority: 0, description: ""}); 
       
       Project.updateProj(tempProj.name, tempProj);
       updateInterface();
       // allow task to find out what container it is in
       // 1. create a default tawsk 
       // 2. add task to the tasklist of the project 
       // 3. update interface (should take care of rest)
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

