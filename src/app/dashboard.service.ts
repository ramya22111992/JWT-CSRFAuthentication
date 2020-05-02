import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import {catchError, switchMap, take, mergeMap, concatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  serverUrl:string="//localhost:8080";

  constructor(private http:HttpClient) { }

  createProductId():Observable<string>
  {
  return  this.http.get(this.serverUrl+"/productID",{withCredentials:true,responseType:'text'}).pipe(catchError(err=>throwError(err)));
  }

  submitProduct(form)
  {
       return this.http.post(this.serverUrl+"/addProduct",form,{withCredentials:true}).pipe(catchError(err=>throwError(err)));
  }

  retrieveProduct():Observable<any>
  {
    return this.http.get(this.serverUrl+"/getProducts",{withCredentials:true}).pipe(catchError(err=>throwError(err)));
  
  }
}
