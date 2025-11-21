import { useMemo } from 'react'
import * as THREE from 'three'
import { generateTree } from '../../utils/treeGenerator'

const Node = ({ position }) => {
    return (
        <mesh position={position} castShadow receiveShadow>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshPhysicalMaterial
                color="#ffffff"
                roughness={0.1}
                metalness={0.1}
                transmission={0} // Solid ceramic nodes
                clearcoat={1}
            />
        </mesh>
    )
}

const Branch = ({ start, end, thickness = 0.15 }) => {
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(start.x, start.y, start.z),
            new THREE.Vector3(start.x, start.y, start.z).lerp(new THREE.Vector3(end.x, end.y, end.z), 0.5).add(new THREE.Vector3(0, 0.5, 0)),
            new THREE.Vector3(end.x, end.y, end.z)
        ])
    }, [start, end])

    return (
        <mesh castShadow receiveShadow>
            <tubeGeometry args={[curve, 20, thickness, 16, false]} />
            <meshPhysicalMaterial
                color="#ffffff"
                roughness={0.05}
                metalness={0.1}
                transmission={1} // Glass!
                thickness={1.5} // Refraction volume
                ior={1.5}
                clearcoat={1}
                transparent
                opacity={0.3} // Slight base opacity
            />
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

            {/* Base Platform */}
            <mesh position={[0, -0.5, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[8, 64]} />
                <meshStandardMaterial
                    color="#050505"
                    roughness={0.4}
                    metalness={0.8}
                />
            </mesh>
        </group>
    )
}

export default DecisionTree
