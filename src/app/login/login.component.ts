import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core'; 
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private serv:LoginService,private router:Router) { }

  ngOnInit() {

    this.loginForm=new FormGroup({
      username:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required])
    })


    this.serv.generateCSRF().subscribe(data=>console.log(data),err=>{throw err});

  }

  loginUser()
  {
this.serv.loginUser(this.loginForm.value).subscribe(
data=>{
this.router.navigate(['/dash'],{state:data});

},
err=>{throw err}
);
  }

}
