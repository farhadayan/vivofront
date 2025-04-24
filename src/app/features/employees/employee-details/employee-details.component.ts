import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Employee } from '../../../core/models/employee.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ConfigService } from '../../../core/config/config.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    MatButtonModule,
    DatePipe,
    MatIconModule,
    MatSnackBarModule
  ],
  
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  configService = inject(ConfigService);
  public unsubscribe$ = new Subject();

  private location = inject(Location);
  private snackBar = inject(MatSnackBar);

  employee?: Employee;
  isLoading = true;
  activeLanguage = 'en';
  selectedLanguage: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dialog: MatDialog,

  ) {}

  ngOnInit() {
    this.selectedLanguage = this.configService.getConfig().defaultLanguage;

    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.loadEmployeeDetails(id)    
    }
  }
  private showSuccessNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
  loadEmployeeDetails(id:string){
    this.apiService.getById<Employee>('employees', id).subscribe({
      next: (data) => {
        this.employee = data;
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading employee details', err);
        this.isLoading = false;
      }
    });
  }

  editEmployee(employee:Employee){
    let dialogRef = this.dialog.open(EmployeeFormComponent, {
      height: '860px',
      width: '760px',
      autoFocus: false,
      disableClose:true,
      data: {
        employeeDetails: employee,
        isEditMode:true
      }
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response)=>{
        if(response){
        console.log("res: ", response)
        this.employee=response
        this.showSuccessNotification('Employee updated successfully!')
        }
      })
  }
  goBack(): void {
    this.location.back();
  }

  handleImageError(event:ErrorEvent){
    console.log(event)
  }
  changeLanguage(lang: string): void {
    if (this.selectedLanguage.includes(lang)) {
      this.activeLanguage = lang;
    }
  }
}