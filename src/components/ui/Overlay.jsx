import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const StatPill = ({ title, value, color = "text-slate-800", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="flex flex-col"
    >
        <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-sans mb-1">{title}</div>
        <div className={`text-xl font-mono font-light ${color} drop-shadow-sm`}>
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
                    <div className="w-1 h-1 bg-sky-500 rounded-full shadow-sm" />
                    <div>
                        <h1 className="text-2xl font-sans font-bold tracking-tight text-slate-800">
                            XGBOOST<span className="text-sky-500 font-light">.VIZ</span>
                        </h1>
                        <div className="flex gap-4 mt-1">
                            <p className="text-[10px] font-mono text-slate-400 tracking-widest">DECISION TREE RENDERER</p>
                            <p className="text-[10px] font-mono text-slate-500 tracking-widest">{time}</p>
                        </div>
                    </div>
                </motion.div>

                <div className="flex gap-8">
                    <div className="text-right">
                        <div className="text-[10px] text-slate-400 font-mono tracking-widest mb-1">STATUS</div>
                        <div className="flex items-center justify-end gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-emerald-600 font-mono text-xs">ONLINE</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Floating Stats - Bottom Left */}
            <div className="absolute left-12 bottom-12 flex gap-12">
                <StatPill title="Accuracy" value="98.4%" color="text-emerald-600" delay={0.2} />
                <StatPill title="Depth" value="12" color="text-sky-600" delay={0.3} />
                <StatPill title="Nodes" value="1,024" color="text-amber-500" delay={0.4} />
            </div>

            {/* Minimal Logs - Bottom Right */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute right-12 bottom-12 w-80"
            >
                <div className="bg-white/40 backdrop-blur-xl border border-black/5 rounded-lg p-4 relative overflow-hidden shadow-lg shadow-black/5">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                    <div className="flex justify-between items-center mb-3 border-b border-black/5 pb-2">
                        <span className="text-[10px] font-sans tracking-widest text-slate-400">SYSTEM LOGS</span>
                        <div className="w-1 h-1 bg-sky-500 rounded-full" />
                    </div>

                    <div className="font-mono text-[10px] space-y-2 text-slate-500">
                        <div className="flex gap-2">
                            <span className="text-slate-400">::</span>
                            <span>Initializing render engine...</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-emerald-600">OK</span>
                            <span className="text-slate-600">Model loaded successfully</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-amber-500">!!</span>
                            <span>Variance detected in branch 0x4F</span>
                        </div>
                        <div className="flex gap-2 opacity-50">
                            <span className="text-slate-400">::</span>
                            <span>Optimizing leaf nodes...</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Overlay
