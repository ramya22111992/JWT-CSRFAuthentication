import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import {catchError, shareReplay} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  loginUser(credentials):Observable<any>
  {
return this.http.post(environment.baseUrl+"/login",credentials).pipe(catchError(err=>throwError(err)));
  }

  generateCSRF():Observable<any>
  {
    return this.http.get(environment.baseUrl+"/").pipe(catchError(err=>throwError(err)));
  }
  

  isLoggedIn():Observable<boolean>
  {
  return this.http.get<boolean>(environment.baseUrl+"/IsLoggedIn").pipe(catchError(err=>throwError(err)))
    
  }

}
