"use client"

import { History, Trash2 } from "lucide-react"

export function HistorySection() {
  const historyItems = [
    { id: 1, title: "Purple Galaxy Scene", date: "2 hours ago", mode: "Space" },
    { id: 2, title: "Earth Landscape", date: "Yesterday", mode: "Earth" },
    { id: 3, title: "Anomaly Detection", date: "3 days ago", mode: "Anomaly" },
    { id: 4, title: "Cosmic Nebula", date: "1 week ago", mode: "Space" },
  ]

  return (
    <section className="w-full px-[1.5%] py-16 bg-black/30 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <History className="w-5 h-5 text-indigo-400" />
          <h2 className="text-3xl font-bold text-white tracking-tight">History</h2>
        </div>
        <p className="text-indigo-100/65 mb-8 text-base tracking-[-0.3px]">Your recent creations</p>

        <div className="space-y-3">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="group flex items-center justify-between rounded-xl bg-zinc-900/50 border border-indigo-600/20 p-4 hover:bg-zinc-900/80 hover:border-indigo-500/40 transition-all duration-300"
            >
              <div className="flex-1">
                <h3 className="text-white font-semibold group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-indigo-100/50 text-sm">{item.date}</span>
                  <span className="px-2 py-1 rounded-full bg-indigo-600/20 text-indigo-300 text-xs font-medium border border-indigo-500/30">
                    {item.mode}
                  </span>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-indigo-400 hover:text-red-400 hover:bg-red-600/10 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
