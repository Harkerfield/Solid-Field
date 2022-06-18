import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useFrame,
} from '@react-three/fiber';
import CameraControls from 'camera-controls';

CameraControls.install({ THREE });
extend({ CameraControls });

function Controls() {
  const ref = useRef();
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  useFrame((state, delta) => ref.current.update(delta));
  return <cameraControls ref={ref} args={[camera, gl.domElement]} />;
}

function Box(props) {
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
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default function App() {
  return (
    <div>
      {/* <Canvas onCreated={(state) => state.gl.setClearColor('blue')}> */}
      <Canvas camera={{ position: [100, 300, 500] }}>
        <camera rotation={[500, 800, 1300]} />
        <raycaster />
        <vector2 />
        <gridHelper args={[1000, 20]} />
        <color attach="background" args={['0xf0f0f0 ']} />
        <ambientLight />
        {/* 
        <directionalLight position={[10, 10, 10]} /> */}
        {/* <planeGeometry rotate="{ - Math.PI / 2}" /> */}
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} />
        <Box position={[50, 0, 0]} />
        <Controls />
      </Canvas>
    </div>
  );
}
