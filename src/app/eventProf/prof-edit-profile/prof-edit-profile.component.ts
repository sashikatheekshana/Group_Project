import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from '../../BackendConfig/auth.service';
import { NgForm, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router }  from '@angular/router'

@Component({
  selector: 'app-prof-edit-profile',
  templateUrl: './prof-edit-profile.component.html',
  styleUrls: ['./prof-edit-profile.component.scss']
})
export class ProfEditProfileComponent implements OnInit {
  message: string = '';

  profileForm = this.formBuilder.group({
    userType : [],
    eType : [],
    displayName : [],
    district: [],
    firstName : [],
    lastName : [],
    age : [],
    gender :[],
    email : [],
    contact : [],
    description: ['']
  });

  flag: Boolean
  Log: any
  user: any


  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  image: string = null;
  list: photo[];


  constructor(public authService: AuthService,
    private formBuilder: FormBuilder,
    private store: AngularFireStorage, 
    private firestore: AngularFirestore,
    private toastr : ToastrService,
    private route : Router) { }

  uploadImage(event) {
    let file = event.target.files[0];
    let path = `profilePictures/${this.Log.uid}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('Error in upload image');
    } else {
      let ref = this.store.ref(path);
      let task = this.store.upload(path, file);
      this.uploadPercent = task.percentageChanges();
      console.log('Image upload success');
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.message = url;
            this.UploadURL();
            this.message = url;
            console.log('aghdfga'+url);
          });
        }
        )
      ).subscribe();
    }
  }

  UploadURL() {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("usersImages")
        .add({ data: this.message })
        .then(res => { }, err => { reject(err) });
      console.log("Upload function")
    });
  }

  ngOnInit() {
    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user;
        this.message = user.photoURL;
        console.log(this.Log);
      });
    });
  }

  updateData(formData) {
    const promise = this.firestore.firestore.collection('users').doc(localStorage.getItem("user") as string).get();
    promise.then( snapshot =>{
      this.user = snapshot.data();
      this.user.userType = formData.userType;
      this.user.eType = formData.eType;
      this.user.displayName = formData.displayName;
      this.user.district = formData.district;
      // this.user.username = formData.username;
      // this.user.firstName = formData.firstName;
      // this.user.lastName = formData.lastName;
      this.user.age = formData.age;
      this.user.gender = formData.gender;
      this.user.email = formData.email;
      this.user.contact = formData.contact;
      this.user.description = formData.description;
      this.user.photoURL = this.message;
      this.firestore.collection("users").doc(this.user.uid).update(this.user).then(()=>{
        location.reload()
      })
    });

    this.toastr.success('Saving...', 'Updated  Successfully')
  
  this.route.navigate(['../EventMain'])
  }

  

}
interface photo {
  id?: string;
  data?: string;
}




