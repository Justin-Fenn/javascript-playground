import * as THREE from 'three';
import { exampleTree } from './data/testData';
import Pipe from './graphics/models/pipe';
import SphereConnector from './graphics/models/pipeConnector';
import PipeTree from './graphics/models/pipeTree';

var OrbitControls = require('three-orbit-controls')(THREE);

var camera, scene, renderer, controls;
var meshes = [];
var orbits = [];
//var texture = new THREE.TextureLoader().load( "test2.gif" );

const DEPTH_SEPARATION = 30;
const WIDTH_SEPARATION = 10;
const TREE_WIDTH = 30;
const PIPE_LENGTH = 30;
const RADIUS = 5;

const Positions = {
  TOP: (window.innerHeight/2)-300,
  BOTTOM: window.innerHeight/2,
  LEFT: -((window.innerWidth/2)-150),
  RIGHT: window.innerWidth/2
}

export function init() {
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 400;
  scene = new THREE.Scene();

  scene.background = new THREE.Color( 0x000000 );

  addLight();

	// controls
	controls = new OrbitControls( camera );
  controls.minDistance = 100;
  controls.maxDistance = 500;
	
	// axes
  scene.add( new THREE.AxisHelper( 20 ) );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
  animate();
}

function addLight(){
  // create a point light
  var pointLight = new THREE.PointLight( 0xFFFF8F );

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  // add to the scene
  scene.add(pointLight);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
export function animate() {
  requestAnimationFrame( animate );
  for (let mesh of meshes){
    //mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.005;
    //mesh.rotation.z += 0.02;
  }

  for(let orbit of orbits){
    orbit.rotation.z += 0.01;
  }

  controls.update();
  renderer.render( scene, camera );
}

export function addPipe(x,y,r){
  //let pipe = newPipe(Positions.TOP,Positions.LEFT);
  let pipe = newPipe(new THREE.Vector3(x,y,0));
  console.log(pipe);
  pipe.rotation.z = r;
  meshes.push(pipe);
  scene.add(pipe);

}

export function addOrbital(){
  let sphere = new SphereConnector(new THREE.Vector3(0,0,0));
  let pipe = new Pipe(new THREE.Vector3(0,90,0), {});
  let parent = new THREE.Object3D();
  scene.add(parent);
  parent.add(pipe);
  orbits.push(parent);
  scene.add(sphere);
  //scene.add(pipe);
}

export function addPipesFromGraph(graphIn){
  let graph = graphIn || exampleTree;
  graph = trimFat(graph);

  //let pipe = new Pipe(new THREE.Vector3(0,0,0), { guid: graph.guid, status: graph.status });
  let pipeGraph = graphToPipesRecursive(graph);
  console.log(pipeGraph);
  setPipeGroupPositions(pipeGraph, TREE_WIDTH);
  pipeGraph.position.y = 200;
  //meshes.push(pipeGraph);
  scene.add(pipeGraph);
}

function graphToPipesRecursive(startNode){
  let pipe = new Pipe( new THREE.Vector3(DEPTH_SEPARATION, WIDTH_SEPARATION,0), { guid: startNode.guid, status: startNode.status });
  if(startNode.status ==='finish'){
    return pipe;
  }else if(startNode.children.length === 0 || startNode.status === 'stop'){
    return pipe;
  }else{

    let childrenToVisit = startNode.children.map(childNode=>graphToPipesRecursive(childNode));
    return pipe.add(...childrenToVisit);
  }
}

function setPipeGroupPositions(pipeGroup, w){
  let numChildren = pipeGroup.children.length
  let dx = w/(numChildren+1);
  let midX = 0;
  let dr = Math.PI/((numChildren)*2);
  //console.log(`numChildren: ${numChildren}`);
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
  pipeGroup.add(new SphereConnector(new THREE.Vector3(0,-DEPTH_SEPARATION/2,0)));
 
}

function trimFat(node){
  let childrenRemaining = node.children.filter(child=>child.status != 'stop').map(trimFat);
  node.children = childrenRemaining;
  return node;
}
