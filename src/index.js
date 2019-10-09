// Import an installed module from npm
import P5 from 'p5/lib/p5.min';
// Import a variable from a p5 sketch file
import { mySketch } from './sketch.js';
console.log('Hello from javascript!');
// Import stylesheet
import './style.css';

// Initializing p5.js
// p5 requires two arguments: new p5(sketch function, target DOM element)
new P5(mySketch, document.getElementById('sketch'));