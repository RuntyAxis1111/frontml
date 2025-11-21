import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail, Float } from '@react-three/drei'
import * as THREE from 'three'

const Packet = ({ color, speed, offset, pathPoints }) => {
    const ref = useRef()
    const [t, setT] = useState(offset)

    // Create a smooth curve from the path points
    const curve = useMemo(() => {
        const vectors = pathPoints.map(p => new THREE.Vector3(...p))
        return new THREE.CatmullRomCurve3(vectors)
    }, [pathPoints])

    useFrame((state, delta) => {
        // Move along the curve
        let nextT = t + (speed * delta * 0.5)
        if (nextT > 1) nextT = 0
        setT(nextT)

        const position = curve.getPoint(nextT)
        ref.current.position.copy(position)
    })

    return (
        <Trail
            width={2} // Width of the trail
            length={8} // Length of the trail
            color={new THREE.Color(color).multiplyScalar(10)} // High intensity for bloom
            attenuation={(t) => t * t}
        >
            <mesh ref={ref}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color={new THREE.Color(color).multiplyScalar(10)} />
            </mesh>
        </Trail>
    )
}

const DataPackets = () => {
    // Define some paths based on the tree structure in DecisionTree
    // This is a simplified hardcoded set of paths for visual effect
    // In a real app, this would be dynamic based on the tree data

    const paths = useMemo(() => {
        const p = []
        const colors = ['#00f3ff', '#0aff00', '#ffea00'] // Blue, Green, Yellow

        // Helper to create a path from root up to a leaf
        const createPath = (endX, endY) => {
            return [
                [0, 0, 0], // Root
                [endX * 0.3, endY * 0.33, 0],
                [endX * 0.6, endY * 0.66, 0],
                [endX, endY, 0]
            ]
        }

        // Generate random packets
        for (let i = 0; i < 15; i++) {
            const side = Math.random() > 0.5 ? 1 : -1
            const spread = Math.random() * 3 + 1
            const height = 6

            p.push({
                path: createPath(side * spread, height),
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 0.5 + 0.2,
                offset: Math.random()
            })
        }
        return p
    }, [])

    return (
        <group>
            {paths.map((packet, i) => (
                <Packet
                    key={i}
                    pathPoints={packet.path}
                    color={packet.color}
                    speed={packet.speed}
                    offset={packet.offset}
                />
            ))}
        </group>
    )
}

export default DataPackets
