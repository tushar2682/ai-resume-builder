import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Editor from './components/Editor'
import axios from 'axios'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock user login for demo purposes
    const mockUser = {
      id: "user_123",
      name: "Tushar",
      email: "tushar@example.com",
      isPremium: false
    }
    setUser(mockUser)
    setLoading(false)
  }, [])

  if (loading) return <div className="h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
        <Navbar user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
            <Route path="/editor/:id?" element={user ? <Editor user={user} /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
