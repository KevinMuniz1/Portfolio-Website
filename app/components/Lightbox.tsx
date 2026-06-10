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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center w-full max-w-4xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Image + close button + arrows all relative to this wrapper */}
        <div className="relative w-full rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(0,234,255,0.15)]">
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full max-h-[45vh] md:max-h-[60vh] object-contain bg-cyber-navy"
          />

          {/* Close — inside the image frame, always visible */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-cyan-400 hover:text-white hover:bg-black/90 text-base font-bold transition-colors"
          >
            ✕
          </button>

          {/* Prev arrow */}
          <button
            onClick={() => setCurrentIndex(i => (i - 1 + photos.length) % photos.length)}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-cyan-400 hover:bg-black/80 text-2xl leading-none transition-colors"
          >
            ‹
          </button>

          {/* Next arrow */}
          <button
            onClick={() => setCurrentIndex(i => (i + 1) % photos.length)}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-cyan-400 hover:bg-black/80 text-2xl leading-none transition-colors"
          >
            ›
          </button>
        </div>

        {/* Caption */}
        <div className="mt-3 glass-card px-4 py-3 text-center w-full">
          <h3 className="text-cyan-400 font-bold text-sm md:text-base orbitron-text">{photo.title}</h3>
          <p className="text-cyber-text mt-1 text-xs md:text-sm leading-relaxed">{photo.description}</p>
        </div>

        {/* Dots + counter */}
        <div className="flex gap-2 mt-2 items-center">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? "bg-cyan-400 shadow-[0_0_6px_#00eaff]" : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
          <span className="text-cyber-text/50 text-xs ml-2">{currentIndex + 1} / {photos.length}</span>
        </div>
      </div>
    </div>
  );
}
