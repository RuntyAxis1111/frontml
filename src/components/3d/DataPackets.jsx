import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail } from '@react-three/drei'
import * as THREE from 'three'
import { generateTree } from '../../utils/treeGenerator'

const Packet = ({ pathPoints, color, speed, offset }) => {
    const ref = useRef()
    const [t, setT] = useState(offset)

    // Create a smooth curve from the path points
    // MUST match the Branch curve logic exactly
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

            // Sample points from this branch segment
            points.push(...branchCurve.getPoints(10))
        }
        return new THREE.CatmullRomCurve3(points)
    }, [pathPoints])

    useFrame((state, delta) => {
        let nextT = t + (speed * delta * 0.2) // Slower speed for elegance
        if (nextT > 1) nextT = 0
        setT(nextT)

        const position = curve.getPoint(nextT)
        if (ref.current) {
            ref.current.position.copy(position)
        }
    })

    return (
        <Trail
            width={2}
            length={6} // Shorter trail for performance
            color={new THREE.Color(color).multiplyScalar(1.5)}
            attenuation={(t) => t * t}
            decay={1} // Faster decay
            local={false}
            stride={0} // Optimize updates
            interval={1}
        >
            <mesh ref={ref}>
                <sphereGeometry args={[0.2, 12, 12]} /> {/* Low Poly Optimization */}
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={3}
                    toneMapped={false}
                />
            </mesh>
        </Trail>
    )
}

const DataPackets = () => {
    const { nodes, branches } = useMemo(() => generateTree(), [])

    const paths = useMemo(() => {
        const p = []
        const colors = ['#4ade80', '#38bdf8', '#fbbf24'] // Leaf Green, Water Blue, Solar Amber

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

        // Generate packets with RANDOM directions (Up/Down)
        for (let i = 0; i < 100; i++) {
            const randomLeaf = leaves[Math.floor(Math.random() * leaves.length)]
            let pathPoints = getPathToRoot(randomLeaf)

            // Always go Upwards (Root -> Leaf)
            pathPoints = [...pathPoints]

            // 5% chance of being a RED ANOMALY
            const isAnomaly = Math.random() > 0.95
            const color = isAnomaly ? '#ef4444' : colors[Math.floor(Math.random() * colors.length)]
            const speed = isAnomaly ? 0.5 : Math.random() * 0.2 + 0.1

            p.push({
                path: pathPoints,
                color: color,
                speed: speed,
                offset: Math.random() * 20 // Spread out over a longer timeframe
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
                    color={packet.color}
                    speed={packet.speed}
                    offset={packet.offset}
                />
            ))}
        </group>
    )
}

export default DataPackets
