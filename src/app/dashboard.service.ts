import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import {catchError, shareReplay} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  createProductId():Observable<string>
  {
  return  this.http.get(environment.baseUrl+"/productID",{responseType:'text'}).pipe(catchError(err=>throwError(err)));
  }

  submitProduct(form)
  {
       return this.http.post(environment.baseUrl+"/addProduct",form,).pipe(catchError(err=>throwError(err)));
  }

  retrieveProduct():Observable<any>
  {
    return this.http.get(environment.baseUrl+"/getProducts",).pipe(catchError(err=>throwError(err)));
  
  }
}
