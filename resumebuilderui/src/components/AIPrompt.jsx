import { Sparkles, X, ChevronRight, Wand2 } from 'lucide-react'

export default function AIPrompt({ isOpen, onClose, onGenerate, title, placeholder }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-card border shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Wand2 size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{title || "AI Content Generator"}</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">GPT-4o Powered</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 ml-1">Describe what you want to achieve:</label>
          <textarea
            className="w-full h-32 rounded-xl bg-white/5 border border-white/10 p-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none resize-none"
            placeholder={placeholder || "e.g. Write a professional summary for a Senior Software Engineer with 5 years of experience in React and Spring Boot."}
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-semibold hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onGenerate("Sample AI Content")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            <Sparkles size={18} />
            Generate Content
          </button>
        </div>
      </div>
    </div>
  )
}
