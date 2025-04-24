import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ConfigService } from '../../core/config/config.service';
import { EmployeeState } from '../states/employee.state';
import { map, Observable, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RecentReport, ReportType } from '../states/report.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, MatIconModule, MatListModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recentReports: RecentReport[] = []; 
  appName = '';
  features = {
    employees: false,
    products: false,
    orders: false,
    vendors: false,
    reports:false
  };
  stats = {
    employees: 0,
    products: 0,
    orders: 0,
    vendors: 0,
    reports:0
  };
  isLoading = true;

  stats$: Observable<{ employees: number, products: number, orders: number, vendors: number, reports: number }> = 
  of({
    employees: 0,
    products: 0,
    orders: 0,
    vendors: 0,
    reports:0
  });

  constructor(
    private configService: ConfigService,
    private employeeState: EmployeeState,

  ) {}
  async ngOnInit() {
    const config = this.configService.getConfig();
    this.appName = config.appName;
    this.features = config.features;

    this.employeeState.loadEmployees().subscribe(); // Load employees first
  
    this.stats$ = this.employeeState.allEmployees$.pipe(
      map(employees => ({
        employees: employees.length,
        products: 156,
        orders: 42,
        vendors: 8,
        reports:50
      }))
    );
    this.isLoading = false;

  }

  loadRecentReports(): void {
    // Example data - replace with actual API call
    this.recentReports = [
      { id: 1, name: 'Monthly Sales Report', date: new Date('2023-05-15'), type: 'sales' },
      { id: 2, name: 'User Activity Report', date: new Date('2023-05-10'), type: 'users' },
      { id: 3, name: 'Inventory Status', date: new Date('2023-05-05'), type: 'inventory' }
    ];
    
    // Or load from a service:
    // this.reportService.getRecentReports().subscribe(reports => {
    //   this.recentReports = reports;
    // });
  }

  openReport(reportId: number): void {
    console.log('Opening report', reportId);
    // Implement report opening logic
  }

  getReportIcon(reportType: ReportType): string {
    const icons: Record<ReportType, string> = {
      analytics: 'insert_chart',
      document: 'description',
      statistics: 'pie_chart',
      sales: 'attach_money',
      users: 'people',
      inventory: 'inventory'
    };
    return icons[reportType];
  }
  
}