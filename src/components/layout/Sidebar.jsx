import { Chrome as Home, ChartBar as BarChart3, Brain, Bell, Search, Info, LogOut, FileText, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

export function Sidebar({ isMobileOpen = false, onMobileClose, isCollapsed = false, onToggleCollapse }) {
    const { user, signOut } = useAuth()
    const [isHovered, setIsHovered] = useState(false)

    // Local state for collapse if no prop is provided (standalone mode)
    const [localCollapsed, setLocalCollapsed] = useState(true) // Default to collapsed

    const handleToggleCollapse = () => {
        const newState = !localCollapsed
        setLocalCollapsed(newState)
        if (onToggleCollapse) {
            onToggleCollapse(newState)
        }
    }

    // Use local state if prop is not controlled
    const effectiveCollapsed = onToggleCollapse ? isCollapsed : localCollapsed

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }

    const navItems = [
        { path: 'https://analytics.hybelatinamerica.com/', label: 'Home', icon: Home },
        { path: 'https://analytics.hybelatinamerica.com/dashboards', label: 'Dashboards', icon: BarChart3 },
        { path: 'https://analytics.hybelatinamerica.com/reports', label: 'Reports', icon: FileText },
        { path: 'https://analytics.hybelatinamerica.com/ai', label: 'AI Studio', icon: Brain },
        { path: 'https://analytics.hybelatinamerica.com/subscriptions', label: 'Subscriptions', icon: Bell },
        { path: 'https://analytics.hybelatinamerica.com/data', label: 'Data Explorer', icon: Search },
        { path: 'https://analytics.hybelatinamerica.com/about', label: 'About', icon: Info }
    ]

    return (
        <>
            {/* Mobile backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onMobileClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
          bg-gray-50 border-r border-gray-200 flex flex-col
          fixed lg:static inset-y-0 left-0 z-50
          transform transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${effectiveCollapsed && !isHovered ? 'lg:w-[72px]' : 'w-[260px]'}
        `}
                onMouseEnter={() => effectiveCollapsed && setIsHovered(true)}
                onMouseLeave={() => effectiveCollapsed && setIsHovered(false)}
            >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    {(!effectiveCollapsed || isHovered) && (
                        <div className="min-w-0 flex-1">
                            <h1 className="text-xl font-bold text-black">HYBE LATAM</h1>
                            <p className="text-sm text-gray-600">Data & AI Lab</p>
                        </div>
                    )}
                    <button
                        onClick={onMobileClose}
                        className="lg:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                        onClick={handleToggleCollapse}
                        className="hidden lg:block p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title={effectiveCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
                    >
                        {effectiveCollapsed ? <ChevronRight className="w-5 h-5 text-gray-600" /> : <ChevronLeft className="w-5 h-5 text-gray-600" />}
                    </button>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const IconComponent = item.icon
                            // Simple check: if current window location matches the item path (ignoring domain for local dev if needed, but here we just check exact match or simple logic)
                            // Since these are external links, "active" state might not be relevant in the same way, 
                            // but we can keep the style logic if we want, or just default to inactive.
                            // For now, let's remove the active check as we are navigating away.
                            const isActiveRoute = false
                            return (
                                <li key={item.path}>
                                    <a
                                        href={item.path}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group ${isActiveRoute
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            } ${effectiveCollapsed && !isHovered ? 'justify-center' : ''}`}
                                        title={effectiveCollapsed && !isHovered ? item.label : ''}
                                    >
                                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                                        {(!effectiveCollapsed || isHovered) && (
                                            <span className="truncate">{item.label}</span>
                                        )}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    {user && (
                        <div className="mb-4">
                            <div className={`flex items-center gap-3 px-3 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl mb-3 ${effectiveCollapsed && !isHovered ? 'justify-center' : ''}`}>
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                                    <span className="text-white text-sm font-medium">
                                        {user.email?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                {(!effectiveCollapsed || isHovered) && (
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                            {user.user_metadata?.full_name || user.email}
                                        </p>
                                        <p className="text-xs text-gray-600 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleSignOut}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 group ${effectiveCollapsed && !isHovered ? 'justify-center' : ''}`}
                                title={effectiveCollapsed && !isHovered ? 'Sign Out' : ''}
                            >
                                <LogOut className="w-4 h-4 group-hover:text-red-600 flex-shrink-0" />
                                {(!effectiveCollapsed || isHovered) && (
                                    <span className="font-medium">Sign Out</span>
                                )}
                            </button>
                        </div>
                    )}

                    {(!effectiveCollapsed || isHovered) && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-medium text-gray-700">Sistema Activo</span>
                                </div>
                                <span className="text-xs text-gray-500">v2.1.0</span>
                            </div>

                            <div className="text-center">
                                <p className="text-xs text-gray-500 mb-1">HYBE LATAM Data & AI Lab</p>
                                <p className="text-xs text-gray-400">© 2025 • Todos los derechos reservados</p>
                            </div>
                        </div>
                    )}
                    {(effectiveCollapsed && !isHovered) && (
                        <div className="flex justify-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
