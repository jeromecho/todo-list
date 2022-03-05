const Task = (function() {

    const makeTask = ({title, dueDate, priority, description}) => {
        return {title, dueDate, priority, description}; 
    };

    // dummy value
    let currentTask = {title: "", dueDate: new Date(2022, 2, 3), priority: "", description: ""}; 

    let currentTaskList = []; 

    // Task Task -> List
    const updateTaskList = (oldTask, newTask) => {
        let index = currentTaskList.indexOf(oldTask);

        currentTaskList.splice(index, 1, newTask);

    };

    // Index -> Nothing 
    // given task, deletes that task from currentTaskList
    const deleteTask = (task, ctl) => {
        currentTaskList = ctl;

        let index = currentTaskList.indexOf(task);
        currentTaskList.splice(index, 1);
        
        console.log(index);
    };
    
    return {makeTask,
         currentTaskList, 
         currentTask,
         deleteTask,
         updateTaskList}
})();

export default Task;

