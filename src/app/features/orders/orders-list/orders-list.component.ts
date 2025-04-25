import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Order } from '../../../core/models/order.model';

import { DatePipe } from '@angular/common';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, 
    RouterLink, 
    MatProgressSpinnerModule, 
    DatePipe, 
    SearchComponent,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;
  originalOrders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm = '';
  error: string | null = null;
  dataSource = new MatTableDataSource<Order>([]);

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.get<Order[]>('orders').subscribe({
      next: (data) => {
       
        this.originalOrders = data;
        this.filteredOrders = [...this.originalOrders];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading orders', err);
        this.isLoading = false;
      }
    });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.filteredOrders = this.originalOrders.filter(order =>
      order.orderNumber.toLowerCase().includes(term) ||
      order.customer.name.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term)
    );
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addEditOrder(isEdit:boolean){}
  getStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'processing': return 'status-processing';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }
}