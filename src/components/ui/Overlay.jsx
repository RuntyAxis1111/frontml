import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const StatPill = ({ title, value, color = "text-white", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="flex flex-col"
    >
        <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-sans mb-1">{title}</div>
        <div className={`text-xl font-mono font-light ${color} drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`}>
            {value}
        </div>
    </motion.div>
)

const Overlay = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none p-12 flex flex-col justify-between z-10">
            {/* Minimal Header */}
            <header className="flex justify-between items-start">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex items-center gap-4"
                >
                    <div className="w-1 h-1 bg-neon-blue rounded-full shadow-[0_0_10px_#00f3ff]" />
                    <div>
                        <h1 className="text-2xl font-sans font-bold tracking-tight text-white/90">
                            XGBOOST<span className="text-neon-blue font-light">.VIZ</span>
                        </h1>
                        <div className="flex gap-4 mt-1">
                            <p className="text-[10px] font-mono text-gray-500 tracking-widest">DECISION TREE RENDERER</p>
                            <p className="text-[10px] font-mono text-gray-600 tracking-widest">{time}</p>
                        </div>
                    </div>
                </motion.div>

                <div className="flex gap-8">
                    <div className="text-right">
                        <div className="text-[10px] text-gray-600 font-mono tracking-widest mb-1">STATUS</div>
                        <div className="flex items-center justify-end gap-2">
                            <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
                            <span className="text-neon-green font-mono text-xs">ONLINE</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Floating Stats - Bottom Left */}
            <div className="absolute left-12 bottom-12 flex gap-12">
                <StatPill title="Accuracy" value="98.4%" color="text-neon-green" delay={0.2} />
                <StatPill title="Depth" value="12" color="text-neon-blue" delay={0.3} />
                <StatPill title="Nodes" value="1,024" color="text-neon-yellow" delay={0.4} />
            </div>

            {/* Minimal Logs - Bottom Right */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute right-12 bottom-12 w-80"
            >
                <div className="bg-black/20 backdrop-blur-xl border border-white/5 rounded-lg p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                    <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
                        <span className="text-[10px] font-sans tracking-widest text-gray-500">SYSTEM LOGS</span>
                        <div className="w-1 h-1 bg-neon-blue rounded-full" />
                    </div>

                    <div className="font-mono text-[10px] space-y-2 text-gray-400">
                        <div className="flex gap-2">
                            <span className="text-gray-600">::</span>
                            <span>Initializing render engine...</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-neon-green">OK</span>
                            <span className="text-white/80">Model loaded successfully</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-neon-yellow">!!</span>
                            <span>Variance detected in branch 0x4F</span>
                        </div>
                        <div className="flex gap-2 opacity-50">
                            <span className="text-gray-600">::</span>
                            <span>Optimizing leaf nodes...</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Overlay
