import React, {useState, useEffect} from 'react'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { Canvas, useFrame } from '@react-three/fiber'

export default function Plane(props) {
    const [gravity, setGravity] = useState(false)
    const cords = props.cord
    const color = props.color


    
    const [ref, api] = useBox(() => ({ args: [1, 1, 1], position: cords, material: {friction: 0.1, restitution: 0.01}, onCollide:(e) => fallDown(), ...props }))

    async function fallDown() {
        await new Promise(resolve => setTimeout(resolve, 100))
        ref.current.material.color.b += 1
        await new Promise(resolve => setTimeout(resolve, 5000))
        ref.current.material.color.b -= 1
    }


    
    return (<>
            <mesh ref={ref} onClick={e => console.log(api)} receiveShadow>
                <boxGeometry attach="geometry" args={[1, 1, 1]} position= {cords} />
                <shadowMaterial color="#171717" transparent />
                <meshLambertMaterial color={color} />
            </mesh>
    </>)
}
