import * as THREE from 'three';
import { exampleTree } from '../../data/testData';

//A tree of pipes with spheres for junctions
export default class PipeTree extends THREE.Group{

  constructor(graphIn, isSkinny){
    super();
    let graph = graphIn || exampleTree;
    graph = isSkinny ? trimFat(graph) : graph;
    this.add(graphToPipesRecursive(graph));
  }
  
  graphToPipesRecursive(startNode){
    let pipe = newPipe( DEPTH_SEPARATION, WIDTH_SEPARATION, { guid: startNode.guid, status: startNode.status });
    if(startNode.status ==='finish'){
      return pipe;
    }else if(startNode.children.length === 0 || startNode.status === 'stop'){
      return pipe;
    }else{

      let childrenToVisit = startNode.children.map(childNode=>graphToPipesRecursive(childNode));
      return pipe.add(...childrenToVisit);
    }
  }
}

function setPipeGroupPositions(pipeGroup, w){
  let numChildren = pipeGroup.children.length
  let dx = w/(numChildren+1);
  let midX = 0;
  let dr = Math.PI/((numChildren)*2);
  console.log(`numChildren: ${numChildren}`);
  for(let i=0; i < numChildren; i++){

    let pipeChild = pipeGroup.children[i];
    let m = 0;
    let x = 0;
    if(i%2 === 0){
      m = Math.ceil((i+1)/2);
      if(numChildren%2 === 0){
        x += dx/2;
      }else{
        if(i === 0){
          m = 0;
        }
      }
    }else{
      m = -(Math.ceil((i+1)/2));
      if(numChildren%2 === 0){x -= dx/2};      
    }
    //let multiplier = (numChildren%2 === 0 ? 1 : (i === 0 ? 0 : -1));
    
    pipeChild.position.y = -DEPTH_SEPARATION;
    pipeChild.position.x = x+m*dx;
    
    pipeChild.position.z = -(x+m*dx);
    pipeChild.rotation.x = m*dr;
    //console.log(`multiplier: ${multiplier}, dx: ${dx}, i: ${i}, x: ${pipeChild.position.x}`);
    pipeChild.rotation.z = m*dr;

    setPipeGroupPositions(pipeChild,TREE_WIDTH);

  }

  //Add Sphere for first element
  pipeGroup.add(newSphere(0,-DEPTH_SEPARATION/2,0));
 
}


function trimFat(node){
  let childrenRemaining = node.children.filter(child=>child.status != 'stop').map(trimFat);
  node.children = childrenRemaining;
  return node;
}
