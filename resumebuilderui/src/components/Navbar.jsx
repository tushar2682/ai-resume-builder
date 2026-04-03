import { Link } from 'react-router-dom'
import { Sparkles, FileText, LayoutDashboard, Crown } from 'lucide-react'

export default function Navbar({ user }) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition-opacity">
          <div className="p-1.5 rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <FileText size={20} />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            AI Resume
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {user && (
            <div className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            {user?.isPremium && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider animate-pulse">
                <Crown size={14} />
                Premium
              </div>
            )}
            
            <button className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
