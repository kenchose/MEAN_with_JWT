import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http:HttpClient,
    private _serviceUrl = "http://localhost:8000/api/user/"
    ) { }

}
