"use client";

import { useState, useEffect } from "react";

interface LightboxPhoto {
  src: string;
  title: string;
  description: string;
}

interface LightboxProps {
  photos: LightboxPhoto[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrentIndex(i => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setCurrentIndex(i => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [photos.length, onClose]);

  const photo = photos[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center w-full max-w-4xl mx-4 px-12"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-cyan-400 hover:text-cyber-magenta text-2xl font-bold transition-colors"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative w-full rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(0,234,255,0.15)]">
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full max-h-[62vh] object-contain bg-cyber-navy"
          />
        </div>

        {/* Prev arrow */}
        <button
          onClick={() => setCurrentIndex(i => (i - 1 + photos.length) % photos.length)}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyber-magenta text-5xl font-thin transition-colors leading-none"
        >
          ‹
        </button>

        {/* Next arrow */}
        <button
          onClick={() => setCurrentIndex(i => (i + 1) % photos.length)}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyber-magenta text-5xl font-thin transition-colors leading-none"
        >
          ›
        </button>

        {/* Caption */}
        <div className="mt-4 glass-card px-6 py-4 text-center w-full">
          <h3 className="text-cyan-400 font-bold text-base orbitron-text">{photo.title}</h3>
          <p className="text-cyber-text mt-1 text-sm leading-relaxed">{photo.description}</p>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-3">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? "bg-cyan-400 shadow-[0_0_6px_#00eaff]" : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-cyber-text/50 text-xs mt-2">
          {currentIndex + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
}
