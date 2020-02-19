import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { User } from 'src/app/BackendConfig/user.model';
import { UserService } from 'src/app/BackendConfig/user.service';
import { Router }  from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';

import { Contact } from 'src/app/BackendConfig/contact.model';
import { ContactService } from 'src/app/BackendConfig/contact.service';





import { AuthService } from "./../../BackendConfig/auth.service";

import { formatDate }  from "@angular/common";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  getMessageList = [];
  sendMessage: any;
  userData: any;
  flag1: Boolean

  flag: Boolean
  Log: any
  userSubject = new BehaviorSubject<Boolean>(false);

  public get authenticated() : Observable<Boolean> {
    return this.userSubject.asObservable();
  }

  constructor(
    private users : UserService,
    private message : ContactService,
    public afAuth: AngularFireAuth,
    public authService : AuthService,
    private firestore : AngularFirestore,
    public route:Router,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('users', this.userData.uid);
        this.userData.uid;
        //console.log(this.userData.uid);
        this.Log = localStorage.getItem('users');
        this.userSubject.next(true);
        //console.log(this.currentDate);
        
      } else {
        localStorage.setItem('users', null);
        this.Log = localStorage.getItem('users');
        this.userSubject.next(false);
      }
    })
   } 

  ngOnInit() {
    this.flag1 = true;
    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user;
        this.message.getMessage().subscribe(data => {
          this.sendMessage = data;
          console.log(data);
          if(this.flag1){
            this.flag1 = false;
            this.sendMessage.forEach(user => {
              var newmessage = user.payload.doc.data();
              newmessage.id = user.payload.doc.id;
              console.log(newmessage.receiver);
              console.log(this.userData.email);

              if ((this.userData.email == newmessage.receiver) &&  (newmessage.receiverType == "User" || newmessage.receiverType == "Global")) {
                this.getMessageList.push(newmessage);
              }
              if((this.userData.email == newmessage.receiver) &&  (newmessage.receiverType == "Private")) {
                this.getMessageList.push(newmessage);
              }
            });
          }
           
        })
      })
    })
  }

}
