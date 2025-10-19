import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, RecommendedItem } from '../types';

const GEMINI_MODEL = 'gemini-2.5-flash';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recommendationItemSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "The name of the recommended item." },
        averagePrice: { type: Type.STRING, description: "The estimated average price range of the recommended item in USD, for example '$120 - $150'." },
        imageUrl: { type: Type.STRING, description: "A direct, publicly accessible URL to an image of the recommended item." },
        category: { type: Type.STRING, description: "A category for the item. Must be one of: 'clothing', 'shoes', 'electronics', 'book', 'food', 'drinkware', 'furniture', 'tool', 'toy', or 'generic'." }
    },
    required: ['name', 'category', 'averagePrice', 'imageUrl'],
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    itemName: {
      type: Type.STRING,
      description: "The common name of the main object identified in the image.",
    },
    averagePrice: {
      type: Type.STRING,
      description: "The estimated average price range of the item in USD, for example '$50 - $70'.",
    },
    recommendationsBySeller: {
      type: Type.OBJECT,
      description: "An object where each key is a seller and the value is an array of 2-3 recommended items from that seller.",
      properties: {
        amazon: { type: Type.ARRAY, items: recommendationItemSchema },
        ebay: { type: Type.ARRAY, items: recommendationItemSchema },
        walmart: { type: Type.ARRAY, items: recommendationItemSchema },
        target: { type: Type.ARRAY, items: recommendationItemSchema },
        bestbuy: { type: Type.ARRAY, items: recommendationItemSchema },
        etsy: { type: Type.ARRAY, items: recommendationItemSchema },
        aliexpress: { type: Type.ARRAY, items: recommendationItemSchema },
        alibaba: { type: Type.ARRAY, items: recommendationItemSchema },
      }
    },
  },
  required: ['itemName', 'averagePrice', 'recommendationsBySeller'],
};

export const analyzeImage = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: 'image/jpeg',
      },
    };

    const textPart = {
      text: "You are a shopping assistant. First, analyze the main object in the image and provide its common name and estimated average price in USD. Then, for each of the following sellers, find 2 or 3 similar items: amazon, ebay, walmart, target, bestbuy, etsy, aliexpress, alibaba. For each recommended item, provide: 1) A product name, 2) Its price range in USD, 3) Leave imageUrl empty (we'll handle images separately), and 4) A category from: 'clothing', 'shoes', 'electronics', 'book', 'food', 'drinkware', 'furniture', 'tool', 'toy', 'generic'. Focus on finding realistic products with accurate names and prices. Your response must be ONLY the JSON object matching the schema.",
    };

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    if (
      !result.itemName ||
      !result.averagePrice ||
      !result.recommendationsBySeller ||
      typeof result.recommendationsBySeller !== 'object'
    ) {
      throw new Error("Invalid response structure from API");
    }

    const flattenedRecommendations: RecommendedItem[] = [];
    for (const seller in result.recommendationsBySeller) {
        const items = result.recommendationsBySeller[seller];
        if (Array.isArray(items)) {
            items.forEach((item: any) => {
                if (item.name && item.category && item.averagePrice && item.imageUrl) {
                    console.log(`Item: ${item.name}, Image URL: ${item.imageUrl}`); // Debug logging
                    flattenedRecommendations.push({
                        ...item,
                        seller: seller,
                    });
                }
            });
        }
    }
    
    // Shuffle the array to mix sellers for a better user experience
    for (let i = flattenedRecommendations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flattenedRecommendations[i], flattenedRecommendations[j]] = [flattenedRecommendations[j], flattenedRecommendations[i]];
    }

    return {
        itemName: result.itemName,
        averagePrice: result.averagePrice,
        recommendations: flattenedRecommendations,
    } as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    throw new Error("Failed to analyze the image. The AI model might be unable to process this request.");
  }
};
