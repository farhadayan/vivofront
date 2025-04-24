import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Order } from '../../../core/models/order.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DatePipe } from '@angular/common';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, DatePipe, SearchComponent],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;
  originalOrders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm = '';

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