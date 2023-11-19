import { useState } from 'react';
import { generateImage } from '../components/generateImg'; // generateImageからgenerateImagesに変更

const ImageRenderer = () => {
  const [imageUrls, setImageUrls] = useState<string[] | null>(null); // 配列として初期化
  const [loading, setLoading] = useState<boolean>(false);

  const handleButtonClick = async () => {
    setLoading(true);
    setImageUrls(null); // 初期状態にnullを設定
    const urls = await generateImage(); // 複数の画像URLを取得
    setImageUrls(urls);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Generate Image</button>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          imageUrls &&
          imageUrls.map((url, index) => <img key={index} src={url} alt={`Generated ${index}`} />)
        )}
      </div>
    </div>
  );
};

export default ImageRenderer;
