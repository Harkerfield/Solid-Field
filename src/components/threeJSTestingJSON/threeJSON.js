import React from 'react';
import * as THREE from 'three';
import models from './example.json';
//On Windows by default both Chrome and Firefox use ANGLE based rendering backend.//

export default function ThreeJSON(props) {

  
  let camera, scene, renderer;
  let plane;
  let pointer, raycaster, isShiftDown = false;

  let rollOverMesh, rollOverMaterial;
  let cubeGeo, cubeMaterial;

  const objects = [];


  //

  scene = new THREE.Scene();

   camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );






  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);





  scene.background = new THREE.Color( 0xf0f0f0 );

				// roll-over helpers

				const rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
				rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
				rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
				scene.add( rollOverMesh );

				// cubes

				cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
				cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, map: new THREE.TextureLoader().load( 'textures/square-outline-textured.png' ) } );

				// grid

				const gridHelper = new THREE.GridHelper( 1000, 20 );
				scene.add( gridHelper );

				//


//

raycaster = new THREE.Raycaster();
pointer = new THREE.Vector2();

const geometry = new THREE.PlaneGeometry( 1000, 1000 );
geometry.rotateX( - Math.PI / 2 );

plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
scene.add( plane );

objects.push( plane );

//







  document.body.appendChild(renderer.domElement);

  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  camera.position.z = 5;

  // function animate() {
  //   requestAnimationFrame(animate);

  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  //   renderer.render(scene, camera);
  // }

  // animate();

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
  console.log(scene);

  return <div style={{ height: 500, width: '100%' }}></div>;
}
