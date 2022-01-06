import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import Box from './components/Box'
import { Canvas, useFrame } from '@react-three/fiber'
import Plane from './components/Plane';
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { PerspectiveCamera, OrbitControls, Stars, CameraShake } from '@react-three/drei'

function App() {
  const [grid, setGrid] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      let temp = []
      for(var i = -10; i<=10; i++) {
          for(var j = -10; j<=10; j++) {
              temp.push([i, 0, j])
              
          }
      }
      setGrid(temp)
      
      setLoading(false)
  }, [])

  return (<>
    <Canvas colorManagement camera={{ position: [0, 10, 10], fov: 45 }}>
    <color attach="background" args={['black']} />
    <Stars />
    <Physics >
      <ambientLight />
      <pointLight position={[10, 10, 10]} castShadow />
      <Box />
      {!loading && grid.map((cord, index) => {
        return <Plane key={index} cord={cord} color={`hsl(${((cord[0]+10) * (cord[2]+10))}, 100%, 50%)`} />
      })}
    </Physics>
    </Canvas>

  </>)
}

export default App;
