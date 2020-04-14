import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DashboardService} from '../dashboard.service';
import {FormGroup,FormControl,Validators} from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  commentForm:FormGroup;

  constructor(private serv:DashboardService,private router:Router) { }

  ngOnInit() {

    this.commentForm=new FormGroup(
      {
        username:new FormControl("",[Validators.required]),
        userEmail:new FormControl("",[Validators.required]),
        comment:new FormControl("",[Validators.required])
      }
    )
  }

  submitComment()
  {
this.serv.submitComment(this.commentForm.value).subscribe(data=>{console.log(data)},
err=>{
  if(err.status==401 || err.status==403)
  {
this.router.navigate(['/loginPage']);
  }
})
  }

}
