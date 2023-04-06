import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './Components/employees/employees.component';
import { DepartmentsComponent } from './Components/departments/departments.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AddDepartmentComponent } from './Components/add-department/add-department.component';

const routes: Routes = [
  {path:"",redirectTo:'Employees',pathMatch:'full'},
  {path:'Employees', component:EmployeesComponent,title:'Employees'},
  {path:'Departments', component:DepartmentsComponent,title:'Departments'},
  {path:'AddDepartment', component:AddDepartmentComponent,title:'AddDepartment'},
  {path:"**",component:NotFoundComponent,title:'Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
