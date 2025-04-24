import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../../core/config/config.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();
  isMobileView = false;

  constructor(
    public configService: ConfigService,
    private router: Router
  ) {
    this.checkViewport();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  redirectDashboard() {
    this.router.navigate(['/dashboard']);
    if (this.isMobileView) {
      this.toggleCollapse();
    }
  }

  private checkViewport() {
    this.isMobileView = window.innerWidth <= 768;
    if (this.isMobileView && !this.isCollapsed) {
      this.isCollapsed = true;
      this.collapsedChange.emit(true);
    }
  }

  get activeFeatures() {
    return this.configService.getConfig().features;
  }
}