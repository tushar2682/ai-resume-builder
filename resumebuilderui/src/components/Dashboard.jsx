import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, FileText, MoreVertical, Trash2, Edit, ExternalLink, Crown } from 'lucide-react'
import axios from 'axios'

export default function Dashboard({ user }) {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated fetch for now
    const mockResumes = [
      { id: "1", title: "Software Engineer - Google", updatedAt: "2 hours ago", template: "Modern" },
      { id: "2", title: "Product Manager - Meta", updatedAt: "1 day ago", template: "Professional" }
    ]
    setResumes(mockResumes)
    setLoading(false)
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-1">My Resumes</h2>
          <p className="text-muted-foreground text-sm">Manage and optimize your professional documents.</p>
        </div>
        <Link
          to="/editor"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
        >
          <Plus size={20} />
          Create New
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1,2,3].map(i => (
                <div key={i} className="h-64 rounded-2xl bg-white/5 border border-white/10" />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume.id} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <FileText size={24} />
                </div>
                {!user.isPremium && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 text-[10px] uppercase font-bold text-muted-foreground border border-white/10">
                    Free
                  </div>
                )}
              </div>
              
              <h3 className="font-bold text-lg mb-1 truncate">{resume.title}</h3>
              <p className="text-xs text-muted-foreground mb-6 uppercase tracking-wider font-medium">
                Last updated {resume.updatedAt} • {resume.template}
              </p>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={`/editor/${resume.id}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Edit size={16} />
                  Edit
                </Link>
                <button className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* New Resume Placeholder Card */}
          <Link
            to="/editor"
            className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary group"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all">
                <Plus size={24} />
            </div>
            <span className="font-bold">Create New Resume</span>
          </Link>
        </div>
      )}

      {/* Premium Banner */}
      {!user.isPremium && (
        <div className="mt-16 p-8 rounded-3xl premium-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex w-16 h-16 rounded-full bg-white/20 items-center justify-center border border-white/30 backdrop-blur-md">
              <Crown size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Unlock AI Power</h3>
              <p className="opacity-90">Get unlimited AI suggestions, premium templates, and ATS analysis for just $9.99/mo.</p>
            </div>
          </div>
          <button className="whitespace-nowrap px-8 py-4 rounded-xl bg-white text-primary font-bold hover:bg-white/90 shadow-xl transition-all hover:scale-105">
            Go Premium Now
          </button>
        </div>
      )}
    </div>
  )
}
