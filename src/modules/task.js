
const Task = (function() {
    const makeTask = ({title, dueDate, priority, description}) => {
        return {title, dueDate, priority, description}; 
    };

    return {makeTask}
})();

export default Task;

