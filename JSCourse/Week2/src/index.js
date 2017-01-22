// src/index.js
import run from './mazerunner';
import visuals from './content';
import * as maze3d from './maze-graphics';
document.addEventListener('DOMContentLoaded', function () {
    //run();
    // let scene = new visuals();
    // scene.testCube();
    maze3d.init();
    let x = (window.innerWidth/2)-150;
    let y = (window.innerHeight/2)-300;
    //maze3d.addPipe(0, 250,0);
    //maze3d.addOrbital();
    //console.log("height: "+y);
    //console.log("width: "+x);
    maze3d.addPipesFromGraph();
    // let m = Math.PI*(1/7);
    // for(let i=0; i<5; i++){
    //     maze3d.addPipe(0,250);
    // }
});



// let scene = new visuals();
// scene.testCube();