import * as THREE from 'three';
import { usePlane } from '@react-three/cannon';
// import grass from './assets/grass.jpg';
import React, { useRef, useState, useCallback } from 'react';

export const Ground = (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  // const texture = useTexture(grass);
  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return (
    <mesh ref={ref} receiveShadow>
      {/* <planeGeometry args={[100, 100]} /> */}
      <meshStandardMaterial
        // map={texture}
        // map-repeat={[240, 240]}
        color="grey"
      />
    </mesh>
  );
};
