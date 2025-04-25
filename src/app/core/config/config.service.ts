import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../models/config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private http = inject(HttpClient);
  private config: AppConfig | null = null;
  private configLoaded = false;

  async loadConfig(): Promise<void> {
    const configPath = 'assets/config/config.json';
    console.log('Attempting to load config from:', configPath);

    try {
      
      const config = this.http.get<AppConfig>(configPath)
      this.config = this.getDefaultConfig()

    } catch (error) {
      console.error('Failed to load config, using defaults:', error);
      this.config = this.getDefaultConfig();
    }
    this.configLoaded = true;
    
  }

  private getDefaultConfig(): AppConfig{
    return {
      appName: 'Inventory Manager',
      logoUrl: 'assets/images/logo.png',
      theme: {
        primaryColor: '#7e8191',
        secondaryColor: '#65567a',
        textColor: '#333333',
        backgroundColor: '#f5f5f5'
      },
      apiBaseUrl: 'http://localhost:8081/api',
      configUrl: 'assets/config/config.json',

      features: {
        employees: true,
        products: true,
        orders: true,
        vendors: true,
        reports:true
      },
      ui: {
        listView: {
          layout: 'grid',
          itemsPerRow: 3,
          showSearch: true,
          imageSize: 'medium'
        },
        detailView: {
          showLanguageSelector: true,
          ingredientsLayout: 'list',
          showPreparationTime: true
        }
      },
      
      availableLanguages: ['en'],
      defaultLanguage: 'en'
    }
  }
  // private config: AppConfig = {
  //   appName: 'Inventory Manager',
  //   logoUrl: 'assets/images/logo.png',
  //   theme: {
  //     primaryColor: '#3f51b5',
  //     secondaryColor: '#ff4081',
  //     textColor: '#333333',
  //     backgroundColor: '#f5f5f5'
  //   },
  //   apiBaseUrl: 'http://localhost:8081',
  //   features: {
  //     employees: true,
  //     products: true,
  //     orders: true,
  //     vendors: true
  //   },
      
  //   availableLanguages: ['en'],
  //   defaultLanguage: 'en'
  // };

  // async loadAppConfig(): Promise<void> {
  //   try {
  //     const loadedConfig = await lastValueFrom(
  //       this.http.get<AppConfig>(`${environment.configUrl || 'assets/config/app-config.json'}`, {
  //         // Add these options to handle redirects
  //         withCredentials: true,
  //         observe: 'response' // Get full response including redirects
  //       }).pipe(
  //         catchError(error => {
  //           console.warn('Failed to load external config, using defaults', error);
  //           return of(null); // Return null to use defaults
  //         }),
  //         map(response => response?.body) // Extract body if response exists
  //       )
  //     );
      
  //     if (loadedConfig) {
  //       this.config = loadedConfig;
  //     }
  //   } catch (error) {
  //     console.error('Error loading app config:', error);
  //   }
  // }

  getConfig():AppConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }
    return this.config
    
  }

  getApiBaseUrl(): string {
    return this.getConfig().apiBaseUrl;
  }

  isConfigLoaded(): boolean {
    return this.configLoaded;
  }

}