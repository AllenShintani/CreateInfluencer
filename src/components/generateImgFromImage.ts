import axios from 'axios';

export async function generateImageFromImage(
  initImageUrl: string,
  prompt: string
): Promise<string[] | null> {
  try {
    const response = await axios.post('https://stablediffusionapi.com/api/v3/img2img', {
      key: '8yKYY3SAh6NDmTBXF5v70ELXm5PUwQFK8mmc2T78EqJBNmOFL1kxlRRSe9xj', // ここにあなたのAPIキーを入力してください
      init_image: initImageUrl,
      negative_prompt:
        '(worst quality:2.00), (low quality:2.00), (normal quality:2.00), low-res, easynegative',

      prompt,
      width: '512',
      height: '512',
      samples: '4',
      num_inference_steps: '30',
      safety_checker: 'no',
      enhance_prompt: 'yes',
      guidance_scale: 7.5,
      strength: 0.7,
      seed: 2995626718,
      webhook: null,
      track_id: null,
    });
    console.log('API Response:', response); // 応答の全体をログに出力

    if (
      Boolean(response.data) &&
      Boolean(response.data.output) &&
      response.data.output.length > 0
    ) {
      return response.data.output; // 生成された画像のURLの配列を返す
    } else {
      console.error('No image URLs found in the response');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
