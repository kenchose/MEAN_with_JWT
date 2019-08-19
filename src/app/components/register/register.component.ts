import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newUser:any
  oldUser:any

  constructor(
    private _httpService:HttpService, 
    private _router:Router) { }

  ngOnInit() {
    this.newUser = {name:'', email:'', password:''};
    this.oldUser = {email:'', password:''}
  }

  register(){
    this._httpService.createUser(this.newUser)
    .subscribe(data => {
      console.log(data);
      this._router.navigate(['/register'])
      // this.newUser = {name:'', email:'', password:''};
    })
  }

  login(){
    this._httpService.userLogin(this.oldUser)
    .subscribe(data => console.log(data))
  }

  resetForm(form:NgForm){
    form.resetForm();
  }

}
