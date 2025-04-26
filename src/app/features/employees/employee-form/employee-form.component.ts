import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LabelledComponentComponent } from '../../../shared/components/labelled-component/labelled-component.component';
import { EmployeeState } from '../../states/employee.state';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ImageUploadComponent } from '../../../shared/components/image-upload/image-upload.component';

const fb = new FormBuilder();
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  standalone:true,
  imports:[
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    LabelledComponentComponent,
    MatDialogModule,
    ImageUploadComponent
  ]
})


export class EmployeeFormComponent implements OnInit {
  
  employeeForm:FormGroup = this.emptyForm()
  isEditMode = false;
  employeeId: string='';

  //image up
  uploadStatus = '';
  uploadProgress = 0;
  isUploading = false;


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: {
      employeeDetails:Employee,
      isEditMode:boolean,
      fromList:boolean
    },
    
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    private employeeState: EmployeeState,
    private employeeService: EmployeeService,

    
    private http: HttpClient
  ) {}

  emptyForm(){
    return this.employeeForm = fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      house: [''],
      street: [''],
      zip: [''],
      state: [''],
      imageUrl: '',
      hireDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    //this.employeeId = this.route.snapshot.paramMap.get('id');
    this.employeeId = this.dialogData.employeeDetails?this.dialogData.employeeDetails.id:'';
    
    if (this.employeeId && this.dialogData.isEditMode) {

      this.employeeService.getEmployeeById(this.employeeId).subscribe(
        employee => this.employeeForm.patchValue(employee),
        error => console.error('Error fetching employee', error)
      );
    } else{
      this.employeeForm.patchValue(this.emptyForm())
    }
  }


  handleImageUpload(file: File) {
    this.isUploading = true;
    this.uploadStatus = 'Uploading...';
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', file.name);

    //update as state and real address
    this.http.post('http://your-backend-api/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadStatus = 'Upload successful!';
          this.isUploading = false;
          console.log('Server response:', event.body);
        }
      },
      error: (err) => {
        this.isUploading = false;
        this.uploadStatus = 'Upload failed!';
        console.error('Upload error:', err);
      }
    });
  }

  handleUploadCancelled() {
    this.uploadStatus = 'Upload cancelled';
    this.isUploading = false;
  }

  updateEmployee() {
    if (this.employeeForm.invalid) return;
    
    let employee: Employee = this.employeeForm.value;

    if (this.dialogData.employeeDetails) {
      console.log("nee: ", this.dialogData.employeeDetails)
      
      this.employeeState.updateEmployee(this.employeeId,employee).subscribe
          ({
            next: () => {
              //this.employeeState.updateEmployee(updated);
              this.dialogRef.close(employee);
            },
            error: (err) => {
                this.dialogRef.close({success:false, err});
            }
          });

    } else {
        this.employeeState.addNewEmployee(employee).subscribe({
          next: () => this.dialogRef.close(employee),
          error: (err) => {
                this.dialogRef.close("fail");
                console.error('Error creating employee', err);
            }
        });
    }
}
  cancel(){
    this.employeeForm=this.emptyForm()
    this.dialogRef.close()
  }
}