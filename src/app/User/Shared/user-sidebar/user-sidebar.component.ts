import { Component, OnInit } from '@angular/core';
import { SampleUserService } from 'src/app/BackendConfig/sample-user.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/BackendConfig/user.model';
import { AuthService } from "../../../BackendConfig/auth.service";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  Users: User[];
  flag: Boolean
  Log: any
  
  //message: string = 'dcdcdcdc';


  // uploadPercent: Observable<number>;
  // downloadURL: Observable<string>;
  // image: string = null;
  // list:photo[];

  constructor(private userService: SampleUserService,
    private store: AngularFireStorage, 
    public authService : AuthService,
    private firestore: AngularFirestore) 
    { }

  // uploadImage(event) {
  //   let file = event.target.files[0];
  //   let path = `posts/${file.name}`;
  //   if (file.type.split('/')[0] !== 'image') {
  //     return alert('Error in upload image');
  //   } else {
  //     let ref = this.store.ref(path);
  //     let task = this.store.upload(path, file);
  //     this.uploadPercent = task.percentageChanges();
  //     console.log('Image upload success');
  //     task.snapshotChanges().pipe(
  //       finalize(() => {
  //         this.downloadURL = ref.getDownloadURL();
  //         this.downloadURL.subscribe(url => {
  //           this.message = url;
  //           this.UploadURL();
  //           console.log(url);
  //         });
  //       }
  //       )
  //     ).subscribe();
  //   }
  // }

  // UploadURL() {
  //   return new Promise<any>((resolve, reject) => {
  //     this.firestore
  //       .collection("CustomerPosts")
  //       .add({ data: this.message })
  //       .then(res => { }, err => { reject(err) });
  //     console.log("Upload function")
  //   });
  // }

  ngOnInit() {
    // this.userService.getUsers().subscribe(dataArray => {
    //   this.Users = dataArray.map(item =>{
    //     return {id : item.payload.doc.id,
    //     ...item.payload.doc.data()
    //   } as User
    //   })
    //   })

      this.authService.authenticated.subscribe(isAuthed => {
        this.flag = isAuthed;
        this.Log = this.authService.GetUserData().subscribe(user => {
          this.Log = user
        });
      });
  }


}
interface photo {
  id?:string;
  data?:string;
}
