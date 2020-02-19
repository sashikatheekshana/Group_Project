import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from "src/app/BackendConfig/user.model";
import { UserService } from "src/app/BackendConfig/user.service";
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "./../../BackendConfig/auth.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router }  from '@angular/router';
import { RecMsgsService } from "src/app/BackendConfig/rec-msgs.service";

import { FormGroup , FormControl , Validators } from '@angular/forms';
//import {TooltipPosition} from '@angular/material/tooltip';


@Component({
  selector: 'app-event-prof-request',
  templateUrl: './event-prof-request.component.html',
  styleUrls: ['./event-prof-request.component.scss']
})
export class EventProfRequestComponent implements OnInit {
  getUserList: User[];
  editState: boolean = false;
  userToEdit: User;
  userData: any;

  flag: Boolean
  Log: any
  userSubject = new BehaviorSubject<Boolean>(false);

  public get authenticated() : Observable<Boolean> {
    return this.userSubject.asObservable();
  }
  

  // positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  // position = new FormControl(this.positionOptions[0]);
  constructor(
    private users : UserService,
    public afAuth: AngularFireAuth,
    public authService : AuthService,
    private firestore : AngularFirestore,
    private toastr : ToastrService,
    public route:Router,
    private Rmsg : RecMsgsService
  ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', this.userData.uid);
        //localStorage.setItem('requestsUser', this.userData.uid);
        this.userData.uid;
        console.log(this.userData.uid);
        this.Log = localStorage.getItem('user');
        this.userSubject.next(true);
      } else {
        localStorage.setItem('user', null);
        this.Log = localStorage.getItem('user');
        this.userSubject.next(false);
      }
    })
  }

  ngOnInit() {
    this.resetForm();
    console.log(this.Log);

    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user;
        console.log(this.Log);
      });
    });
    
  }

  resetForm(form ?: NgForm){
    if(form!=null)
      form.resetForm();
      this.users.userData= {
        uid : null ,
        firstName : '',
        lastName : '' ,
        email : '',
        contact : '',
        userType : '',
        eType : '' ,
        description : '' ,
        district : '' ,
        emailVerified : null ,
        photoURL: '',
        displayName: '',
        age : '',
        city : '', 
        gender: '' ,
        eventType: '',
        date : '',
        eProf: ''
        
    }
  }

  
  //data sending to firestore
  //************************************* */
  onSubmit(form : NgForm){
    let data = Object.assign({}, form.value) ;
    
    this.toastr.success('Message Sent Sucessfully', 'Jamboree.NewMessage');
    delete data.uid ;
    console.log(data);
    console.log(this.userData.uid);
    // if(data.email!=""){
    //   this.firestore.collection('users').doc(this.userData.uid).update({email:data.email})
    //   this.toastr.success('Saving...', 'email updated');
    // }
    // if(data.firstName!=""){
    //   this.firestore.collection('users').doc(this.userData.uid).update({firstName:data.firstName});
    //   this.toastr.success('Saving...', 'Firstname updated');
    // }
    // if(data.lastName!=""){
    //   this.firestore.collection('users').doc(this.userData.uid).update({lastName:data.lastName});
    //   this.toastr.success('Saving...', 'lastname updated');
    // }
    if(data.eType!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({eType:data.eType});
      console.log(data.eType);
      this.firestore.collection('userReq').doc(this.userData.uid).set({eType:data.eType,status:false,uid:this.userData.uid});
    }
    if(data.district!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({district:data.district});
    }
    if(data.description!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({description:data.description});
    }
    this.toastr.success('Request sent '); 
    this.route.navigate(['../UserProfile'])
  }
  onEdit(user : User){
    this.users.userData = Object.assign({},user);
  }

}
