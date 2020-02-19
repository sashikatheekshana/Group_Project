import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../BackendConfig/auth.service";

@Component({
  selector: 'displayBar',
  templateUrl: './display-page-bar.component.html',
  styleUrls: ['./display-page-bar.component.scss']
})
export class DisplayPageBarComponent implements OnInit {
  flag : any ;
  Log : any ;

  constructor(
    public authService : AuthService){
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