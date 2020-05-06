import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

serverUrl:string="//localhost:8080";

  constructor(private http:HttpClient) { }

  loginUser(credentials):Observable<any>
  {
return this.http.post(this.serverUrl+"/login",credentials,{withCredentials:true}).pipe(catchError(err=>throwError(err)));
  }

  generateCSRF():Observable<any>
  {
    return this.http.get(this.serverUrl+"/",{withCredentials:true}).pipe(catchError(err=>throwError(err)));
  }
  

  isLoggedIn():Observable<boolean>
  {
  return this.http.get<boolean>(this.serverUrl+"/IsLoggedIn",{withCredentials:true}).pipe(catchError(err=>throwError(err)))
    
  }

  


}
