import { Routes } from '@angular/router';
import { employeesRoutes } from './features/employees/employees.routes';
import { productsRoutes } from './features/products/products.routes';
import { ordersRoutes } from './features/orders/orders.routes';
import { vendorsRoutes } from './features/vendors/vendors.routes';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  ...employeesRoutes,
  ...productsRoutes,
  ...ordersRoutes,
  ...vendorsRoutes,
  { path: '**', component: NotFoundComponent }
];