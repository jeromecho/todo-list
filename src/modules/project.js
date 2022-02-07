import Task from './task';

const Project = (function() {
    const _projectList = [];

    const makeProject = ({name}) => ({
        taskList: [Task.makeTask({ title: "Do task", dueDate: "February 7", priority: "High", description: "Do task."})], 
        name: name, 
        addTask: function({title, dueDate, priority, description}) {
            this.taskList.push(Task.makeTask({ title, dueDate, priority, description }));
        }
    });


    const delTask = (title) => {
        let index = this.taskList.map(task => {
            return task.title; 
        }).indexOf(title); 

        taskList.splice(index, 1);
    }

    return { makeProject, delTask}
})();

export default Project;

// consumers perspective
// Opens application, clicks add project, should make a project


// Question - how to organize application logic - what do I need and why?