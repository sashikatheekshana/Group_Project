
import { Injectable } from '@angular/core';
import { Authentication } from './authentication.model'; 
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  formData :  Authentication = new Authentication();

  constructor(private firestore: AngularFirestore) { }

  getUsers(){
    return this.firestore.collection('Users').snapshotChanges();
  }
}
