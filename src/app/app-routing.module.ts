import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteActivateService } from './route-activate.service';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"loginPage"

  },
  {
    path:'loginPage',
    component:LoginComponent
  },
  {
    path:'dash',
    component:DashboardComponent,
    canActivate:[RouteActivateService]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
