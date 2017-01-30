import * as THREE from 'three';

const RADIUS = 10;

//A junction point in the pipeTree
export default class SphereConnector extends THREE.Mesh{
  constructor(position,colorIn){
    let color = colorIn || new THREE.Color(0x2194ce);
    var geometry = new THREE.SphereGeometry( RADIUS, 32, 32);
    var material = new THREE.MeshPhongMaterial( {color, side:THREE.DoubleSide} );
    super(geometry, material);
    this.position.copy(position || new THREE.Vector3());
  }

}