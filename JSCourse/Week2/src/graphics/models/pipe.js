import * as THREE from 'three';

const LENGTH = 30;
const RADIUS = 5;

export default class Pipe extends THREE.Mesh{
  constructor(position, userData, colorIn){
    let color = colorIn || new THREE.Color(0x2194ce);
    let geometry = new THREE.CylinderGeometry( RADIUS, RADIUS, LENGTH, 32, 1, true );
    let material = new THREE.MeshPhongMaterial( {color, side:THREE.DoubleSide} );
    super(geometry, material);
    this.position.copy(position);
    this.userData = userData || {};
  }
}