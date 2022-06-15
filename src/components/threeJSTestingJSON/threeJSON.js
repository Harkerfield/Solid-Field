import * as THREE from 'three';
import React, { useState, useEffect, useReducer } from 'react';
import Box from '@mui/material/Box';
import { Canvas, useFrame } from '@react-three/fiber';

function Test() {
  const [objects, setobjects] = useState([]);

  const [camera] = useState(
    () =>
      new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      )
  );
  camera.position.set(500, 800, 1300);
  camera.lookAt(0, 0, 0);

  const [scene] = useState(() => new THREE.Scene());
  scene.background = new THREE.Color(0xf0f0f0);

  // roll-over helpers

  const [rollOver] = useState(
    () =>
      new THREE.Mesh(
        new THREE.BoxGeometry(50, 50),
        new THREE.MeshBasicMaterial({
          color: 0xff0000,
          opacity: 0.5,
          transparent: true,
        })
      )
  );
  scene.add(rollOver);

  // cubes

  const [cube] = useState(
    () =>
      new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshBasicMaterial({ color: 'blue' })
      )
  );

  // grid

  const [gridHelper] = useState(() => new THREE.GridHelper(1000, 20));
  scene.add(gridHelper);

  const [raycaster] = useState(() => new THREE.Raycaster());

  const [pointer] = useState(() => new THREE.Vector2());

  const [geometry] = useState(() => new THREE.PlaneGeometry(1000, 1000));
  geometry.rotateX(-Math.PI / 2);

  const [plane] = useState(
    () =>
      new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }))
  );
  scene.add(plane);

  //setobjects(plane);

  const [ambientLight] = useState(() => new THREE.AmbientLight(0x606060));
  scene.add(ambientLight);

  const [directionalLight] = useState(
    () => new THREE.DirectionalLight(0xffffff)
  );
  directionalLight.position.set(1, 0.75, 0.5).normalize();
  scene.add(directionalLight);

  const [renderer] = useState(
    () => new THREE.WebGLRenderer({ antialias: true })
  );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);




  React.useEffect(() => {
    function onWindowResize() {
      //console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);
  });

  React.useEffect(() => {
    function onPointerMove() {
      //console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('pointermove', onPointerMove);
  });

  React.useEffect(() => {
    function onPointerDown() {
      pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

      raycaster.setFromCamera( pointer, camera );

      const intersects = raycaster.intersectObjects( objects, false );

      if ( intersects.length > 0 ) {

        const intersect = intersects[ 0 ];

        // delete cube

        if ( isShiftDown ) {

          if ( intersect.object !== plane ) {

            scene.remove( intersect.object );

            objects.splice( objects.indexOf( intersect.object ), 1 );

          }

          // create cube

        } else {

          const voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
          voxel.position.copy( intersect.point ).add( intersect.face.normal );
          voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
          scene.add( voxel );

          objects.push( voxel );

        }

      }
    }
    window.addEventListener('pointerdown', onPointerDown);
  });

  
  React.useEffect(() => {
    function onPointerDown() {
      //console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('pointerdown', onPointerDown);
  });


  React.useEffect(() => {
    function onDocumentKeyDown() {

      switch ( event.keyCode ) {

        case 16: isShiftDown = true; break;

      }
    }
    window.addEventListener('keydown', onDocumentKeyDown);
  });


  React.useEffect(() => {
    function onDocumentKeyUp() {
      switch ( event.keyCode ) {

        case 16: isShiftDown = false; break;

      }
    }
    window.addEventListener('keyup', onDocumentKeyUp);
  });


  
  React.useEffect(() => {
    function render() {
      renderer.render( scene, camera );
    }
    
  });

  // const [which, toggle] = useReducer((state) => !state, true)
  // useEffect(() => {
  //   const interval = setInterval(toggle, 1000)
  //   return () => clearInterval(interval)
  // }, [])

  // useFrame((state) => {
  //   console.log(state.pointer.x)
  // })

  // return <primitive object={which ? o1 : o2} />

  console.log('scene', scene);
  return <primitive object={scene} />;
}

export default function ThreeJSON() {
  return (
    <Box>
      <Canvas>
        <Test />
      </Canvas>
    </Box>
  );
}
