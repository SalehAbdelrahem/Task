import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/Environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private _http: HttpClient) {}

  getEmployeeList(): Observable<any> {
    return this._http.get(`${environment.APIURL}/Employees`);
  }
  getEmployeeDetails(id: number): Observable<any> {
    return this._http.get(`${environment.APIURL}/Employees/GetDetails?Id=${id}`);
  }

  getEmployeetWithHisDept(id: number): Observable<any> {
    return this._http.get(`${environment.APIURL}/Employees/GetEmployeeDetailsIncludeDept?Id=${id}`);
  }
  addEmployee(data: any): Observable<any> {
    return this._http.post<any>(`${environment.APIURL}/Employees`, data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`${environment.APIURL}/Employees?Id=${id}`, data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`${environment.APIURL}/Employees?Id=${id}`);
  }
}
