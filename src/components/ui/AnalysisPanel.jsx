import { useState, useEffect } from 'react'
import { ARTISTS } from '../../data/artists'
import { Music, Instagram, Video, Youtube, Twitter, ChevronDown, ChevronUp } from 'lucide-react'

const AnalysisPanel = () => {
    const [index, setIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [showSocials, setShowSocials] = useState(false)

    // Cycle through artists to simulate real-time analysis
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % ARTISTS.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const artist = ARTISTS[index]

    const handleManualSelect = (i) => {
        setIndex(i)
        setIsAutoPlaying(false) // Stop auto-play on interaction
    }

    return (
        <div className="absolute top-24 right-8 z-10 flex flex-col items-end gap-4 pointer-events-auto">
            {/* Main Card */}
            <div className="w-80 p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col gap-4 transition-all duration-500">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-black/5 pb-3">
                    <div className="flex items-center gap-2">
                        <div className={`w - 2 h - 2 rounded - full ${isAutoPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'} `} />
                        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            {isAutoPlaying ? 'Live Analysis' : 'Manual View'}
                        </span>
                    </div>
                    <span className="text-sm font-mono font-bold text-slate-900">{artist.probability}</span>
                </div>

                {/* Content */}
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-black/5 shadow-sm">
                        <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-lg text-slate-800 truncate leading-tight">{artist.name}</h3>
                        {/* Artist ID Badge - Clickable */}
                        <div className="flex items-center gap-2 mt-1">
                            {artist.chartmetricUrl ? (
                                <a
                                    href={artist.chartmetricUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group text-[9px] px-2 py-0.5 rounded-md bg-slate-800 text-white font-mono font-bold tracking-wider hover:bg-blue-600 transition-colors cursor-pointer flex items-center gap-1"
                                >
                                    {artist.id}
                                    <svg className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            ) : (
                                <span className="text-[9px] px-2 py-0.5 rounded-md bg-slate-800 text-white font-mono font-bold tracking-wider">
                                    {artist.id}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {artist.reasons.slice(0, 2).map((r, i) => (
                                <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-slate-100 text-slate-600 font-medium truncate max-w-full border border-slate-200">
                                    {r}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Model Context */}
                <div className="border-t border-black/5 pt-3">
                    <div className="text-[9px] font-bold tracking-widest text-slate-400 mb-2">MODEL CONTEXT</div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                            <span className="text-slate-500">Model:</span>
                            <span className="text-slate-700 font-mono">XGBoost v0.1</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                            <span className="text-slate-500">Horizon:</span>
                            <span className="text-slate-700 font-mono">+28 days</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                            <span className="text-slate-500">Training window:</span>
                            <span className="text-slate-700 font-mono">24 months</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                            <span className="text-slate-500">Train set:</span>
                            <span className="text-slate-700 font-mono">1,000 artists</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                            <span className="text-slate-500">Last retrain:</span>
                            <span className="text-slate-700 font-mono">2025-12-01</span>
                        </div>
                    </div>
                </div>

                {/* Why This Score */}
                {artist.scoreDrivers && (
                    <div className="border-t border-black/5 pt-3">
                        <div className="text-[9px] font-bold tracking-widest text-slate-400 mb-2">WHY THIS SCORE?</div>
                        <div className="space-y-1.5">
                            {artist.scoreDrivers.map((driver, i) => (
                                <div key={i} className="flex items-start gap-2 text-[10px]">
                                    <span className={`shrink-0 ${driver.type === 'up' ? 'text-green-600' :
                                        driver.type === 'down' ? 'text-red-600' :
                                            'text-slate-400'
                                        }`}>
                                        {driver.type === 'up' ? '▲' : driver.type === 'down' ? '▼' : '≈'}
                                    </span>
                                    <span className="text-slate-700">{driver.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* Social Media Stats Dropdown */}
                <div className="border-t border-black/5 pt-2">
                    <button
                        onClick={() => setShowSocials(!showSocials)}
                        className="w-full flex items-center justify-between text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors py-1"
                    >
                        <span>SOCIAL IMPACT</span>
                        {showSocials ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {showSocials && (
                        <div className="mt-3 space-y-3 animate-in slide-in-from-top-2 duration-300">
                            {/* Spotify (Primary) */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5 text-green-600 font-bold">
                                        <Music size={12} />
                                        <span>Spotify</span>
                                    </div>
                                    <span className="font-mono text-slate-700">{artist.socials?.spotify}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${artist.socials?.spotify}% ` }}
                                    />
                                </div>
                            </div>

                            {/* Other Platforms Grid */}
                            <div className="grid grid-cols-4 gap-2 pt-1">
                                {/* Instagram */}
                                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-50 border border-slate-100">
                                    <Instagram size={12} className="text-pink-600" />
                                    <span className="text-[10px] font-mono font-bold text-slate-600">{artist.socials?.instagram}%</span>
                                </div>
                                {/* TikTok */}
                                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-50 border border-slate-100">
                                    <Video size={12} className="text-black" />
                                    <span className="text-[10px] font-mono font-bold text-slate-600">{artist.socials?.tiktok}%</span>
                                </div>
                                {/* YouTube */}
                                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-50 border border-slate-100">
                                    <Youtube size={12} className="text-red-600" />
                                    <span className="text-[10px] font-mono font-bold text-slate-600">{artist.socials?.youtube}%</span>
                                </div>
                                {/* X (Twitter) */}
                                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-50 border border-slate-100">
                                    <Twitter size={12} className="text-slate-900" />
                                    <span className="text-[10px] font-mono font-bold text-slate-600">{artist.socials?.twitter}%</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Disclaimer */}
                <div className="text-[9px] text-slate-400 text-center mt-2 opacity-60 leading-relaxed">
                    Experimental prediction – do not use as the only decision signal.
                </div>
            </div>


            {/* Navigation Bar - Avatar Strip */}
            <div className="w-80 p-3 rounded-xl bg-white/80 backdrop-blur-md border border-white/50 shadow-lg overflow-hidden">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x">
                    {ARTISTS.map((a, i) => (
                        <button
                            key={i}
                            onClick={() => handleManualSelect(i)}
                            className={`
                                relative w-10 h-10 rounded-full overflow-hidden shrink-0 transition-all duration-300 snap-center
                                ${index === i
                                    ? 'ring-2 ring-black scale-110 grayscale-0'
                                    : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105'}
                            `}
                        >
                            <img
                                src={a.image}
                                alt={a.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Number Overlay for quick ID */}
                            <div className={`absolute inset-0 flex items-center justify-center bg-black/30 text-white text-[8px] font-bold ${index === i ? 'opacity-0' : 'opacity-100'}`}>
                                {i + 1}
                            </div>
                        </button>
                    ))}
                </div>
                <div className="text-[9px] text-center text-slate-400 mt-1 font-medium tracking-wide">
                    SCROLL & SELECT ARTIST
                </div>
            </div>

            {/* Hint */}
            <div className="text-[10px] text-slate-400 font-medium tracking-wide pr-2 opacity-60">
                INTERACT WITH CORNERS TO ROTATE VIEW
            </div>
        </div>
    )
}

export default AnalysisPanel
