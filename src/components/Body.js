import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useBox } from '@react-three/cannon'
import { a } from "@react-spring/three";
import { useSpring } from '@react-spring/core'
import { useControls } from './useControls';
import { PerspectiveCamera, OrbitControls, CameraShake, MeshDistortMaterial } from '@react-three/drei'
import { useEffect } from 'react/cjs/react.development';

export default function Box(props) {
  const [active, setActive] = useState(0)
  const control = useControls()
  const [color, setColor] = useState('#00B9FF')

  const head = useRef()
  const [ref, api] = useBox(() => ({ mass: 50, args:[1, 1, 1], material: {friction: 0, restitution: 0}, fixedRotation: 1, position: [0, 5, 0], ...props }))

  const cam1 = useRef()



  useFrame(({ clock }) => {
      switch(control) {
         case 's':
          api.applyLocalImpulse([0, 0, 20], [0,0,0])
          break;
        case 'w':
          api.applyLocalImpulse([0, 0, -20], [0,0,0])
          break;
      }
      switch(control) {
        case 'd':
          api.angularVelocity.set(0, 5, 0)
          break;
        case 'a':
          api.angularVelocity.set(0, -5, 0)
          break;
        case 'e':
          console.log(ref.current.position)
          console.log(api)
          break;
        case ' ':
          api.applyLocalImpulse([0, 3, 0], [0,0,0])
          break;
        default:
          api.angularVelocity.set(0, 0, 0)
          break;

      }
    }
  )


  return (<>
        
        <mesh ref={ref} onClick={e => ref.current.material.color.r = 1}> 
        <PerspectiveCamera ref={cam1} makeDefault position={[0, 2, 10]} fov={60}></PerspectiveCamera>
        <boxGeometry attach="geometry" args={[1]} position={[10, 1, 1]} />
        <meshStandardMaterial roughness={0.5} attach="material" color={color} />
      </mesh>
      
      </>
  )
}