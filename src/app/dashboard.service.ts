import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  serverUrl:string="//localhost:8080";

  constructor(private http:HttpClient) { }

  submitComment(form)
  {
    return this.http.post(this.serverUrl+"/comment",form,{withCredentials:true}).pipe(catchError(err=>throwError(err)));
  }
}
