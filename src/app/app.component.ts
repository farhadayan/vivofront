import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ThemeDirective } from './shared/directives/theme.directive';
import { ConfigService } from './core/config/config.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, ThemeDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Inventory Management';
  isSidebarCollapsed = false;
  isMobileView = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  constructor(
    //private configService: ConfigService,
    private themeService: ThemeService
  ) {}

  async ngOnInit() {
    //await this.configService.loadConfig();
    this.themeService.applyTheme();
    //this.title = this.configService.getConfig().appName;
  }

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  private checkViewport() {
    this.isMobileView = window.innerWidth <= 768;
    if (this.isMobileView) {
      this.isSidebarCollapsed = true; // Collapse by default on mobile
    }
  }
}