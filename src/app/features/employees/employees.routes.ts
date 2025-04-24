import { Route } from '@angular/router';
import { EmployeeListComponent } from './employees-list/employees-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

export const employeesRoutes: Route[] = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'employees/edit/:id', component: EmployeeFormComponent }

];