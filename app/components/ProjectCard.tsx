"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

interface Photo {
  src: string;
  title: string;
  description: string;
}

interface ProjectCardProps {
  name: string;
  description: string;
  techStack: string[];
  photos: Photo[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectCard({
  name,
  description,
  techStack,
  photos,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="glass-card p-6 flex flex-col gap-5 max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-cyan-400 orbitron-text text-xl font-bold drop-shadow-[0_0_8px_#00eaff]">
            {name}
          </h2>
          <div className="flex gap-3 shrink-0">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyber-magenta border border-cyber-magenta px-3 py-1 rounded-full hover:bg-cyber-magenta hover:text-white transition-colors"
              >
                GitHub
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 border border-cyan-400 px-3 py-1 rounded-full hover:bg-cyan-400 hover:text-cyber-navy transition-colors"
              >
                Live
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-cyber-text text-sm leading-relaxed">{description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.map(tech => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full border border-cyber-magenta/60 text-cyber-magenta"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Photo grid */}
        {photos.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2">
              {photos.slice(0, 3).map((photo, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="relative aspect-video overflow-hidden rounded-lg border border-cyan-500/20 hover:border-cyan-400/60 hover:scale-[1.03] transition-all duration-200 shadow-[0_0_10px_rgba(0,234,255,0.05)] hover:shadow-[0_0_15px_rgba(0,234,255,0.2)]"
                >
                  <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {photos.length > 3 && (
              <div className="grid grid-cols-4 gap-2">
                {photos.slice(3).map((photo, i) => (
                  <button
                    key={i + 3}
                    onClick={() => openLightbox(i + 3)}
                    className="relative aspect-video overflow-hidden rounded-lg border border-cyan-500/20 hover:border-cyan-400/60 hover:scale-[1.03] transition-all duration-200 shadow-[0_0_10px_rgba(0,234,255,0.05)] hover:shadow-[0_0_15px_rgba(0,234,255,0.2)]"
                  >
                    <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <p className="text-cyan-400/50 text-xs text-center mt-1">
              Click any screenshot to view full gallery
            </p>
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          photos={photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
