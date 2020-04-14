import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {LoginService} from './login.service';
import { Observable, of } from 'rxjs';
import {Router} from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteActivateService implements CanActivate {

  constructor(private serv:LoginService,private router:Router) { }

  canActivate():Observable<boolean>
  {
return this.serv.isLoggedIn().pipe(map(x=>{
 if(x)
 {
   return true
 } 
}),catchError(()=>
  {
    this.router.navigate(['/loginPage']);
    return of(false);
  }))

  }
}
