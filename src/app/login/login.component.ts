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

  @ViewChild('error')error:ElementRef;

  constructor(private serv:LoginService,private router:Router) { }

  ngOnInit() {

    this.loginForm=new FormGroup({
      username:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required])
    })

    this.serv.generateCSRF().subscribe(data=>console.log(data),err=>console.log(err));

  }

  readCookie()
  {
localStorage.removeItem("XSRF-TOKEN");
let cookieList=document.cookie.split(";");

let index:number=0;
for(let i=0;i<cookieList.length;i++)
{
index=cookieList[i].indexOf("=");
if(cookieList[i].substring(0,index).indexOf("XSRF-TOKEN")!==-1)
{
  localStorage.setItem("XSRF-TOKEN",cookieList[i].substring(index+1));  
}
}
  }


  loginUser()
  {
this.serv.loginUser(this.loginForm.value).subscribe(
data=>{
//this.readCookie();
this.router.navigate(['/dash'])

},
err=>{
this.error.nativeElement.innerHTML=err.statusText;
});
  }

}
