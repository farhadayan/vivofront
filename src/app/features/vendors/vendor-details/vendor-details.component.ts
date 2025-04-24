import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Vendor } from '../../../core/models/vendor.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-vendor-details',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {
  vendor?: Vendor;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getById<Vendor>('vendors', id).subscribe({
        next: (data) => {
          this.vendor = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading vendor details', err);
          this.isLoading = false;
        }
      });
    }
  }
}