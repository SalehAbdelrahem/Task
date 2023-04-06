import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeeModel } from 'src/app/Models/Employee.model';
import { DepartmentServiceService } from 'src/app/Services/department-service.service';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  EmpList: any[] = [];
  DeptList: any[] = [];
  EmpWithDept: any=[];
  deptId:number=0;
  EmployeeForm!: FormGroup;
  EmployeeModel: EmployeeModel = new EmployeeModel;
  showupdate: boolean = false;
  constructor(private EmpService: EmployeeServiceService,
    private formBuilder: FormBuilder,
    private DeptService: DepartmentServiceService
  ) {

  }
  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllDepartments();
    this.EmployeeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      dateOfBirth: [new Date(), [Validators.required]],
      joinDate: [new Date(), [Validators.required]],
      salary: [0, [Validators.required]],
      departmentId: [0, [Validators.required]]
    });

  }

  getAllEmployees() {
    this.EmpService.getEmployeeList().subscribe({
      next: data => {
        console.log(data);
        this.EmpList = data;
      },
      error: err => console.log(err)
    })
  }

  getAllDepartments() {
    this.DeptService.getDepartmentList().subscribe({
      next: data => {
        console.log(data);
        this.DeptList = data;
      },
      error: err => console.log(err)
    })
  }

  getEmployeeWithHisDept(id: number) {
    this.EmpService.getEmployeetWithHisDept(id).subscribe({
      next: data => {
        console.log(data);
        this.EmpWithDept = data;
      },
      error: err => console.log(err)
    })
  }

  AddEmployee() {
    console.log("from Form",this.EmployeeForm.value);

    this.showupdate = false;
    this.EmpService.addEmployee(this.EmployeeForm.value)
      .subscribe((response: any) => {
        console.log("response",response);
        this.getAllEmployees();
      });
  }

  EditEmployee(data: any) {
    console.log(data);

    this.EmployeeForm.controls['name'].setValue(data.name);
    this.EmployeeForm.controls['code'].setValue(data.code);
    this.EmployeeForm.controls['salary'].setValue(data.salary);
    this.EmployeeForm.controls['joinDate'].setValue(data.joinDate);
    this.EmployeeForm.controls['dateOfBirth'].setValue(data.dateOfBirth);
    this.EmployeeForm.controls['departmentId'].setValue(data.departmentId);
    this.EmployeeModel.id = data.id;
    this.EmpService.getEmployeetWithHisDept(data.id).subscribe({
      next: data => {
        console.log(data);
        this.EmployeeModel.departmentId= data.department.id;
      },
      error: err => console.log(err)
    })
     this.showupdate = true;
  }
  UpdateEmployee() {
    this.EmployeeModel.name = this.EmployeeForm.value.name;
    this.EmployeeModel.salary = this.EmployeeForm.value.salary;
    this.EmployeeModel.joinDate = this.EmployeeForm.value.joinDate;
    this.EmployeeModel.code = this.EmployeeForm.value.code;
    this.EmployeeModel.dateOfBirth = this.EmployeeForm.value.dateOfBirth;
    this.EmployeeModel.departmentId = this.EmployeeForm.value.departmentId;
    this.EmpService.updateEmployee(this.EmployeeModel.id, this.EmployeeModel).subscribe({
      next: data => {
        console.log(data);
        this.getAllEmployees();
      },
      error: err => { console.log(err) },
    })
  }

  DeleteEmployee(id: number) {
    this.EmpService.deleteEmployee(id).subscribe({
      next: data => {
        console.log(data);
        this.getAllEmployees();
      }
    })
  }
}
