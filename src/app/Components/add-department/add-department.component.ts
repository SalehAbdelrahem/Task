import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentServiceService } from 'src/app/Services/department-service.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {
  departmentFormGroup:FormGroup;
  constructor(private deptService:DepartmentServiceService){
    this.departmentFormGroup=new FormGroup({
      name:new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(50)])
    })
  }

AddDepartmentFunc(){
  console.log(this.departmentFormGroup.value);

  this.deptService.addDepartment(this.departmentFormGroup.value)
  .subscribe((response: any) => {
    console.log(response);
  });
}

}
