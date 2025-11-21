import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'
import DecisionTree from './DecisionTree'
import DataPackets from './DataPackets'

const Experience = () => {
    return (
        <>
            {/* Camera Controls */}
            <OrbitControls
                makeDefault
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
                minDistance={5}
                maxDistance={20}
            />

            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={100}
                castShadow
                shadow-bias={-0.0001}
            />
            <pointLight position={[-10, -10, -10]} intensity={50} color="#444" />

            {/* Environment for reflections */}
            <Environment preset="city" />

            {/* Scene Content */}
            <color attach="background" args={['#050505']} />
            <fog attach="fog" args={['#050505', 5, 30]} />

            <group position={[0, -2, 0]}>
                <DecisionTree />
                <DataPackets />
            </group>

            {/* Post Processing */}
            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={1}
                    mipmapBlur
                    intensity={1.5}
                    radius={0.4}
                />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
                <Noise opacity={0.02} />
            </EffectComposer>
        </>
    )
}

export default Experience
