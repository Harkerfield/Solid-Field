import * as THREE from 'three';
import React, { useState, useEffect, useReducer } from 'react';
import Box from '@mui/material/Box';
import { Canvas, useFrame } from '@react-three/fiber';

function Test() {




  const [camera] = useState(
    () =>
      new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      )
  );
  camera.position.set( 500, 800, 1300 );
  camera.lookAt( 0, 0, 0 );


  const [scene] = useState(
    () =>
      new THREE.Scene()
  );
  scene.background = new THREE.Color( 0xf0f0f0 );


  const [gridHelper] = useState(
    () =>
    new THREE.GridHelper( 1000, 20 )
  );
  scene.add( gridHelper );


  const [raycaster] = useState(
    () =>
    new THREE.Raycaster()
  );


  const [pointer] = useState(
    () =>
    new THREE.Vector2()
  );


   const [geometry] = useState(
    () =>
    new THREE.PlaneGeometry( 1000, 1000 )
  );
  geometry.rotateX( - Math.PI / 2 );

  const [plane] = useState(
    () =>
    new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) )
  );
  scene.add( plane );


  objects.push( plane );










  const [rollover] = useState(
    () =>
      new THREE.Mesh(
        new THREE.BoxGeometry(50,50),
        new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } )
      )
  );
  console.log("rollover", rollover)

  const [box] = useState(
    () =>
      new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshBasicMaterial({ color: 'blue' })
      )
  );







  React.useEffect(() => {
    function handleResize() {
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
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

  console.log("scene", scene);
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
