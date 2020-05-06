import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import {DashboardService} from '../dashboard.service';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { take, concatMap } from 'rxjs/operators';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
@ViewChild('prodImg')prodImg:ElementRef;

  ProductForm:FormGroup;
  products:any[];
  user:string;
  role:string;

  availableRoles={
    user:"User",
    admin:"Admin" 
 }



  constructor(private serv:DashboardService) { }

  ngOnInit() {

    this.ProductForm=new FormGroup(
      {
        name:new FormControl("",[Validators.required]),
        price:new FormControl("",[Validators.required]),
        productID:new FormControl("",[])
            }
    )

    this.user=history.state.user;
    this.role=history.state.role;

  }

  

  submitProduct()
  {
let form=new FormData();

let productId$=this.serv.createProductId().pipe(take(1));

productId$.pipe(concatMap(data=>{
let filename=data+"."+this.prodImg.nativeElement.files[0].name.substring(this.prodImg.nativeElement.files[0].name.lastIndexOf(".")+1);
this.ProductForm.get('productID').setValue(filename);

form.append("uploads",this.prodImg.nativeElement.files[0],filename);
form.append("productDetails",JSON.stringify(this.ProductForm.value));

return this.serv.submitProduct(form);
})).subscribe(data=>{
  console.log(data)
},
err=>{
  throw err;
})

  }

  retrieveProduct()
  {
    this.serv.retrieveProduct().subscribe(data=>this.products=data,
    err=>{
     throw err;
    })
  }

}
