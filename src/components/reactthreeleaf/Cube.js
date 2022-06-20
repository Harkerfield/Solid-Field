import React from 'react';
import { useCallback, useState } from 'react';
// import { useTexture } from "@react-three/drei"
import { useBox } from '@react-three/cannon';
import create from 'zustand';

// This is a super naive implementation and wouldn't allow for more than a few thousand boxes.
// In order to make this scale this has to be one instanced mesh, then it could easily be
// hundreds of thousands.

const useCubeStore = create((set) => ({
  cubes: [],

  addCube: (x, y, z) =>
    set((state) => ({ cubes: [...state.cubes, [x, y, z]] })),
}));

export const Cubes = () => {
  const cubes = useCubeStore((state) => state.cubes);
  console.log(cubes);
  return cubes.map((coords, index) => <Cube key={index} position={coords} />);
};

export const Cube = (props) => {
  const [ref] = useBox(() => ({ type: 'Static', ...props }));
  const [hover, set] = useState(null);
  const addCube = useCubeStore((state) => state.addCube);
  // const texture = useTexture(dirt)

  const onMove = useCallback(
    (e) => (e.stopPropagation(), set(Math.floor(e.faceIndex / 2))),
    []
  );
  const onOut = useCallback(() => set(null), []);
  const onClick = useCallback((e) => {
    e.stopPropagation();
    const { x, y, z } = ref.current.position;
    const dir = [
      [x + 50, y, z],
      [x - 50, y, z],
      [x, y + 50, z],
      [x, y - 50, z],
      [x, y, z + 50],
      [x, y, z - 50],
    ];
    addCube(...dir[Math.floor(e.faceIndex / 2)]);
  }, []);
  return (
    <mesh
      ref={ref}
      receiveShadow
      castShadow
      onPointerMove={onMove}
      onPointerOut={onOut}
      onClick={onClick}
    >
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          attach={`material-${index}`}
          key={index}
          // map={texture}
          color={hover === index ? 'hotpink' : 'white'}
        />
      ))}
      <boxGeometry args={[50, 50, 50]} />
    </mesh>
  );
};
