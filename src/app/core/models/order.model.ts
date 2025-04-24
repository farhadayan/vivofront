export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    customer: {
      id: string;
      name: string;
      email: string;
    };
    items: Array<{
      productId: string;
      name: string;
      quantity: number;
      price: number;
    }>;
    totalAmount: number;
    shippingAddress?: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    notes?: string;
  }