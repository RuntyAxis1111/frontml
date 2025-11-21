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
            width={1.5}
            length={6}
            color={new THREE.Color(color).multiplyScalar(15)}
            attenuation={(t) => t * t}
        >
            <mesh ref={ref}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color={new THREE.Color(color).multiplyScalar(20)} />
            </mesh>
        </Trail>
    )
}

const DataPackets = () => {
    const { nodes, branches } = useMemo(() => generateTree(), [])

    const paths = useMemo(() => {
        const p = []
        const colors = ['#00f3ff', '#0aff00', '#ffea00']

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

        // Generate packets for random leaves
        for (let i = 0; i < 12; i++) {
            const randomLeaf = leaves[Math.floor(Math.random() * leaves.length)]
            const pathPoints = getPathToRoot(randomLeaf)

            p.push({
                path: pathPoints,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 0.3 + 0.1,
                offset: Math.random()
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
