import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecMsgs } from "./rec-msgs.model";

@Injectable({
  providedIn: 'root'
})
export class RecMsgsService {

  RecMessage : RecMsgs = new RecMsgs();

  constructor(private firestore : AngularFirestore) { }

  getRecMessage(){
    return this.firestore.collection('ResMessages').snapshotChanges();
  }

}
