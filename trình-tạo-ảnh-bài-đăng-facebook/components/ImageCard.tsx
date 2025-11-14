
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface ImageCardProps {
  imageUrl: string;
  index: number;
}

export const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, index }) => {
  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300">
      <img src={imageUrl} alt={`Ảnh được tạo ${index + 1}`} className="w-full h-auto object-cover aspect-square" />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <a
          href={imageUrl}
          download={`post-image-${index + 1}.png`}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <DownloadIcon />
          <span>Tải xuống</span>
        </a>
      </div>
       <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full">
        {`Ảnh ${index + 1}`}
      </div>
    </div>
  );
};
