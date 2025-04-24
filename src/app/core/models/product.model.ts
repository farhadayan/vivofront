export interface Product {
    id: string;
    name: string;
    description: string;
    sku: string;
    category: string;
    price: number;
    cost: number;
    quantity: number;
    imageUrl: string;
    barcode?: string;
    weight?: number;
    dimensions?: {
      length: number;
      width: number;
      height: number;
    };
    supplier?: string;
    instructions?: {
      [key: string]: string;
    };
  }