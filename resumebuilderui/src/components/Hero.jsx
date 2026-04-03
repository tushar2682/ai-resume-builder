import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, Crown } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative overflow-hidden pt-20 pb-32">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full -z-10" />

      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8">
          <Sparkles size={16} className="text-primary" />
          <span>AI-Powered Resume Optimization</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Elevate Your Career with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-accent">
            AI-Driven Success
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-10 leading-relaxed">
          Create professional, high-impact resumes in minutes. Our AI understands what recruiters want and helps you stand out with tailored content and bullet points.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            to="/editor"
            className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Create Your Resume
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 flex items-center justify-center"
          >
            View Dashboard
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: <Zap className="text-yellow-400" />, title: "Instant Generation", desc: "Generate full resume sections from just a job title." },
            { icon: <ShieldCheck className="text-emerald-400" />, title: "ATS Friendly", desc: "Our templates are tested to pass modern ATS filters." },
            { icon: <Crown className="text-primary" />, title: "Premium Templates", desc: "Access world-class templates designed by HR experts." }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors text-left group">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
