import { motion } from 'framer-motion'

const Card = ({ title, value, label, color = "text-white" }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-lg w-64 mb-4"
    >
        <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-mono">{title}</h3>
        <div className={`text-2xl font-bold font-mono ${color} drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]`}>
            {value}
        </div>
        <div className="text-xs text-gray-500 mt-1">{label}</div>
    </motion.div>
)

const Overlay = () => {
    return (
        <div className="fixed inset-0 pointer-events-none p-8 flex flex-col justify-between z-10">
            {/* Header */}
            <header className="flex justify-between items-start">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/20 backdrop-blur-lg border-l-4 border-neon-blue p-4"
                >
                    <h1 className="text-4xl font-bold font-sans tracking-tighter">XGBOOST<span className="text-neon-blue">.VIZ</span></h1>
                    <p className="text-sm font-mono text-neon-blue/80 mt-1">DECISION TREE VISUALIZATION // V.1.0.4</p>
                </motion.div>

                <div className="flex gap-4">
                    <div className="text-right">
                        <div className="text-xs text-gray-400 font-mono">SYSTEM STATUS</div>
                        <div className="text-neon-green font-mono animate-pulse">ONLINE</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-400 font-mono">GPU USAGE</div>
                        <div className="text-white font-mono">34%</div>
                    </div>
                </div>
            </header>

            {/* Left Panel - Stats */}
            <div className="absolute left-8 top-1/3">
                <Card title="Model Accuracy" value="98.4%" label="+0.2% from last epoch" color="text-neon-green" />
                <Card title="Tree Depth" value="12" label="Max depth reached" color="text-neon-blue" />
                <Card title="Active Nodes" value="1,024" label="Processing..." color="text-neon-yellow" />
            </div>

            {/* Bottom Panel - Timeline/Logs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-3xl mx-auto bg-black/40 backdrop-blur-md border-t border-white/10 p-4 rounded-t-xl"
            >
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-gray-400">LIVE LOGS</span>
                    <span className="text-xs font-mono text-neon-blue">AUTO-SCROLL ON</span>
                </div>
                <div className="font-mono text-xs space-y-1 h-24 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    <div className="text-gray-300">[15:42:01] <span className="text-neon-blue">INFO</span> Initializing render engine...</div>
                    <div className="text-gray-300">[15:42:02] <span className="text-neon-green">SUCCESS</span> Model loaded successfully.</div>
                    <div className="text-gray-300">[15:42:03] <span className="text-neon-yellow">WARN</span> High variance detected in branch 0x4F.</div>
                    <div className="text-gray-300">[15:42:04] <span className="text-neon-blue">INFO</span> Optimizing leaf nodes...</div>
                    <div className="text-gray-300">[15:42:05] <span className="text-neon-blue">INFO</span> Rendering frame 2048...</div>
                </div>
            </motion.div>
        </div>
    )
}

export default Overlay
