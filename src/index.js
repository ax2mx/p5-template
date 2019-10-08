// Import an installed module from npm
import P5 from 'p5/lib/p5.min';
// Import a variable from a javascript file from the project folder
import {mySketch} from './sketch.js';
console.log('Hello from javascript!');

import './style.css';

// Initializing p5.js
// p5 requires two arguments: new p5(sketch function, target DOM element)
new P5(mySketch, document.getElementById('sketch'));