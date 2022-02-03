import makeTask from './task';

const projectList = [];

// project factory function
const makeProject = ({name}) => ({
    taskList: [], 
    name: name, 
    addTask ({title, dueDate, priority, description}) {
        this.taskList.push(makeTask({title, dueDate, priority, description}));
    }, 
})

export default makeProject;
