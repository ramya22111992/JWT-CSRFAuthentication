import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import {ErrorNotificationService  } from './error-notification.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private injector:Injector) { }

  handleError(error:Error|HttpErrorResponse)
  {
    var errmessage="";
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!window.navigator.onLine) {
    
   errmessage="Please check your browser's connectivity to internet";
    this.UpdateErrorInComponent(errmessage);  
        // Handle offline error
      } else {
          console.log(error);
        // Handle Http Error (error.status === 403, 404...)

        if(error.status==500 ||error.status==502 ||error.status==504 ||error.status==0)
        {
errmessage="An unexpected error has occured on the server.Please try again later."
this.UpdateErrorInComponent(errmessage);
        }
        else if(error.status==503)
        {
  errmessage="Service is temporarily unavailable.Please try again later"; 
  this.UpdateErrorInComponent(errmessage);       
        }
        else if(error.status==403)
        {
    errmessage="Unauthorised!";
     this.UpdateErrorInComponent(errmessage);     
        }
        else if(error.status==401)
        {
    errmessage="Authentication failed.Please log in again";  
    this.UpdateErrorInComponent(errmessage); 
        }
        else
        {
           errmessage=error.statusText;
           this.UpdateErrorInComponent(errmessage);
        
        }

      }


   } else {
        console.log(error);
     // Handle Client Error (Angular Error, ReferenceError...)     
   }
  // Log the error anyway



  }

  
  UpdateErrorInComponent(message:string)
  {
let serv=this.injector.get(ErrorNotificationService);
serv.notify(message);
  }

}
