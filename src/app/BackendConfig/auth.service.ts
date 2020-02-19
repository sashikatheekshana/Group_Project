import { Injectable, NgZone } from '@angular/core';
import { User } from "./user.model";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from 'rxjs';
import { map, first } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  type : string = 'eventProf' ;
  userData: any;
  Log : any ;
  userSubject = new BehaviorSubject<Boolean>(false);
  date = (new Date()).toLocaleString();

  public get authenticated() : Observable<Boolean> {
    return this.userSubject.asObservable();
  }

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone             // NgZone service to remove outside scope warning
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', this.userData.uid);
        this.Log = localStorage.getItem('user');
        this.userSubject.next(true);
      } else {
        localStorage.setItem('user', null);
        this.Log = localStorage.getItem('user');
        this.userSubject.next(false);
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password,fName,lName) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user,fName,lName);
        this.router.navigate(['']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['Sign2']);
    })
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  SetUserData(user,fName, lName) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      firstName: fName,
      lastName: lName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      displayName: fName + ' ' + lName,
      userType: 'User',
      contact: null,
      eType: null,
      description: null,
      district: null ,
      age : null ,
      city : null , 
      gender: null,
      eventType: null,
      date : this.date,
      eProf : null 
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  GetUserData(): Observable<any> {
    return this.afs.collection("users").doc(localStorage.getItem("user") as string).valueChanges().pipe(first());
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/Signin']);
    })
  }
}
