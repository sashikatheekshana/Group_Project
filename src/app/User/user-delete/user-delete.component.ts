import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "./../../BackendConfig/auth.service";
import { User } from "src/app/BackendConfig/user.model";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastrService } from 'ngx-toastr';
import { UserService } from "src/app/BackendConfig/user.service";
import { Router }  from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { Injectable, NgZone } from '@angular/core';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  getUserList: User[];
  userData: any;
  flag: Boolean
  Log: any
  userSubject = new BehaviorSubject<Boolean>(false);
  //user: any

  public get authenticated() : Observable<Boolean> {
    return this.userSubject.asObservable();
  }

  constructor(private users : UserService,
    private firestore : AngularFirestore,
    private toastr : ToastrService,
    public afAuth: AngularFireAuth,
    public authService : AuthService,
    public route:Router,
    public ngZone: NgZone) 
    { 
      this.afAuth.authState.subscribe(user => {
        //user is signed in
        if (user) {
          this.userData = user;
          localStorage.setItem('user', this.userData.uid);
          this.userData.uid;
          console.log(this.userData.uid);
          console.log(this.userData.email);
          this.Log = localStorage.getItem('user');
          this.userSubject.next(true);
        } 
        //no user is signed in
        else {
          localStorage.setItem('user', null);
          this.Log = localStorage.getItem('user');
          this.userSubject.next(false);
        }
      })


    }

    // Sign in with email/password
 


  ngOnInit() {
    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user;
        //console.log(user.photoURL + "*********************");
        //console.log(this.Log);
      });
    });

    
  }
  DeleteUser(email,password) {

    var email = this.userData.email;
    console.log(email);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.firestore.collection("users").doc(this.userData.uid).update({acStatus: false}).then(a => {
            this.route.navigate(['../Signin'])
            
          })
          //this.router.navigate(['']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

 //Delete user
 onDelete(password) {
  //console.log(id);
  // if(this.DeleteUser(this.userData.email,password)){
    
  // this.firestore.collection("users").doc(this.userData.uid).update({acStatus: false}).then(a => {
  //   //this.route.navigate(['../Signin'])
    
  // })
  // }
  // else{
  //   console.log("incorrect password");
  // }
  this.DeleteUser(this.userData.email,password);
  
 }
}



