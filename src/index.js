import 'normalize.css'; 
import './style.css';
import generateInterface from './modules/UI'; 
import './modules/task'; 
import makeProject from './modules/project';

generateInterface();

const swimming = makeProject({name: "swimming"})

console.log(swimming);

// addTask not working




