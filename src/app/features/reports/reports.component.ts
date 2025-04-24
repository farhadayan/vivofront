import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { RecentReport } from '../states/report.model';
import { ReportService } from '../services/report.service';
import { TimeAgoPipe } from "../../shared/pipes/time-ago.pipe";
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, MatIconModule, TimeAgoPipe, MatListModule, MatButtonModule, MatCardModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  isLoading = true;
  recentReports: RecentReport[] = [];
  documentCount = 0;
  totalVisits = 0;
  conversionRate = 0;
  unreadAnalytics = 0;
  lastUpdated = new Date();

  constructor(
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    
    this.reportService.getDashboardData().subscribe({
      next: (data) => {
        this.recentReports = data.recentReports;
        this.documentCount = data.documentCount;
        this.totalVisits = data.totalVisits;
        this.conversionRate = data.conversionRate;
        this.unreadAnalytics = data.unreadAnalytics;
        this.lastUpdated = new Date(data.lastUpdated);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard data', err);
        this.isLoading = false;
      }
    });
  }

  navigateTo(reportType: string): void {
    this.router.navigate(['/reports', reportType]);
  }

  openReport(report: RecentReport): void {
    this.reportService.openReport(report.id);
  }

  refreshData(): void {
    this.loadDashboardData();
  }
}
