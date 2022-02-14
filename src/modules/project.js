import Task from './task';

const Project = (function() {

    const makeProject = ({name}) => ({
        taskList: [Task.makeTask({ title: "Do task", dueDate: "February 7", priority: "High", description: "Do task."})], 
        name: name, 
        addTask: function({title, dueDate, priority, description}) {
            this.taskList.push(Task.makeTask({ title, dueDate, priority, description }));
        }
    });

    const _projectList = [makeProject({name: "Project 1"}), 
    makeProject({name: "Project 2"}), makeProject({name: "Project 3"})];

    const currentProjectTitle = _projectList[0].name;

    const addProjectToList = (proj) => {
        _projectList.push(proj); 
    }

    // takes in proj name and updated object, updates _projectList w splice, no return value
    const updateProj = (name, proj) => {
        let index = _projectList.map(proj => proj.name).indexOf(name);
        _projectList.splice(index, 1, proj);
    }

    // returns a copy 
    const returnProjectNames = () => {
        return _projectList.map(project => project.name);
    };

    // returns a copy
    const returnByName = (name) => {
        // if duplicates, return the first match
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
        updateProj,
    }
})();

export default Project;
