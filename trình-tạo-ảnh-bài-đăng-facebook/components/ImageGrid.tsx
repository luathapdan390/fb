
import React from 'react';
import { ImageCard } from './ImageCard';

interface ImageGridProps {
  images: string[];
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">Kết quả:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, index) => (
            <ImageCard key={index} imageUrl={src} index={index} />
        ))}
        </div>
    </div>
  );
};
