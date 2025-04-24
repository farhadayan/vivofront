import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap} from 'rxjs';
import { Employee } from '../../core/models/employee.model';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../core/config/config.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiBaseUrl}/employees`;
  constructor(private http: HttpClient,
    private configService: ConfigService
  ) {
    this.getAllEmployees()
  }

  // Add new employee
  // addEmployee(newEmployee: Employee) {
  //   return this.http.post<Employee>('/api/employees', newEmployee).pipe(
  //     tap(addedEmployee => {
  //       this._employees.update(current => [...current, addedEmployee]);
  //     })
  //   );
  // }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  // private loadEmployees(){
  //   this.http.get<Employee[]>(this.apiUrl).subscribe(data=>{
  //     this._employees.set(data)
  //   })
  // }

  getAllEmployees() : Observable<Employee[]>{

    if (!this.configService.isConfigLoaded()) {
      throw new Error('Config not loaded!');
    }
    return this.http.get<Employee[]>(this.apiUrl)
    .pipe(
      map(response => response)
    );
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchEmployees(name?: string, department?: string): Observable<Employee[]> {
    let params: any = {};
    if (name) params.name = name;
    if (department) params.department = department;
    return this.http.get<Employee[]>(`${this.apiUrl}/search`, { params });
  }

  getEmployeesByDepartment(department: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/department/${department}`);
  }
}