
import React from 'react';
import { Spinner } from './Spinner';

interface PostInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
  numberOfImages: number;
  onNumberOfImagesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PostInput: React.FC<PostInputProps> = ({ value, onChange, onSubmit, isLoading, numberOfImages, onNumberOfImagesChange }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="post-content" className="text-lg font-semibold text-gray-300">
            Chủ đề hoặc phong cách ảnh:
          </label>
          <textarea
            id="post-content"
            value={value}
            onChange={onChange}
            disabled={isLoading}
            placeholder="Ví dụ: Nền trừu tượng với màu pastel, phong cảnh thiên nhiên tối giản, không gian công nghệ cao..."
            className="w-full h-28 p-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-200 resize-y disabled:opacity-50"
            rows={3}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image-count" className="text-lg font-semibold text-gray-300">
            Số lượng ảnh:
          </label>
          <input
            type="number"
            id="image-count"
            value={numberOfImages}
            onChange={onNumberOfImagesChange}
            disabled={isLoading}
            min="1"
            max="12"
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-200 disabled:opacity-50"
            aria-describedby="image-count-description"
          />
           <p id="image-count-description" className="text-xs text-gray-500 mt-1">Tối đa 12 ảnh mỗi lần tạo.</p>
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={isLoading || !value.trim() || numberOfImages < 1}
        className="w-full md:w-auto self-center px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>Đang tạo...</span>
          </>
        ) : (
          'Tạo Nền Ảnh'
        )}
      </button>
    </div>
  );
};
