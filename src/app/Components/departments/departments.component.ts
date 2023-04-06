import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { departmentModel } from 'src/app/Models/Department.model';

import { DepartmentServiceService } from 'src/app/Services/department-service.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  deptList: any[] = [];
  deptWithEmployeesList: any=[];
  departmentForm!: FormGroup;
  departmentModel: departmentModel = new departmentModel;
  showupdate: boolean = false;
  constructor(private DeptService: DepartmentServiceService,
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.getAllDepartments();
    this.departmentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]

    });

  }

  getAllDepartments() {
    this.DeptService.getDepartmentList().subscribe({
      next: data => {
        console.log(data);
        this.deptList = data;
      },
      error: err => console.log(err)
    })
  }


  getDepartmentWithHisEmployees(id: number) {
    this.DeptService.getDepartmentWithEmployees(id).subscribe({
      next: data => {
        console.log(data);
        this.deptWithEmployeesList = data;
      },
      error: err => console.log(err)
    })
  }

  AddDepartment() {
    this.showupdate = false;
    this.DeptService.addDepartment(this.departmentForm.value)
      .subscribe((response: any) => {
        console.log(response);
        this.getAllDepartments();
      });
  }

  EditDepartment(data: any) {
    this.departmentForm.controls['name'].setValue(data.name);
    this.departmentModel.id = data.id;
    this.showupdate = true
  }
  UpdateDepartment() {

    this.departmentModel.name = this.departmentForm.value.name;
    this.DeptService.updateDepartment(this.departmentModel.id, this.departmentModel).subscribe({
      next: data => {
        console.log(data);
        this.getAllDepartments();
      },

      error: err => { console.log(err) },
    })
  }

  DeleteDepartment(id: number) {
    this.DeptService.deleteDepartment(id).subscribe({
      next: data => {
        console.log(data);
        this.getAllDepartments();
      }
    })
  }


}
