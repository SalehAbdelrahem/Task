import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {

  constructor(private _http: HttpClient) { }
  getDepartmentList(): Observable<any> {
    return this._http.get(`${environment.APIURL}/Departments`);
  }
  getDepartmentDetails(id: number): Observable<any> {
    return this._http.get(`${environment.APIURL}/Departments/GetDetails?Id=${id}`);
  }

  getDepartmentWithEmployees(id: number): Observable<any> {
    return this._http.get(`${environment.APIURL}/Departments/GetDetailsIncloudeEmployees?Id=${id}`);
  }

  addDepartment(data: any): Observable<any> {
    let res = this._http.post<any>(`${environment.APIURL}/Departments`, data)
    console.log(res)
    return res;
  }

  PutSettingFees(data:any, id:any) {
    return this._http.put(`${environment.APIURL}` + "Setting_Fees/PutSettingFees/"+ id , data);
  }

  updateDepartment(id:number, data: any): Observable<any> {
    return this._http.put(`${environment.APIURL}/Departments?id=${id}`, data);
  }

  deleteDepartment(id: number): Observable<any> {
    return this._http.delete(`${environment.APIURL}/Departments?Id=${id}`);
  }

}
