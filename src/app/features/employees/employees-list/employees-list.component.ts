import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule  } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import { ConfigService } from '../../../core/config/config.service';
import { Subject, takeUntil } from 'rxjs';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeState } from '../../states/employee.state';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports:[
    RouterModule,
    CommonModule, 
    MatSortModule,
    MatTableModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatPaginatorModule, 
    MatProgressSpinnerModule,
    MatInputModule,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
    
  ]
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name', 
    'position', 
    'department', 
    'email', 
    'phone',
    'actions' 
  ];
  
  selectedRow: Employee | undefined;
  dataSource = new MatTableDataSource<Employee>([]);
  private router = inject(Router);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoading = false;
  private destroy$ = new Subject<void>();
  error: string | null = null;

  constructor(
    private employeeState: EmployeeState,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setupStateSubscriptions();
    this.loadEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  
  selectedRows = new Set<Employee>();

  toggleSelection(row: Employee) {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
  }
  private setupStateSubscriptions(): void {
    this.employeeState.allEmployees$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(employees => {
      this.initializeDataSource(employees);
    });

    this.employeeState.loading$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(loading => {
      this.isLoading = loading;
      this.cdr.markForCheck();
    });

    this.employeeState.error$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(error => {
      this.error = error;
      if (error) {
        this.showError(error);
      }
    });
  }

  loadEmployees(): void {
    this.employeeState.loadEmployees().subscribe();
  }

  private initializeDataSource(employees: Employee[]): void {
    this.dataSource.data = employees;
    this.cdr.markForCheck();
  }

  addEditEmployee(editMode: boolean, employee?: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '760px',
      height: '860px',
      disableClose: true,
      data: {
        isEditMode: editMode,
        employeeDetails: editMode && employee ? employee : null,
        fromList: true
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log("result: ", result)
        if (result?.success) {
          this.showSuccess(editMode ? 'Employee updated successfully' : 'Employee added successfully');
        } else if(result?.error) 
          this.showError(editMode ? 'Failed to update employee' : 'Failed to add employee');
        
      });
  }

  deleteEmployee(employee: Employee): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeState.deleteEmployee(employee.id).subscribe({
        next: () => this.showSuccess('Employee deleted successfully'),
        error: () => this.showError('Failed to delete employee')
      });
    }
  }

  navigateToDetails(id: string): void {
    this.router.navigate(['/employees', id]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getImageSizeClass(): string {
    return `image-${this.configService.getConfig().ui.listView.imageSize}`;
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}