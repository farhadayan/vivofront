import { Directive, ElementRef, OnInit, OnDestroy, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private themeService = inject(ThemeService);
  private themeSubscription?: Subscription;

  ngOnInit() {
    this.applyTheme();
    this.themeSubscription = this.themeService.themeChanged$.subscribe(() => {
      this.applyTheme();
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  private applyTheme() {
    const element = this.el.nativeElement;
    element.style.setProperty('--primary-color', this.themeService.getPrimaryColor());
    element.style.setProperty('--secondary-color', this.themeService.getSecondaryColor());
    element.style.setProperty('--text-color', this.themeService.getTextColor());
    element.style.setProperty('--background-color', this.themeService.getBackgroundColor());
  }
}