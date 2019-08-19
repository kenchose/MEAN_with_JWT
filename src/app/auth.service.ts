import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http:HttpClient,
    private _serviceUrl = "http://localhost:8000/api/user/"
  ) { }

  createUser(newUser:object){
    return this._http.post<any>(this._serviceUrl+"register", newUser)
  }

  userLogin(user:object){
    return this._http.post<any>(this._serviceUrl+"login", user)
  }

}
