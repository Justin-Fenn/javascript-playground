var THREE = require('three'); // Add momentjs

class visuals {
  constructor(){
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer();
  }

  setScene(){
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  }

  addCube(){
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );
    return cube;
  }

  setCameraZ(z){
    this.camera.position.z = z;
  }

  // render(motion) {
  //   console.log(this.render);
  //   requestAnimationFrame( this.render );
  //   motion();
  //   this.renderer.render( this.scene, this.camera );
  // }

  testCube(){
    this.setScene();
    let testCube = this.addCube();
    this.setCameraZ(5);
    let r = this.renderer;
    let s = this.scene;
    let c = this.camera;
    let render = function () {
      requestAnimationFrame( render );

      testCube.rotation.x += 0.1;
      testCube.rotation.y += 0.1;

      r.render(s, c);
    };
    render();
  }
}

export default visuals;