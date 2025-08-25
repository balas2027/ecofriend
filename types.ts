export enum Rating {
  EcoFriendly = 'Eco-Friendly',
  Moderate = 'Moderate',
  NotEcoFriendly = 'Not Eco-Friendly',
  NotFound = 'Not Found'
}

export interface Product {
  name: string;
  brand: string;
  category: string;
}

export interface AlternativeProduct {
  name: string;
  brand: string;
  reason: string;
  url: string;
}

export interface AnalysisResult {
  product: Product;
  rating: Rating;
  reason: string;
  score: number;
  scoreReason: string;
  alternatives: AlternativeProduct[];
}
