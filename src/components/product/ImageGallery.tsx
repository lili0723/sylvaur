"use client";

import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Main image */}
      <div className="aspect-square rounded-2xl overflow-hidden bg-white mb-4">
        <img
          src={images[active]}
          alt={`${productName} — View ${active + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-square rounded-lg overflow-hidden bg-white border-2 transition-colors ${
                i === active
                  ? "border-brand-coral"
                  : "border-transparent hover:border-zinc-300"
              }`}
            >
              <img
                src={src}
                alt={`${productName} — View ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
