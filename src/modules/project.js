import Task from './task';

const Project = (function() {

    const makeProject = ({name}) => ({
        taskList: [Task.makeTask({ title: "Do task", dueDate: new Date(2022, 1, 2), priority: "High", description: "Do task."})], 
        name: name, 
        addTask: function({title, dueDate, priority, description}) {
            this.taskList.push(Task.makeTask({ title, dueDate, priority, description }));
        }
    });

    const addBackMethod = (proj) => {
        proj.addTask = function({title, dueDate, priority, description}) {
            this.taskList.push(Task.makeTask({ title, dueDate, priority, description }));
            console.log(this.taskList);
        };  
    };

    let _projectList = [makeProject({name: "Project 1"})];
    
    const currentProjectTitle = _projectList[0].name;

    const addProjectToList = (proj) => {
        _projectList.push(proj); 
    }

    const reassignProjectList = (projects) => {
        _projectList = projects; 
    };

    // takes in proj name and updated object, updates _projectList w splice, no return value
    const updateProj = (name, proj) => {
        let index = _projectList.map(proj => proj.name).indexOf(name);
        _projectList.splice(index, 1, proj);
    }

    const returnProjectNames = () => {
        return _projectList.map(project => project.name);
    };

    const returnByName = (name) => {
        return _projectList.filter(project => (project.name == name))[0];
    }

    const delTask = (title) => {
        let index = this.taskList.map(task => {
            return task.title; 
        }).indexOf(title); 

        taskList.splice(index, 1);
    }

    return { makeProject, 
        delTask, 
        returnProjectNames, 
        addProjectToList, 
        returnByName,
        currentProjectTitle,
        reassignProjectList,
        updateProj,
        addBackMethod,
    }
})();

export default Project;
