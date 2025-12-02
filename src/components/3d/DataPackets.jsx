import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail } from '@react-three/drei'
import * as THREE from 'three'
import { generateTree } from '../../utils/treeGenerator'

// Shared Geometry and Materials to reduce draw calls and memory
const packetGeometry = new THREE.SphereGeometry(0.2, 8, 8) // Reduced from 12,12 to 8,8
const materials = {
    green: new THREE.MeshStandardMaterial({ color: '#4ade80', emissive: '#4ade80', emissiveIntensity: 3, toneMapped: false }),
    blue: new THREE.MeshStandardMaterial({ color: '#38bdf8', emissive: '#38bdf8', emissiveIntensity: 3, toneMapped: false }),
    amber: new THREE.MeshStandardMaterial({ color: '#fbbf24', emissive: '#fbbf24', emissiveIntensity: 3, toneMapped: false }),
    red: new THREE.MeshStandardMaterial({ color: '#ef4444', emissive: '#ef4444', emissiveIntensity: 3, toneMapped: false })
}

const Packet = ({ pathPoints, colorType, speed, offset }) => {
    const ref = useRef()
    const [t, setT] = useState(offset)

    // Create a smooth curve from the path points
    const curve = useMemo(() => {
        const points = []
        for (let i = 0; i < pathPoints.length - 1; i++) {
            const start = pathPoints[i]
            const end = pathPoints[i + 1]

            // Recreate the exact curve used in DecisionTree
            const branchCurve = new THREE.CatmullRomCurve3([
                start,
                start.clone().lerp(end, 0.5).add(new THREE.Vector3(0, 0.5, 0)),
                end
            ])

            // Sample points from this branch segment - Reduced sampling for performance
            points.push(...branchCurve.getPoints(6)) // Reduced from 10
        }
        return new THREE.CatmullRomCurve3(points)
    }, [pathPoints])

    useFrame((state, delta) => {
        let nextT = t + (speed * delta * 0.2)
        if (nextT > 1) nextT = 0
        setT(nextT)

        const position = curve.getPoint(nextT)
        if (ref.current) {
            ref.current.position.copy(position)
        }
    })

    const material = materials[colorType] || materials.green
    const trailColor = material.color

    return (
        <Trail
            width={1.5} // Slightly thinner
            length={5} // Slightly shorter
            color={trailColor}
            attenuation={(t) => t * t}
            decay={1}
            local={false}
            stride={0}
            interval={1}
        >
            <mesh ref={ref} geometry={packetGeometry} material={material} />
        </Trail>
    )
}

const DataPackets = () => {
    const { nodes, branches } = useMemo(() => generateTree(), [])

    const paths = useMemo(() => {
        const p = []
        const colorTypes = ['green', 'blue', 'amber']

        // Find all leaf nodes
        const leaves = nodes.filter(n => !branches.find(b => b.startId === n.id))

        // Helper to trace back from leaf to root
        const getPathToRoot = (node) => {
            const path = [node.position]
            let current = node
            while (current.parent) {
                const parent = nodes.find(n => n.id === current.parent)
                if (parent) {
                    path.unshift(parent.position)
                    current = parent
                } else {
                    break
                }
            }
            return path
        }

        // Generate packets
        for (let i = 0; i < 80; i++) { // Reduced count slightly for performance (100 -> 80)
            const randomLeaf = leaves[Math.floor(Math.random() * leaves.length)]
            let pathPoints = getPathToRoot(randomLeaf)

            // Always go Upwards (Root -> Leaf)
            pathPoints = [...pathPoints]

            // 5% chance of being a RED ANOMALY
            const isAnomaly = Math.random() > 0.95
            const colorType = isAnomaly ? 'red' : colorTypes[Math.floor(Math.random() * colorTypes.length)]
            const speed = isAnomaly ? 0.5 : Math.random() * 0.2 + 0.1

            p.push({
                path: pathPoints,
                colorType: colorType,
                speed: speed,
                offset: Math.random() * 20
            })
        }
        return p
    }, [nodes, branches])

    return (
        <group>
            {paths.map((packet, i) => (
                <Packet
                    key={i}
                    pathPoints={packet.path}
                    colorType={packet.colorType}
                    speed={packet.speed}
                    offset={packet.offset}
                />
            ))}
        </group>
    )
}

export default DataPackets
