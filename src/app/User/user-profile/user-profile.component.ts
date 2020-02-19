import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from "src/app/BackendConfig/user.service";
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from "src/app/BackendConfig/user.model";
import { AuthService } from "./../../BackendConfig/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router }  from '@angular/router';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  Users: User[];
  userData: any;

  flag: Boolean
  Log: any
  userSubject = new BehaviorSubject<Boolean>(false);


  constructor(
    private users: UserService,
    public afAuth: AngularFireAuth,
    public authService : AuthService,
    private toastr : ToastrService,
    private firestore : AngularFirestore,
    public route:Router,

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


  ngOnInit(){
    
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
        eventType: '' ,
        date : '',
        eProf: ''
        
    }
  }

  //data sending to firestore
  onSubmit(form : NgForm){
    let data = Object.assign({}, form.value) ;
    
    this.toastr.success('Message Sent Sucessfully', 'Jamboree.NewMessage');
    delete data.uid ;
    console.log(data);
    console.log(this.userData.uid);
    
    if(data.eType!=""){
      console.log(data.eType);
      this.firestore.collection('userReq').doc(this.userData.uid).set({eType:data.eType,displayName:data.displayName,uid:this.userData.uid,status:"pending",contact:data.contact, eProf:data.eProf,email:data.email});
      
    }
    if(data.email =""){
      this.firestore.collection('users').doc(this.userData.uid).update({email:data.email+''});
      
    }

    if(data.district!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({district:data.district});
      
    }
    if(data.description!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({description:data.description});
      
    }
    if(data.displayName=""){
      this.firestore.collection('users').doc(this.userData.uid).update({displayName:data.displayName+''});
    
    }
    if(data.contact!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({contact:data.contact+''});
    }
    


    this.toastr.success('Request sent '); 
    this.route.navigate(['../UserProfile'])
  }




}
