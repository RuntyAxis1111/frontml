import { useMemo } from 'react'
import * as THREE from 'three'

const BackgroundNode = ({ position, scale }) => {
    return (
        <mesh position={position} scale={scale}>
            <sphereGeometry args={[1, 16, 16]} /> {/* Reduced from 24 */}
            <meshBasicMaterial
                color="#94a3b8"
                wireframe
                transparent
                opacity={0.6} // More marked
            />
        </mesh>
    )
}

const BackgroundTree = () => {
    // Generate scattered nodes for 360 effect
    const nodes = useMemo(() => {
        const temp = []
        // Create a ring/sphere of background nodes
        for (let i = 0; i < 20; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const radius = 15 + Math.random() * 10 // Distance from center (15-25)

            const x = radius * Math.sin(phi) * Math.cos(theta)
            const y = (radius * Math.sin(phi) * Math.sin(theta)) * 0.5 // Flatten y slightly
            const z = radius * Math.cos(phi)

            temp.push({
                position: [x, y, z],
                scale: 0.5 + Math.random() * 1.5 // Varied sizes
            })
        }
        return temp
    }, [])

    return (
        <group>
            {nodes.map((node, i) => (
                <BackgroundNode key={i} position={node.position} scale={node.scale} />
            ))}
        </group>
    )
}

export default BackgroundTree
