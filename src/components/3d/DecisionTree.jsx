import { useMemo } from 'react'
import * as THREE from 'three'
import { ContactShadows } from '@react-three/drei'
import { generateTree } from '../../utils/treeGenerator'

// Shared Resources
const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16) // Reduced from 32,32
const nodeMaterial = new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.1
})

const branchMaterial = new THREE.MeshStandardMaterial({
    color: "#e2e8f0",
    roughness: 0.2,
    metalness: 0.5,
    envMapIntensity: 1
})

const Node = ({ position }) => {
    return (
        <mesh
            position={position}
            castShadow
            receiveShadow
            geometry={nodeGeometry}
            material={nodeMaterial}
        />
    )
}

const Branch = ({ start, end, thickness = 0.08 }) => {
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(start.x, start.y, start.z),
            new THREE.Vector3(start.x, start.y, start.z).lerp(new THREE.Vector3(end.x, end.y, end.z), 0.5).add(new THREE.Vector3(0, 0.5, 0)),
            new THREE.Vector3(end.x, end.y, end.z)
        ])
    }, [start, end])

    return (
        <mesh castShadow receiveShadow material={branchMaterial}>
            <tubeGeometry args={[curve, 12, thickness, 8, false]} />
        </mesh>
    )
}

const DecisionTree = () => {
    const { nodes, branches } = useMemo(() => generateTree(), [])

    return (
        <group>
            {nodes.map((node, i) => (
                <Node key={i} position={node.position} />
            ))}
            {branches.map((branch, i) => (
                <Branch key={i} start={branch.start} end={branch.end} />
            ))}

            {/* Soft Contact Shadows instead of dark platform */}
            <ContactShadows
                position={[0, -0.5, 0]}
                opacity={0.4}
                scale={15}
                blur={2}
                far={4}
                color="#94a3b8" // Cool grey shadow
            />
        </group>
    )
}

export default DecisionTree
