import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../../BackendConfig/auth.service";
import { Observable } from 'rxjs';
import {SearchComponentComponent} from "../search-component/search-component.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  flag: Boolean
  Log: any

  constructor(
    public authService : AuthService
  ) { }

  ngOnInit() {
    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user
      });
    });
  }
}
