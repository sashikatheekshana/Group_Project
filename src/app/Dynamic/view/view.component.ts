import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore' ;
import { AuthService } from '../../BackendConfig/auth.service' ;
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/BackendConfig/user.model';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  flag: Boolean
  Log: any
  id: any;
  user: User;

  constructor(
    private route: ActivatedRoute,
    public authService : AuthService ,
    private store: AngularFireStorage, private firestore: AngularFirestore) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.fetchUser();
    });

    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user ;
      });
    });
  } 
  fetchUser() {
    if (!!this.id) {
      this.firestore.collection('users').doc(this.id.toString()).snapshotChanges().subscribe(data => {
        this.user = data.payload.data() as User;
        console.log(this.user);
      });
    }
  }

}