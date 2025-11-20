"use client";

import { Hero } from "@/components/Hero";
import { UploadSection } from "@/components/UploadSection";
import { HistorySection } from "@/components/HistorySection";
import { ModeSelector } from "@/components/ModeSelector";
import { useEffect, useState } from "react";

type ModeId = "space" | "earth" | "anomaly";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [activeMode, setActiveMode] = useState<ModeId>("space");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGenerate = async () => {
    if (!file) {
      alert("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setPrediction(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("mode", activeMode);

      const res = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        console.error(data);
        alert("Error from backend");
        return;
      }

      setPrediction(data.prediction ?? JSON.stringify(data));
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10">
        <Hero />

        <UploadSection onFileSelected={setFile} />

        <HistorySection />

        <ModeSelector
          activeMode={activeMode}
          onModeChange={setActiveMode}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

        {prediction && (
          <div className="mt-8 mx-auto max-w-3xl rounded-xl border border-indigo-500/40 p-4 bg-black/40">
            <h2 className="font-semibold mb-2">Model output</h2>
            <p className="text-sm text-indigo-100 whitespace-pre-line">
              <b>{prediction}</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
