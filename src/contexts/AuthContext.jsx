import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    // Mock user data matching the Supabase User type structure used in Sidebar
    const [user] = useState({
        email: 'johan.martinez@hybecorp.com',
        user_metadata: {
            full_name: 'Johan Martinez'
        }
    })

    const signOut = async () => {
        console.log('Mock Sign Out')
        // In a real app, this would clear session
    }

    return (
        <AuthContext.Provider value={{ user, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
