
import type { AnalysisResult } from '../types';
import { Rating } from '../types';

export const ecoDatabase: AnalysisResult[] = [
  {
    product: {
      name: 'Sony WH-1000XM5 Wireless Headphones',
      brand: 'Sony',
      category: 'Electronics',
    },
    rating: Rating.Moderate,
    reason: 'Uses rare earth minerals and has a non-user-replaceable battery, but packaging is made from recycled materials.',
    score: 60,
    scoreReason: "The score reflects a mixed sustainability profile. Positive points for recycled packaging are offset by the use of rare earth minerals and a design that hinders battery replacement, shortening the product's potential lifespan.",
    alternatives: [
      {
        name: 'Fairphone Fairbuds XL',
        brand: 'Fairphone',
        reason: 'Modular design promotes repairability, made with recycled materials.',
        url: 'https://shop.fairphone.com/fairbuds-xl',
      },
      {
        name: 'House of Marley Positive Vibration XL ANC',
        brand: 'House of Marley',
        reason: 'Made with FSC certified wood, recycled aluminum, and sustainable REWIND™ fabric.',
        url: '#',
      },
    ],
  },
  {
    product: {
      name: 'Generic Fast-Fashion Cotton T-Shirt',
      brand: 'Various',
      category: 'Apparel',
    },
    rating: Rating.NotEcoFriendly,
    reason: 'Conventional cotton production is water-intensive and often uses pesticides. Fast-fashion promotes a throwaway culture.',
    score: 25,
    scoreReason: "The low score is due to the high environmental impact of conventional cotton (water and pesticide use) and the business model of fast fashion, which encourages overconsumption and waste.",
    alternatives: [
      {
        name: 'Patagonia Organic Cotton T-Shirt',
        brand: 'Patagonia',
        reason: 'Made with 100% organic cotton, which uses less water and no synthetic pesticides. Fair Trade Certified™ sewn.',
        url: '#',
      },
      {
        name: 'Allbirds TrinoXO™ Tee',
        brand: 'Allbirds',
        reason: 'Made from sustainable materials like eucalyptus tree fiber and chitosan from crab shells.',
        url: '#',
      },
    ],
  },
  {
    product: {
      name: 'Keurig K-Classic Coffee Maker',
      brand: 'Keurig',
      category: 'Home & Kitchen',
    },
    rating: Rating.NotEcoFriendly,
    reason: 'Relies on single-use plastic K-Cup pods which generate significant waste and are difficult to recycle.',
    score: 20,
    scoreReason: "The primary negative factor is the machine's reliance on single-use plastic pods, which create a massive amount of difficult-to-recycle waste, overshadowing any potential energy efficiency of the device itself.",
    alternatives: [
      {
        name: 'AeroPress Coffee and Espresso Maker',
        brand: 'AeroPress',
        reason: 'Uses minimal plastic and paper filters are compostable. No electricity required.',
        url: '#',
      },
      {
        name: 'Chemex Pour-Over Glass Coffeemaker',
        brand: 'Chemex',
        reason: 'Made of durable glass and wood. Creates no plastic waste, only compostable paper filters.',
        url: '#',
      },
    ],
  },
  {
    product: {
      name: 'Stasher Reusable Silicone Storage Bag',
      brand: 'Stasher',
      category: 'Home & Kitchen',
    },
    rating: Rating.EcoFriendly,
    reason: 'Directly replaces single-use plastic bags. Made from durable, non-toxic platinum silicone.',
    score: 95,
    scoreReason: "This product receives a high score because it provides a direct, durable, and reusable alternative to single-use plastics, significantly reducing plastic waste over its lifespan.",
    alternatives: [],
  },
];