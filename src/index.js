import 'normalize.css'; 
import './style.css';
import generateInterface from './modules/UI'; 
import './modules/task'; 
import Project from './modules/project';
import Task from './modules/task';

generateInterface();

const swimming = Project.makeProject({name: "swimming"})

swimming.addTask(Task.makeTask({title: "lafarge", dueDate: "september 2", priority: "now", description: "asa"}));

console.log(swimming);




// addTask not working




