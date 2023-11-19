import axios from 'axios';

// 関数を定義して、APIにリクエストを送信します
export async function generateImage(prompt: string): Promise<string[] | null> {
  try {
    const response = await axios.post('https://stablediffusionapi.com/api/v3/text2img', {
      key: '8yKYY3SAh6NDmTBXF5v70ELXm5PUwQFK8mmc2T78EqJBNmOFL1kxlRRSe9xj', // ここにあなたのAPIキーを入力してください
      model_id: 'realistic-vision-v40',
      //lora_model: 'ganyu-lora',
      prompt,
      negative_prompt:
        '(worst quality:2.00), (low quality:2.00), (normal quality:2.00), low-res, easynegative',
      width: '512',
      height: '512',
      samples: '4',
      num_inference_steps: '30',
      safety_checker: 'no',
      enhance_prompt: 'yes',
      seed: 2995626718,
      guidance_scale: 7.5,
      multi_lingual: 'no',
      panorama: 'no',
      self_attention: 'no',
      upscale: '2',
      embeddings_model: null,
      //lora_model: null,
      scheduler: 'UniPCMultistepScheduler',
      webhook: null,
      track_id: null,
    });

    const imageUrls: string[] = response.data.output; // 画像のURLの配列を取得
    console.log('Image URLs:', imageUrls);
    return imageUrls; // 画像のURLの配列を返す
  } catch (error) {
    console.error('Error:', error);
    return null; // エラーが発生した場合はnullを返す
  }
}
