import * as THREE from 'three';

const RADIUS = 10;

//A junction point in the pipeTree
export default class SphereConnector extends THREE.Mesh{
  constructor(position){
    var geometry = new THREE.SphereGeometry( RADIUS, 32, 32);
    var material = new THREE.MeshPhongMaterial( {color: 0x2194ce, side:THREE.DoubleSide} );
    super(geometry, material);
    this.position.copy(position);
  }

  get radius(){
    return RADIUS;
  }

}