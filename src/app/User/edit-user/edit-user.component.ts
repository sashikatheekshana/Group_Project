import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/BackendConfig/user.service";
import { AuthService } from "./../../BackendConfig/auth.service";
import { User } from "src/app/BackendConfig/user.model";
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, first } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router }  from '@angular/router'

import { FormGroup , FormControl , Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  getUserList: User[];
  editState: boolean = false;
  userToEdit: User;
  userData: any;

  flag: Boolean
  Log: any
  userSubject = new BehaviorSubject<Boolean>(false);

  imgSrc : string;
  selectedImg : any = null;
  isSubmitted : boolean = false;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  image: string = null;
  list: photo[];
  message: string = '';

  public get authenticated() : Observable<Boolean> {
    return this.userSubject.asObservable();
  }

  
  formTemplate = new FormGroup( {
    imageUrl : new FormControl('',Validators.required),
  })


  constructor(private users : UserService,
    private firestore : AngularFirestore,
    private toastr : ToastrService,
    public afAuth: AngularFireAuth,
    public authService : AuthService,
    public route:Router,
    private storage : AngularFireStorage)
     {

      this.afAuth.authState.subscribe(user => {
        //user is signed in
        if (user) {
          this.userData = user;
          localStorage.setItem('user', this.userData.uid);
          this.userData.uid;
          console.log(this.userData.uid);
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
     //upload image in firestore storage (user)
     uploadImage(event) {
      let file = event.target.files[0];
      let path = `profilePictures/${this.Log.uid}`;
      if (file.type.split('/')[0] !== 'image') {
        return alert('Error in upload image');
      } else {
        let ref = this.storage.ref(path);
        let task = this.storage.upload(path, file);
        this.uploadPercent = task.percentageChanges();
        console.log('Image upload success');
        task.snapshotChanges().pipe(
          finalize(() => {
            this.downloadURL = ref.getDownloadURL();
            this.downloadURL.subscribe(url => {
              this.message = url;
              this.UploadURL();
              this.message = url;
              console.log('.......image uploading........\n'+url);
            });
          }
          )
        ).subscribe();
      }
    }

    //store image url into firestore database
    UploadURL() {
      return new Promise<any>((resolve, reject) => {
        // this.firestore
        //   .collection("userImage")
        //   .add({ data: this.message })
        //   .then(res => { }, err => { reject(err) });
        // console.log("Upload function")
        this.firestore.collection('users').doc(this.userData.uid).update({photoURL:this.message});
        //this.toastr.success('Saving...', 'Photo updated');
      });
    }

    ngOnInit() {
      this.resetForm();
      var count : number = 0 ;

      this.authService.authenticated.subscribe(isAuthed => {
        this.flag = isAuthed;
        this.Log = this.authService.GetUserData().subscribe(user => {
          this.Log = user;
          this.message = user.photoURL;
          //console.log(user.photoURL + "*********************");
          //console.log(this.Log);
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
        district : '',
        emailVerified : null,
        photoURL : '',
        displayName : '',
        city : '',
        age : '' , 
        gender: '',
        eventType: '',
        date : '',
        eProf : ''

    }
  }

  //data sending to firestore
  //************************************* */
  onSubmit(form : NgForm){
    let data = Object.assign({}, form.value) ;
    delete data.uid ;
    console.log(data);
    console.log(this.userData.uid);
    console.log(this.userData.age);
    
    if(data.contact!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({contact:data.contact});
      this.toastr.success('Saving...', 'contact updated');
    }
    if(data.district!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({district:data.district});
      this.toastr.success('Saving...', 'district updated');
    }
    if(data.age!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({age:data.age});
      this.toastr.success('Saving...', 'age updated');
    }
    if(data.gender!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({gender:data.gender});
      this.toastr.success('Saving...', 'gender updated');
    }
    if(data.city!=""){
      this.firestore.collection('users').doc(this.userData.uid).update({city:data.city});
      this.toastr.success('Saving...', 'city updated');
    }
    
    
    this.route.navigate(['../UserProfile'])
  }
 
  //Edit data from User
  onEdit(user : User){
    this.users.userData = Object.assign({},user);
  }
  }

  interface photo {
    id?: string;
    data?: string;
  }


