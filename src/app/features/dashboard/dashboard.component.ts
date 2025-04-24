import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ConfigService } from '../../core/config/config.service';
import { EmployeeState } from '../states/employee.state';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  appName = '';
  features = {
    employees: false,
    products: false,
    orders: false,
    vendors: false
  };
  stats = {
    employees: 0,
    products: 0,
    orders: 0,
    vendors: 0
  };
  isLoading = true;

  stats$: Observable<{ employees: number, products: number, orders: number, vendors: number }> = 
  of({
    employees: 0,
    products: 0,
    orders: 0,
    vendors: 0
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
        vendors: 8
      }))
    );
    this.isLoading = false;

  }
}