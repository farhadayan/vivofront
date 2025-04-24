import { Route } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

export const ordersRoutes: Route[] = [
  { path: 'orders', component: OrdersListComponent },
  { path: 'orders/:id', component: OrderDetailsComponent }
];