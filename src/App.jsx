import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Experience from './components/3d/Experience'
import Overlay from './components/ui/Overlay'

function App() {
    return (
        <>
            <div className="fixed inset-0 z-0 bg-[#050505]">
                <Canvas
                    shadows
                    camera={{ position: [0, 2, 10], fov: 45 }}
                    dpr={[1, 2]} // Optimization for high DPI screens
                    gl={{ antialias: false, toneMappingExposure: 1.5 }} // Disable default AA for postprocessing
                >
                    <Suspense fallback={null}>
                        <Experience />
                    </Suspense>
                </Canvas>
            </div>
            <Overlay />
        </>
    )
}

export default App
