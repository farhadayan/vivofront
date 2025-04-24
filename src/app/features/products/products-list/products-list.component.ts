import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../../core/models/product.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ApiService } from '../../../shared/services/api.service';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent,SearchComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  originalProducts: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.get<Product[]>('products').subscribe({
      next: (data) => {
        this.originalProducts = data;
        this.filteredProducts = [...this.originalProducts];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.isLoading = false;
      }
    });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.filteredProducts = this.originalProducts.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }

}