import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore' ;
import { AuthService } from '../../BackendConfig/auth.service' ;

@Component({
  selector: 'app-prof-main',
  templateUrl: './prof-main.component.html',
  styleUrls: ['./prof-main.component.scss']
})
export class ProfMainComponent implements OnInit {
  flag: Boolean
  Log: any

  message: string = 'dcdcdcdc';

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  image: string = null;
  list:photo[];

  constructor(
    public authService : AuthService ,
    private store: AngularFireStorage, private firestore: AngularFirestore) {
    }

  uploadImage(event) {
    let file = event.target.files[0];
    let path = `posts/${file.name}`;
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
            console.log(url);
          });
        }
        )
      ).subscribe();
    }
  }

  UploadURL() {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("CustomerPosts")
        .add({ data: this.message,
                id:this.Log.uid})
        .then(res => { }, err => { reject(err) });
      console.log("Upload function")
    });
  }



  ngOnInit() {

    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user ;

        this.firestore.collection("CustomerPosts",ref=>
          ref.where('id','==',this.Log.uid )).valueChanges().subscribe(
            imageList=>{
              this.list = imageList as photo[];
              console.log(this.list);
            }
          )
      });
    });
  }

  previewImage(image : any,frame : any){
    this.image = image.data;
    frame.show();
  }

}
interface photo {
  id?:string;
  data?:string;
}
