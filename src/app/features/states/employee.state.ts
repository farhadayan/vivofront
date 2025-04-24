import { Injectable } from "@angular/core";
import { EmployeeService } from "../services/employee.service";
import { BehaviorSubject, catchError, map, Observable, take, tap, throwError } from "rxjs";
import { Employee } from "../../core/models/employee.model";
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({providedIn:'root'})

export class EmployeeState {
    constructor(private employeeService:EmployeeService ){}
    
    private loading = new BehaviorSubject<boolean>(false);
    loading$ = this.loading.asObservable();

    private error = new BehaviorSubject<string|null>(null);
    error$ = this.error.asObservable();

    private allEmployees = new BehaviorSubject<Employee[]>([]);
    allEmployees$=this.allEmployees.asObservable();

    loadEmployees(){
        this.loading.next(true);
        return this.employeeService.getAllEmployees().pipe(
            tap({
                next: (employees) => {
                    this.allEmployees.next(employees);
                    this.loading.next(false);
                    this.error.next(null);
                },
                error: (err) => {
                    this.error.next('Failed to load employees');
                    this.loading.next(false);
                }
            })
        );
    }

    addNewEmployee(employee:Employee){
        this.loading.next(true);
        return this.employeeService.createEmployee(employee).pipe(
            tap({
                next: (newEmployee) => {
                    const current = this.allEmployees.value;
                    this.allEmployees.next([...current, newEmployee]);
                    this.loading.next(false);
                    this.error.next(null);
                },
                error: (err) => {
                    this.error.next('Failed to add employee');
                    this.loading.next(false);
                }
            })
        );
    }

    updateEmployee(employeeId:string,updatedEmployee: Employee): Observable<Employee> {
      
        this.loading.next(true);
        return this.employeeService.updateEmployee(employeeId, updatedEmployee).pipe(
            tap({
                next: (updated) => {
                    const current = this.allEmployees.value;
                    console.log("update: ", updated, current)

                    this.allEmployees.next(
                        current.map(emp => 
                            emp.id === updated.id ? updated : emp
                        )
                    );
                    this.loading.next(false);
                    this.error.next(null);
                },
                error: (err) => {
                    this.error.next('Failed to update employee');
                    this.loading.next(false);
                }
            }),
            catchError(error => {
                this.error.next('Failed to update employee');
                this.loading.next(false);
                return throwError(() => error);
            })
        );
    }


    deleteEmployee(id: string): Observable<void> {
        this.loading.next(true);
        return this.employeeService.deleteEmployee(id).pipe(
            tap({
                next: () => {
                    const current = this.allEmployees.value;
                    this.allEmployees.next(
                        current.filter(emp => emp.id !== id)
                    );
                    this.loading.next(false);
                    this.error.next(null);
                },
                error: (err) => {
                    this.error.next('Failed to delete employee');
                    this.loading.next(false);
                }
            })
        );
    }
}

