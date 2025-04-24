import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Order } from '../../../core/models/order.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, DatePipe, CurrencyPipe],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order?: Order;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getById<Order>('orders', id).subscribe({
        next: (data) => {
          this.order = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading order details', err);
          this.isLoading = false;
        }
      });
    }
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