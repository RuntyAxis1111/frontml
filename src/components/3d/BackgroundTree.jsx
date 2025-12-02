import { useMemo } from 'react'
import * as THREE from 'three'

// Shared Resources
const bgNodeGeometry = new THREE.SphereGeometry(1, 16, 16)
const bgNodeMaterial = new THREE.MeshBasicMaterial({
    color: "#94a3b8",
    wireframe: true,
    transparent: true,
    opacity: 0.6
})

const BackgroundNode = ({ position, scale }) => {
    return (
        <mesh
            position={position}
            scale={scale}
            geometry={bgNodeGeometry}
            material={bgNodeMaterial}
        />
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
