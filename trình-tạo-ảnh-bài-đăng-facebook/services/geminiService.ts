
import { GoogleGenAI, Modality } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const generateBackgroundImage = async (text: string): Promise<string> => {
  const prompt = `Tạo một ảnh nền đẹp mắt và chuyên nghiệp, hoàn toàn không có bất kỳ chữ nào, phù hợp để sử dụng cho bài đăng trên mạng xã hội.
Phong cách hoặc chủ đề mong muốn là: "${text}".
Hãy tập trung vào tính thẩm mỹ, bố cục tốt và không gian trống để người dùng có thể dễ dàng thêm văn bản của riêng họ sau này. Tránh các chi tiết lộn xộn.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    
    throw new Error("Không tìm thấy dữ liệu hình ảnh trong phản hồi của API.");

  } catch (error) {
    console.error("Lỗi Gemini API:", error);
    throw new Error("Không thể tạo hình ảnh. Vui lòng kiểm tra API key của bạn và thử lại.");
  }
};

export { generateBackgroundImage };
