import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http:HttpClient,
  ) { }

  createUser(newUser:object){
    return this._http.post<any>("/api/user/register", newUser)
  }

  userLogin(user:object){
    return this._http.post<any>("/api/user/login", user)
  }

  allUsers(){
    return this._http.get<any>("/api/user/users");
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }
}
