import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { }

  createUser(newUser:any){
    console.log('from server', newUser)
    return this._http.post("/api/user/register", newUser)
  }

  userLogin(user:object){
    return this._http.post("/login", user)
  }
}
