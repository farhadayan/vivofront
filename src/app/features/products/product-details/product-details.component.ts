import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Product } from '../../../core/models/product.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, SafeUrlPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  isLoading = true;
  activeLanguage = 'en';
  instructionLanguages: string[] = []; // Store language keys here

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getById<Product>('products', id).subscribe({
        next: (data) => {
          this.product = data;
          // Initialize instruction languages if they exist
          if (data.instructions) {
            this.instructionLanguages = Object.keys(data.instructions);
            // Set default language if current one isn't available
            if (!this.instructionLanguages.includes(this.activeLanguage)) {
              this.activeLanguage = this.instructionLanguages[0] || 'en';
            }
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading product details', err);
          this.isLoading = false;
        }
      });
    }
  }

  changeLanguage(lang: string): void {
    if (this.instructionLanguages.includes(lang)) {
      this.activeLanguage = lang;
    }
  }
}