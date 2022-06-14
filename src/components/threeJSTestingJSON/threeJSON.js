import React from 'react';
import * as THREE from 'three';
import models from './example.json';
//On Windows by default both Chrome and Firefox use ANGLE based rendering backend.//

export default function ThreeJSON(props) {

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer();

	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );



	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );




  camera.position.z = 5;

  function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
  };

  animate();





  const loader = new THREE.ObjectLoader();

  // loader.load(
  //   // resource URL
  //   models,

  //   // onLoad callback
  //   // Here the loaded data is assumed to be an object
  //   function (object) {
  //     // Add the loaded object to the scene
  //     scene.add(object);
  //   },

  //   // onProgress callback
  //   function (xhr) {
  //     console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  //   },

  //   // onError callback
  //   function (err) {
  //     console.error('An error happened');
  //   }
  // );

  // Alternatively, to parse a previously loaded JSON structure
  
	
	const object = loader.parse(models);
  scene.add(object);
	console.log(scene)

  return <div style={{ height: 500, width: '100%' }}>

	</div>;
}
