"use client";

import type React from "react";
import { Cloud } from "lucide-react";
import { useState } from "react";

type UploadSectionProps = {
  onFileSelected: (file: File) => void;
};

export function UploadSection({ onFileSelected }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelected(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelected(file);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto">
        <div
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition ${
            isDragging
              ? "border-indigo-400 bg-indigo-500/10"
              : "border-indigo-500/40 bg-indigo-900/10 hover:border-indigo-300"
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file-upload"
            onChange={handleChange}
          />
          <label htmlFor="file-upload" className="block cursor-pointer">
            <Cloud className="w-8 h-8 mx-auto mb-3" />
            <p className="text-sm font-medium">
              {fileName
                ? fileName
                : "Drop an image here or click to upload"}
            </p>
            <p className="text-xs text-indigo-100/70 mt-1">
              This file will be sent to the selected model.
            </p>
          </label>
        </div>
      </div>
    </section>
  );
}
