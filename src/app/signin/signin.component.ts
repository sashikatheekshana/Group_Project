import { Component, OnInit } from '@angular/core';
import { AuthService } from "../BackendConfig/auth.service";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
flag = 2;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
