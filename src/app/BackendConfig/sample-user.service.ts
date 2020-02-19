import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from "./user.model";
import { map } from "rxjs/operators";
import { firestore } from 'firebase';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SampleUserService {
  userData : User = new User();
  userDoc : AngularFirestoreDocument<User>;
  //userCollection: AngularFirestoreCollection<User>
  //Users: Observable<User[]>

  constructor(private firestore : AngularFirestore) { 

  }

  getUsers(){
    return this.firestore.collection('Sample').snapshotChanges();
    
  }

  addUser(user: User){
    this.firestore.collection('Sample').add(User);
  }

  /*updateUser(user: User) {
    this.userDoc = this.firestore.doc('Sample/${User.id}');
    this.userDoc.update(user);*/

  }
  /*editUser(user: User) {
    this.userCollection.add(user);
  }*/