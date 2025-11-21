import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Node = ({ position, scale = 1 }) => {
    return (
        <mesh position={position} scale={scale} castShadow receiveShadow>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshPhysicalMaterial
                color="#eeeeee"
                roughness={0.2}
                metalness={0.1}
                transmission={0}
                thickness={1}
                clearcoat={1}
                clearcoatRoughness={0.1}
            />
        </mesh>
    )
}

const Branch = ({ start, end, thickness = 0.08 }) => {
    const ref = useRef()

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(...start),
            new THREE.Vector3(...start).lerp(new THREE.Vector3(...end), 0.5).add(new THREE.Vector3(0, 0.5, 0)), // slight arch
            new THREE.Vector3(...end)
        ])
    }, [start, end])

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <tubeGeometry args={[curve, 20, thickness, 8, false]} />
            <meshPhysicalMaterial
                color="#eeeeee"
                roughness={0.2}
                metalness={0.1}
                clearcoat={1}
            />
        </mesh>
    )
}

const DecisionTree = () => {
    // Procedural tree structure
    // Level 0: Root
    // Level 1: 2 nodes
    // Level 2: 4 nodes
    // Level 3: 8 nodes

    const levels = 4
    const spread = 2.5
    const height = 2

    const nodes = useMemo(() => {
        const n = []
        const branches = []

        const generate = (x, y, z, level, parentPos) => {
            if (level >= levels) return

            const pos = [x, y, z]
            n.push({ position: pos, id: `${level}-${x}` })

            if (parentPos) {
                branches.push({ start: parentPos, end: pos })
            }

            const nextSpread = spread / (level + 1.2)
            generate(x - nextSpread, y + height, z, level + 1, pos)
            generate(x + nextSpread, y + height, z, level + 1, pos)
        }

        generate(0, 0, 0, 0, null)
        return { nodes: n, branches }
    }, [])

    return (
        <group>
            {nodes.nodes.map((node, i) => (
                <Node key={i} position={node.position} />
            ))}
            {nodes.branches.map((branch, i) => (
                <Branch key={i} start={branch.start} end={branch.end} />
            ))}

            {/* Base Platform */}
            <mesh position={[0, -0.5, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[8, 64]} />
                <meshStandardMaterial
                    color="#111"
                    roughness={0.4}
                    metalness={0.8}
                />
            </mesh>
        </group>
    )
}

export default DecisionTree
