"use client";

import { Sparkles, Zap, AlertCircle } from "lucide-react";

type ModeId = "space" | "earth" | "anomaly";

type ModeSelectorProps = {
  activeMode: ModeId;
  onModeChange: (mode: ModeId) => void;
  onGenerate: () => void;
  isLoading?: boolean;
};

export function ModeSelector({
  activeMode,
  onModeChange,
  onGenerate,
  isLoading,
}: ModeSelectorProps) {
  const modes: {
    id: ModeId;
    name: string;
    description: string;
    icon: any;
  }[] = [
    {
      id: "space",
      name: "Space Mode",
      description: "uses space model",
      icon: Sparkles,
    },
    {
      id: "earth",
      name: "Earth Mode",
      description: "uses earth model",
      icon: Zap,
    },
    {
      id: "anomaly",
      name: "Anomaly Mode",
      description: "uses anomaly detection model",
      icon: AlertCircle,
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Choose your analysis mode
        </h2>
        <p className="text-sm text-indigo-100/80">
          Each mode will call a different Python model.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onModeChange(mode.id)}
              className={`relative rounded-2xl border px-4 py-5 text-left transition ${
                isActive
                  ? "border-indigo-400 bg-indigo-500/10"
                  : "border-indigo-500/20 bg-indigo-900/20 hover:border-indigo-400/60"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{mode.name}</p>
                  <p className="text-[11px] text-indigo-100/80">
                    {mode.description}
                  </p>
                </div>
              </div>
              {isActive && (
                <p className="text-[11px] text-emerald-300 mt-1">Active</p>
              )}
            </button>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto mt-10">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full rounded-full bg-indigo-600 text-white text-sm font-semibold py-3 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Running model..." : "Generate with selected mode"}
        </button>
      </div>
    </section>
  );
}
