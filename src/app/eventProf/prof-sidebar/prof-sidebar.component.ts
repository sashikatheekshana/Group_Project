import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../BackendConfig/auth.service";
@Component({
  selector: 'app-prof-sidebar',
  templateUrl: './prof-sidebar.component.html',
  styleUrls: ['./prof-sidebar.component.scss']
})
export class ProfSidebarComponent implements OnInit {
  flag : any ;
  Log : any ;

  constructor(
    public authService : AuthService
  ) {
   }

  ngOnInit() {
    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user ;
      });
    });
  }

}
