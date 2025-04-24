export interface Vendor {
    id: string;
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    productsSupplied: string[];
    contractStartDate: string;
    contractEndDate?: string;
    imageUrl?: string;
    paymentTerms?: string;
    rating?: number;
  }