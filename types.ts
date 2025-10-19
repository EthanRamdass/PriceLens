// FIX: Removed self-import of RecommendedItem. The interface is defined in this file, so importing it from here is redundant and causes a conflict.
export interface RecommendedItem {
  name: string;
  category: string;
  averagePrice?: string;
  imageUrl?: string;
  seller: string;
}

export interface AnalysisResult {
  id: string;
  itemName: string;
  averagePrice: string;
  recommendations: RecommendedItem[];
  originalImage: string;
  croppedImagePreview?: string;
}

export type AppView = 'home' | 'camera' | 'preview' | 'loading' | 'results' | 'error';