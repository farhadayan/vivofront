import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ConfigService } from '../../core/config/config.service';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  
  private themeChangedSubject = new BehaviorSubject<void>(undefined);
  themeChanged$ = this.themeChangedSubject.asObservable();

  applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const config = this.configService.getConfig();
      document.documentElement.style.setProperty('--primary-color', config.theme.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', config.theme.secondaryColor);
      document.documentElement.style.setProperty('--text-color', config.theme.textColor);
      document.documentElement.style.setProperty('--background-color', config.theme.backgroundColor);
    }
  }

  getPrimaryColor(): string {
    return this.configService.getConfig().theme.primaryColor;
  }

  getSecondaryColor(): string {
    return this.configService.getConfig().theme.secondaryColor;
  }

  getTextColor(): string {
    return this.configService.getConfig().theme.textColor;
  }

  getBackgroundColor(): string {
    return this.configService.getConfig().theme.backgroundColor;
  }
}