import { Component, OnInit,Input, NgZone } from '@angular/core';
import {ErrorNotificationService} from '../error-notification.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private ErrorServ:ErrorNotificationService,private zone:NgZone) { }

  error:string;

  ngOnInit() {
    console.log("Error component loaded");
  this.ErrorServ.returnAsObservable().subscribe(data=>{
    this.zone.run(()=>{
      this.error=data; 
    })
  });

  }


  
}
