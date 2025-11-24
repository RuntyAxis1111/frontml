import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import { Sidebar } from './Sidebar'

const Layout = ({ children }) => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="flex min-h-screen bg-gray-50">
                    <Sidebar />
                    <main className="flex-1 relative">
                        {children}
                    </main>
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Layout
