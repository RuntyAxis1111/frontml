import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Experience from './components/3d/Experience'
import Layout from './components/layout/Layout'
import AnalysisPanel from './components/ui/AnalysisPanel'

function App() {
    return (
        <Layout>
            <div className="w-full h-screen bg-[#f4f7f6]">
                <Canvas
                    shadows
                    camera={{ position: [0, 2, 10], fov: 45 }}
                    dpr={[1, 2]}
                    gl={{ antialias: false, toneMappingExposure: 1.5 }}
                >
                    <Suspense fallback={null}>
                        <Experience />
                    </Suspense>
                </Canvas>

                {/* Fixed HUD Analysis Panel */}
                <AnalysisPanel />

                {/* UI Overlay - Recreated inside Layout context if needed, or just keep the 3D view clean */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-12">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
                                XGBOOST<span className="text-blue-500">.VIZ</span>
                            </h1>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono text-slate-400 ml-4">
                            <span>DECISION TREE RENDERER</span>
                            <span>{new Date().toLocaleTimeString()}</span>
                        </div>
                    </div>
                    {/* Status indicators */}
                    <div className="absolute top-12 right-12 text-right">
                        <div className="text-[10px] font-bold tracking-widest text-slate-400 mb-1">STATUS</div>
                        <div className="flex items-center justify-end gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <div className="text-sm font-mono font-bold text-emerald-600">ONLINE</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default App
