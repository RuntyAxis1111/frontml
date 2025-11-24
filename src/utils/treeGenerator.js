import * as THREE from 'three'

export const generateTree = (levels = 5, spread = 3.0, height = 1.5) => {
    const nodes = []
    const branches = []

    const generate = (x, y, z, level, parentNode) => {
        if (level >= levels) return

        const pos = new THREE.Vector3(x, y, z)
        const nodeId = `${level}-${x.toFixed(2)}-${z.toFixed(2)}`

        const node = {
            position: pos,
            id: nodeId,
            level: level,
            parent: parentNode ? parentNode.id : null
        }
        nodes.push(node)

        if (parentNode) {
            branches.push({
                start: parentNode.position,
                end: pos,
                startId: parentNode.id,
                endId: nodeId
            })
        }

        const nextSpread = spread / (level * 0.8 + 1)

        // Symmetrical Quad-Branching (4 children per node)
        // This creates perfect symmetry and 3D volume

        // Front-Left
        generate(x - nextSpread, y + height, z + nextSpread, level + 1, node)
        // Front-Right
        generate(x + nextSpread, y + height, z + nextSpread, level + 1, node)
        // Back-Left
        generate(x - nextSpread, y + height, z - nextSpread, level + 1, node)
        // Back-Right
        generate(x + nextSpread, y + height, z - nextSpread, level + 1, node)
    }

    generate(0, 0, 0, 0, null)
    return { nodes, branches }
}
