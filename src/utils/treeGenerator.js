import * as THREE from 'three'

export const generateTree = (levels = 4, spread = 2.5, height = 2) => {
    const nodes = []
    const branches = []

    const generate = (x, y, z, level, parentNode) => {
        if (level >= levels) return

        const pos = new THREE.Vector3(x, y, z)
        const nodeId = `${level}-${x}-${z}`

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

        const nextSpread = spread / (level + 1.2)

        // Recursively create children
        generate(x - nextSpread, y + height, z, level + 1, node)
        generate(x + nextSpread, y + height, z, level + 1, node)
    }

    generate(0, 0, 0, 0, null)
    return { nodes, branches }
}
