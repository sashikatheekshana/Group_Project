import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/BackendConfig/user.service';
import { AuthService } from "../../../app/BackendConfig/auth.service";
import { User } from 'src/app/BackendConfig/user.model';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss']
})

export class UserDataComponent implements OnInit {

  flag: Boolean
  Log: any
  getUserList : User[] ;

  date = (new Date()).toLocaleString();

  constructor(
    private users : UserService,
    private firestore : AngularFirestore,
    private toastr : ToastrService,
    private authService : AuthService
    ) { }

  ngOnInit() {
    this.resetForm();

    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user
      });
    })

//Retrieve User Data From Firestore
    this.users.getUsers().subscribe(dataArray => {
      this.getUserList = dataArray.map(item =>{
        return {id : item.payload.doc.id,
        ...item.payload.doc.data() 
        } as User  
      })
    })

  }

  
//Update or Deleting User Data
  onSubmit(form : NgForm){ 
    let data = Object.assign({}, form.value) ;
    delete data.id ;
    this.firestore.doc('users/' + form.value.id).update(data);
    console.log(form.value.displayName);
    this.firestore.collection('Log').add({adminId:this.Log.uid, adminName:this.Log.displayName,action :"User Edited" , log:"User details changed of the user " + form.value.id + " with the user name of " + form.value.displayName, time : this.date });
    this.toastr.success('User updated sucessfully', 'Jamboree.UserUpdata');
    this.resetForm(form);
  }

//Edit data from User
  onEdit(user : User){
    this.users.userData = Object.assign({},user);
  }

//Delete Data from Users
  onDelete(id : string){
    if(confirm("Are you sure, you want to delete this record?")){
      this.firestore.doc('users/' + id).delete();
      this.firestore.collection('Log').add({adminId:this.Log.uid, adminName:this.Log.displayName,action :"User Deleted" , log:"User deleted with the ID of " + id , time : this.date });
      this.toastr.success('User deleted sucessfully', 'Jamboree.UserDelete');
    }
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
        displayName: '' ,
        age : '' ,
        city : '' , 
        gender: '' ,
        eventType: '',
        date: '',
        eProf: ''
    }
  }
}