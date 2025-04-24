export interface AppConfig {
    appName: string;
    logoUrl: string;
    theme: {
      primaryColor: string;
      secondaryColor: string;
      textColor: string;
      backgroundColor: string;
    };
    apiBaseUrl: string;
    configUrl: string,

    features: {
      employees: boolean;
      products: boolean;
      orders: boolean;
      vendors: boolean;
    };

    ui: {
      listView: {
        layout: 'grid' | 'list';
        itemsPerRow: number;
        showSearch: boolean;
        imageSize: 'small' | 'medium' | 'large';
      };
      detailView: {
        showLanguageSelector: boolean;
        ingredientsLayout: 'list' | 'table';
        showPreparationTime: boolean;
      };
    };
    availableLanguages: string[];
    defaultLanguage: string;
  }