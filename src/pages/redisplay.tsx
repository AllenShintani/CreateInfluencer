// ImageRenderer.tsx
import { useState } from 'react';
import { generateImage } from '../components/generateImg';
import { generateImageFromImage } from '../components/generateImgFromImage';

const ImageRenderer = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImageUrls, setGeneratedImageUrls] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Text to Image APIを呼び出す
  const handleGenerateImage = async () => {
    setLoading(true);
    const urls = await generateImage(prompt);
    setGeneratedImageUrls(urls);
    setLoading(false);
  };

  // Image to Image APIを呼び出す
  const handleImageClick = async (initImageUrl: string) => {
    setLoading(true);
    const newImageUrls = await generateImageFromImage(initImageUrl, prompt);
    setGeneratedImageUrls(newImageUrls);
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Prompt for image"
      />
      <button onClick={handleGenerateImage}>Generate Image</button>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          generatedImageUrls?.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Generated ${index}`}
              onClick={() => handleImageClick(url)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ImageRenderer;
