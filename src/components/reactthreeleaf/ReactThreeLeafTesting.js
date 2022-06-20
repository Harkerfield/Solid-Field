import * as THREE from 'three';
import React, { useRef, useState, useCallback } from 'react';
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useFrame,
} from '@react-three/fiber';
import CameraControls from 'camera-controls';
import { Ground } from './Ground';
import { Physics, useBox } from '@react-three/cannon';
import create from 'zustand';
import { Cube, Cubes } from "./Cube"


CameraControls.install({ THREE });
extend({ CameraControls });
function Controls() {
  const ref = useRef();
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  useFrame((state, delta) => ref.current.update(delta));
  return <cameraControls ref={ref} args={[camera, gl.domElement]} />;
}

// roll-over helpers
function Rollover(props) {
  const mesh = useRef(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[50, 50, 50]} />
      <meshStandardMaterial
        opacity={0.5}
        transparent={true}
        color={hovered ? 'hotpink' : 'brown'}
      />
      {/* LineSegmentsGeometry().fromEdgesGeometry(
  new THREE.EdgesGeometry(mesh.geometry, 40)
); */}
    </mesh>
  );
}




export default function App() {
  return (
    <div>
      {/* <Canvas onCreated={(state) => state.gl.setClearColor('blue')}> */}
      <Canvas camera={{ position: [100, 300, 500] }}>
        <Physics gravity={[0, -5, 0]}>
          <Ground />

          <color attach="background" args={['white']} />
          <gridHelper args={[1000, 20]} />
          <ambientLight intensity={0.3} />
          {/* <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
          <planeGeometry visible={false} /> */}

          {/* 
        <Box position={[25, 25, 25]} /> */}

          <Cube position={[25, 25, 25]} />
          <Cubes />
        </Physics>
{/* 
        <Rollover position={[125, 25, 25]} /> */}
        <Controls />
      </Canvas>
    </div>
  );
}
