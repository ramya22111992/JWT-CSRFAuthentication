import { Component, OnInit,Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import {ErrorNotificationService} from '../error-notification.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private ErrorServ:ErrorNotificationService,private cd: ChangeDetectorRef) { }

  error:string;

  ngOnInit() {
    console.log("Error component loaded");
  this.ErrorServ.returnAsObservable().subscribe(data=>{
    this.error=data; 
    this.cd.detectChanges();
  });

  }


  
}
