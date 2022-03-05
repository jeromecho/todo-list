import Project from './project';
import Task from './task';
import { format } from 'date-fns';

const body = document.querySelector("body");
const editDisplay = document.createElement("form"); 

const generateInterface = function() {

    body.appendChild(makeMain()); 
}

const firstProjectName = function() {
    let initialProj = document.querySelector("#project0");
    let initialName;

    console.log(initialProj);

    if (initialProj) {
        initialName = initialProj.value;
    }

    return (initialProj)? initialName: "Project 1";
};

const deleteInterface = function() {
    while (body.firstChild) {
        body.removeChild(body.lastChild);
    }

    while (editDisplay.firstChild)  {
        editDisplay.removeChild(editDisplay.firstChild);
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

        project.value = projectNames[i];
        
        project.addEventListener("click", () => {
            if (project.hasAttribute("readonly")) {
                project.removeAttribute("readonly");
            } else {
                project.setAttribute("readonly", "true");
            }
        });

        let temp = Project.returnByName(project.value);

        project.addEventListener("mouseleave", updateOnLeave.bind(project, project, temp));
        projectContainer.addEventListener("dblclick", changeTaskBoard.bind(project, project));

        // for initialization
        setToReadOnly(project); 

        projectContainer.appendChild(project);
        menu.appendChild(projectContainer);
    }
}

const changeTaskBoard = function (project) {
    let tempProject = Project.returnByName(project.value);

    Project.currentProjectTitle = tempProject.name;
    Task.currentTaskList = tempProject.taskList;

    updateInterface();
};

const updateOnLeave = function (project, temp) {
    let newTemp = temp;
    newTemp.name = project.value;

    Project.updateProj(temp.name, newTemp);

    if (! temp.name == newTemp.name) changeTaskBoard(newTemp);
};

const setToReadOnly = function(project) {
       if (! project.hasAttribute("readonly")) {
            project.setAttribute("readonly", "true");
        } 
};


// project button 
const makePButton = function() {
    const addProject = document.createElement("div");

    addProject.id = "project-button";
    addProject.className = "add-button";

    addProject.addEventListener("click", () => {
        let newProject = Project.makeProject({name: "Untitled"});
        Project.addProjectToList(newProject);
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
    taskBoard.appendChild(editDisplayContent());

    return taskBoard;
}

const editDisplayContent = function () {
    editDisplay.id = "edit-display"; 

    const titleLabel = document.createElement("label");
    const dueDateLabel = document.createElement("label");
    const priorityLabel = document.createElement("label");
    const descriptionLabel = document.createElement("label");

    titleLabel.textContent = "Title";
    dueDateLabel.textContent = "Due Date";
    priorityLabel.textContent = "Priority";
    descriptionLabel.textContent = "Description";

    const title = document.createElement("input");
    const dueDate = document.createElement("input");
    const priority = document.createElement("input");
    const description = document.createElement("input");

    title.id = "title";
    dueDate.id = "due-date"; 
    priority.id = "priority"; 
    description.id = "description";

    dueDate.type = "date";

    // load/display info of task 

    let currentTask = Task.currentTask; 

    title.value = currentTask.title; 
    dueDate.value = currentTask.dueDate;
    priority.value = currentTask.priority;
    description.value = currentTask.description;
    

    editDisplay.appendChild(titleLabel);
    editDisplay.appendChild(title);
    
    editDisplay.appendChild(dueDateLabel);
    editDisplay.appendChild(dueDate);
    
    editDisplay.appendChild(priorityLabel);
    editDisplay.appendChild(priority);

    editDisplay.appendChild(descriptionLabel);
    editDisplay.appendChild(description);

    // turns HTMLCollection into array containing elements 
    const fields = Array.from(editDisplay.children);

    // access the child elements directly 
    for (let i = 0; i < fields.length; i++) {
        fields[i].className = "field";
    }

    editDisplay.appendChild(makeButtonsContainer());

    return editDisplay;
}

const makeButtonsContainer = function() {
    const container = document.createElement("div");
    const doneButton = document.createElement("div");
    const cancelButton = document.createElement("div");

    const doneText = document.createElement("p");
    const cancelText = document.createElement("p");

    doneText.textContent = "Done";
    cancelText.textContent = "Cancel";

    container.id = "buttons-container";

    doneButton.id = "done-button";
    cancelButton.id = "cancel-button";

    doneButton.appendChild(doneText);
    cancelButton.appendChild(cancelText);

    doneButton.addEventListener("click", () => {
        const displayFields = Array.from(editDisplay.children);
        if (displayFields[1].value == "") {
            alert("Please give a valid title");
        } else if (displayFields[3].value == "") {
            alert("Please give a valid date.");
        }else {
            toggleEditDisplay();
            updateTask();
            updateInterface();
        }
    });

    cancelButton.addEventListener("click", () => {
        toggleEditDisplay();
        updateInterface();
    });

    container.appendChild(doneButton);
    container.appendChild(cancelButton);

    return container;
}

const makeProjectDisplay =  function(projectTitle) {
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
        let date = document.createElement("p");

        text.className = "text";
        date.className = "date";

        let currentTask = Task.currentTaskList[i];
        container.className = "task";
        text.textContent = currentTask.title;
        // currentTask.duedate is a string
        date.textContent = format(new Date(currentTask.dueDate), 'MM/dd/yyyy');

        container.addEventListener("click", () => {
            updateCurrentTask(currentTask); 
            toggleEditDisplay();
            updateInterface();
        });

        let delButton = document.createElement("div");
        delButton.id = "del-button";

        delButton.addEventListener("click", () => {
            updateCurrentTask(currentTask);
            deleteTask();
            updateInterface();
        });

        container.appendChild(delButton);
        container.appendChild(text);
        container.appendChild(date);

        pd.appendChild(container);
    }
}

const deleteTask = function() {
    let delTask = Task.currentTask;

    // update context for currentTaskList (iffy) 
    Task.deleteTask(delTask, Task.currentTaskList);
    toggleEditDisplay();

    console.log(Task.currentTaskList);
}

const updateCurrentTask = function(currentTask) {
    Task.currentTask = currentTask;
};

// using Task.currentTask, replaces info in currenTaskList
const updateTask = function() {

    let replaceTask = Task.currentTask; 
    let newTask = Task.currentTask;

    const displayFields = Array.from(editDisplay.children);

    newTask.title = displayFields[1].value; 
    newTask.dueDate = formatDate(displayFields[3].value);
    newTask.priority = displayFields[5].value;
    newTask.description = displayFields[7].value;
    
    Task.updateTaskList(replaceTask, newTask);
    
    updateInterface();
};

// Takes in string of format 'xxxx-xx-xx' and returns corresponding new date
const formatDate = function(unformatted) {
    let arr = unformatted.split('-');
    return new Date(`${arr[0]}, ${arr[1]}, ${arr[2]}`);
};

const toggleEditDisplay = function() {
    let style = window.getComputedStyle(editDisplay);
    let display = style.getPropertyValue("display");
    if (display == "none") {
        editDisplay.style.display = "flex";
    } else {
        editDisplay.style.display = "none";
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

    addTask.addEventListener("click", () => { 

        // TODO 

       console.log(Project.currentProjectTitle);
       console.log(projectTitle.textContent);

    
        // projectTitle.textContent is not updating
       let tempProj = Project.returnByName(projectTitle.textContent);

       // TEST, can delte
       Project.addBackMethod(tempProj);

       tempProj.addTask({title: "Untitled", dueDate: new Date(), priority: 0, description: ""}); 
       console.log(tempProj);
       
       Project.updateProj(tempProj.name, tempProj);
       updateInterface();
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

const returnProjectList = function() {
    let projectList = Project.returnProjectNames().map(name => Project.returnByName(name));

    return projectList;
};

export default generateInterface; 



