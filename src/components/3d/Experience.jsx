import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'
import DecisionTree from './DecisionTree'
import DataPackets from './DataPackets'
import BackgroundTree from './BackgroundTree'

const Experience = () => {
    return (
        <>
            {/* Camera Controls */}
            <OrbitControls
                makeDefault
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8} // Limit low angle to keep floor visible
                minDistance={5}
                maxDistance={20}
            />

            {/* Lighting - Organic/Nature */}
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[5, 10, 5]}
                intensity={2}
                castShadow
                shadow-bias={-0.0001}
            >
                <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
            </directionalLight>

            {/* Fill light from opposite side */}
            <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#e0f2fe" />

            {/* Environment for reflections */}
            <Environment preset="forest" blur={0.8} background={false} />

            {/* Scene Content */}
            <color attach="background" args={['#f4f7f6']} />
            <fog attach="fog" args={['#f4f7f6', 10, 50]} />



            <group position={[0, -2, 0]}>
                <BackgroundTree />
                <DecisionTree />
                <DataPackets />
            </group>

            {/* Post Processing - Subtle & Clean */}
            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={0.8} // Higher threshold so only very bright things glow
                    mipmapBlur
                    intensity={0.8} // Reduced intensity
                    radius={0.4}
                />
                <Vignette eskil={false} offset={0.1} darkness={0.4} />
                <Noise opacity={0.015} />
            </EffectComposer>
        </>
    )
}

export default Experience
