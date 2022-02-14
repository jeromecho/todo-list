const Task = (function() {

    const makeTask = ({title, dueDate, priority, description}) => {
        return {title, dueDate, priority, description}; 
    };

    const currentTaskList = []; 
    const updateCurrentTaskList = (projList) => {
        currentTaskList = projList;
    };

    return {makeTask, updateCurrentTaskList, currentTaskList }
})();

export default Task;

