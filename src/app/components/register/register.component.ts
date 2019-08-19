import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { format } from 'util';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newUser:any
  oldUser:any

  constructor(
    private _authService:AuthService, 
    private _router:Router) { }

  ngOnInit() {
    this.newUser = {name:'', email:'', password:''};
    this.oldUser = {email:'', password:''}
  }

  register(form:NgForm){
    this._authService.createUser(this.newUser)
    .subscribe(data => {
      console.log(data);
      form.resetForm();
      // this.newUser = {name:'', email:'', password:''};
      this._router.navigate(['/register'])
    })
  }

  login(){
    this._authService.userLogin(this.oldUser)
    .subscribe(data => console.log(data))
  }

  resetForm(form:NgForm){
    form.resetForm();
  }

}
