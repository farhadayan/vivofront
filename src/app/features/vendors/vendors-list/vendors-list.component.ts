import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Vendor } from '../../../core/models/vendor.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-vendors-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, SearchComponent],
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.scss']
})
export class VendorsListComponent implements OnInit {
  vendors: Vendor[] = [];
  isLoading = true;
  originalVendors: Vendor[] = [];
  filteredVendors: Vendor[] = [];
  searchTerm = '';
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.get<Vendor[]>('vendors').subscribe({
      next: (data) => {
        this.originalVendors = data;
        this.filteredVendors = [...this.originalVendors];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading vendors', err);
        this.isLoading = false;
      }
    });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.filteredVendors = this.originalVendors.filter(vendor =>
      vendor.name.toLowerCase().includes(term) ||
      vendor.contactPerson.toLowerCase().includes(term) ||
      vendor.email.toLowerCase().includes(term)
    );
  }
}