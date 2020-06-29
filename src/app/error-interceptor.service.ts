import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { ErrorNotificationService } from './error-notification.service';
import { Router } from '@angular/router';
import { retry, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private serv:ErrorNotificationService,private router:Router) { }

  intercept(req:HttpRequest<any>,next:HttpHandler)
  {

return next.handle(req).pipe(
  retry(1),
  catchError(err=>this.handleError(err)),
  tap(event=>{
    console.log(event);
  },
  error=>{
console.log(error);

  })
)
  }

  handleError(error:HttpErrorResponse)
  {
    if(error.error instanceof ErrorEvent)
    {
    this.serv.notify(error.error.message);
    }
    else
    {
      if(error.status==401){this.router.navigate(['/loginPage']); }
      else
      {
this.serv.notify(error.error);
      }
    }

    return throwError(error);

  }
}

