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

    const addProjectToList = (proj) => {
        _projectList.push(proj); 
    }

    const returnProjectNames = () => {
        return _projectList.map(project => project.name);
    };

    const delTask = (title) => {
        let index = this.taskList.map(task => {
            return task.title; 
        }).indexOf(title); 

        taskList.splice(index, 1);
    }

    return { makeProject, delTask, returnProjectNames, addProjectToList}
})();

export default Project;

// consumers perspective
// Opens application, clicks add project, should make a project


// Question - how to organize application logic - what do I need and why?
// Question - how does the UI and project itneract? 

/* My take: event listeners add added in the UI page  */