
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PostInput } from './components/PostInput';
import { ImageGrid } from './components/ImageGrid';
import { Spinner } from './components/Spinner';
import { generateBackgroundImage } from './services/geminiService';

const initialPromptText = 'Nền trừu tượng với màu pastel và các đường cong nhẹ nhàng';

const App: React.FC = () => {
  const [promptText, setPromptText] = useState<string>(initialPromptText);
  const [numberOfImages, setNumberOfImages] = useState<number>(4);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (numberOfImages < 1 || numberOfImages > 12) {
        setError("Vui lòng chọn số lượng ảnh từ 1 đến 12.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      // Create an array of promises to generate images in parallel
      const imageGenerationPromises = Array.from({ length: numberOfImages }, () => 
        generateBackgroundImage(promptText)
      );

      const images = await Promise.all(imageGenerationPromises);
      setGeneratedImages(images);

    } catch (err) {
      console.error("Lỗi khi tạo ảnh:", err);
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  }, [promptText, numberOfImages]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col gap-8">
        <PostInput 
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          onSubmit={handleGenerate}
          isLoading={isLoading}
          numberOfImages={numberOfImages}
          onNumberOfImagesChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setNumberOfImages(isNaN(value) ? 1 : value);
          }}
        />

        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Spinner />
            <p className="text-lg text-blue-400">Đang tạo {numberOfImages} ảnh... Quá trình này có thể mất một lúc.</p>
            <p className="text-sm text-gray-400">Vui lòng không đóng hoặc làm mới trang.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
            <strong className="font-bold">Lỗi!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {!isLoading && generatedImages.length > 0 && (
          <ImageGrid images={generatedImages} />
        )}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        Được tạo bởi Gemini API
      </footer>
    </div>
  );
};

export default App;
