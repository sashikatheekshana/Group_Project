import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../app/BackendConfig/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  flag: Boolean
  Log: any

  constructor(
      public authService : AuthService,
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
