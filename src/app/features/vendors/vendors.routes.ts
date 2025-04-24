import { Route } from '@angular/router';
import { VendorsListComponent } from './vendors-list/vendors-list.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';

export const vendorsRoutes: Route[] = [
  { path: 'vendors', component: VendorsListComponent },
  { path: 'vendors/:id', component: VendorDetailsComponent }
];