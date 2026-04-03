import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Save, Sparkles, Download, ArrowLeft, Plus, Trash2, Layout, LayoutPanelLeft, Wand2, CreditCard } from 'lucide-react'
import axios from 'axios'
import AIPrompt from './AIPrompt'

export default function Editor({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('personal')
  const [showAI, setShowAI] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  const [resume, setResume] = useState({
    title: 'New Resume',
    contact: { fullName: '', email: '', phone: '', location: '', linkedin: '', github: '' },
    experiences: [{ company: '', position: '', location: '', startDate: '', endDate: '', description: '', current: false }],
    education: [{ school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', gpa: '' }],
    skills: ['React', 'Spring Boot', 'Tailwind'],
    summary: ''
  })

  const saveResume = async () => {
    setIsSaving(true)
    try {
      // Mock API call
      setTimeout(() => {
        setIsSaving(false)
        alert('Resume saved successfully!')
      }, 800)
    } catch (error) {
      console.error(error)
      setIsSaving(false)
    }
  }

  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Ensure this is set in your .env file
      amount: 49900, // 499.00 INR
      currency: "INR",
      name: "AI Resume Premium",
      description: "Lifetime Access to AI Features & Premium Templates",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        // Update user status in backend
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: { color: "#6366f1" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Editor Sidebar */}
      <div className="w-80 border-r bg-card/50 flex flex-col p-4">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft size={18} />
            </button>
            <h1 className="font-bold text-lg truncate">{resume.title}</h1>
        </div>

        <div className="space-y-1.5 overflow-y-auto flex-1">
          {[
            { id: 'personal', name: 'Personal Details', icon: <Plus size={18} /> },
            { id: 'summary', name: 'Professional Summary', icon: <Sparkles size={18} /> },
            { id: 'experience', name: 'Work Experience', icon: <Plus size={18} /> },
            { id: 'education', name: 'Education', icon: <Plus size={18} /> },
            { id: 'skills', name: 'Skills', icon: <Plus size={18} /> }
          ].map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                activeSection === section.id 
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]' 
                : 'hover:bg-white/5 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center gap-3">
                {section.icon}
                {section.name}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t space-y-3">
          <button 
                onClick={saveResume}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold hover:bg-emerald-500/20 transition-all"
            >
            <Save size={18} />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          
          {user.isPremium ? (
              <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 shadow-xl shadow-primary/30 transition-all">
                <Download size={18} />
                Download PDF
              </button>
          ) : (
              <button 
                onClick={handlePayment}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl premium-gradient text-white font-bold hover:opacity-90 shadow-xl transition-all"
              >
                <CreditCard size={18} />
                Upgrade to Export
              </button>
          )}
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-12 bg-[#020617]">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <h2 className="text-4xl font-bold capitalize">{activeSection.replace('-', ' ')}</h2>
            <button 
                onClick={() => setShowAI(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold hover:bg-primary/20 transition-all text-sm group"
            >
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                AI Generate
            </button>
          </div>

          {/* Dynamic Content Based on activeSection */}
          <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
            {activeSection === 'personal' && (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
                    <input className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30" placeholder="e.g. Tushar Singh" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
                    <input className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30" placeholder="tushar@example.com" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Phone Number</label>
                    <input className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30" placeholder="+91 999 999 9999" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Location</label>
                    <input className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30" placeholder="Lucknow, India" />
                </div>
                {/* LinkedIn and GitHub similarly... */}
              </div>
            )}

            {activeSection === 'summary' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Professional Summary</label>
                    <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                        <Wand2 size={14} />
                        Improve with AI
                    </button>
                </div>
                <textarea 
                    className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 focus:border-primary outline-none transition-all resize-none leading-relaxed" 
                    placeholder="Describe your professional achievements and key strengths..."
                />
              </div>
            )}

            {/* Experience and Education sections similarly with add/remove buttons... */}
          </div>
        </div>
      </div>

      <AIPrompt 
        isOpen={showAI} 
        onClose={() => setShowAI(false)} 
        onGenerate={(content) => {
            alert("This will set content generated from backend: " + content);
            setShowAI(false);
        }}
        title={`Generate ${activeSection}`} 
        placeholder={`Briefly describe your ${activeSection} and I will write it for you.`}
      />
    </div>
  )
}
