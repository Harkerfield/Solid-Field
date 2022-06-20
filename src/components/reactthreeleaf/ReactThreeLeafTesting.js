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
import { Ground } from "./Ground"
import { Physics, useBox } from "@react-three/cannon"
import create from "zustand"


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

// Cube
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
      <meshStandardMaterial color={hovered ? 'hotpink' : 'brown'} />
      {/* LineSegmentsGeometry().fromEdgesGeometry(
  new THREE.EdgesGeometry(mesh.geometry, 40)
); */}
    </mesh>
  );
}












// This is a super naive implementation and wouldn't allow for more than a few thousand boxes.
// In order to make this scale this has to be one instanced mesh, then it could easily be
// hundreds of thousands.

const useCubeStore = create((set) => ({
  cubes: [],
  addCube: (x, y, z) => set((state) => ({ cubes: [...state.cubes, [x, y, z]] })),
}))

export const Cubes = () => {
  const cubes = useCubeStore((state) => state.cubes)
  return cubes.map((coords, index) => <Cube key={index} position={coords} />)
}

export const Cube = (props) => {
  const [ref] = useBox(() => ({ type: "Static", ...props }))
  const [hover, set] = useState(null)
  const addCube = useCubeStore((state) => state.addCube)
  // const texture = useTexture(dirt)
  const onMove = useCallback((e) => (e.stopPropagation(), set(Math.floor(e.faceIndex / 2))), [])
  const onOut = useCallback(() => set(null), [])
  const onClick = useCallback((e) => {
    e.stopPropagation()
    const { x, y, z } = ref.current.position
    const dir = [
      [x + 1, y, z],
      [x - 1, y, z],
      [x, y + 1, z],
      [x, y - 1, z],
      [x, y, z + 1],
      [x, y, z - 1],
    ]
    addCube(...dir[Math.floor(e.faceIndex / 2)])
  }, [])
  return (
    <mesh ref={ref} receiveShadow castShadow onPointerMove={onMove} onPointerOut={onOut} onClick={onClick}>
      {[...Array(6)].map((_, index) => (
        // <meshStandardMaterial attach={`material-${index}`} key={index} map={texture} color={hover === index ? "hotpink" : "white"} />
        <meshStandardMaterial attach={`material-${index}`} key={index} color={hover === index ? "hotpink" : "white"} />
      ))}
      <boxGeometry />
    </mesh>
  )
}








export default function App() {
  return (
    <div>
      {/* <Canvas onCreated={(state) => state.gl.setClearColor('blue')}> */}
      <Canvas camera={{ position: [100, 300, 500] }} >


        <Physics gravity={[0, -5, 0]}>

        <Ground />

        <color attach="background" args={['white']} />
        <gridHelper args={[1000, 20]} />
        <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <planeGeometry visible={false} />



        <Box position={[25, 25, 25]} />


        <Cube position={[0, 0.5, -10]} />
        <Cubes />
            </Physics>



        <Rollover position={[125, 25, 25]} />
        <Controls />
        
      </Canvas>
    </div>
  );
}
