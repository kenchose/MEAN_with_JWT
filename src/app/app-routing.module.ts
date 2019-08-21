import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard'

const routes: Routes = [
  {path: "register", component:RegisterComponent},
  {path: "home", component:HomeComponent},
  {path: "secret", canActivate:[AuthGuard], component:UsersComponent},
  {path: "dashboard", component:DashboardComponent},
  {path:"", pathMatch:"full", redirectTo:"/register"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
