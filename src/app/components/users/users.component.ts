import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:any

  constructor(private _authService:AuthService) { }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this._authService.allUsers()
    .subscribe(data => {
      console.log("afasdfsd",data)
      this.users = data['users']}
      )
  }
}
