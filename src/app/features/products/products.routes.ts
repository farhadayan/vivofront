import { Route } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const productsRoutes: Route[] = [
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:id', component: ProductDetailsComponent }
];