import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecMsgs } from "./rec-msgs.model";
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class EventProfSendMsgsService {
  sendMessage: Contact = new Contact();
  constructor(private firestore: AngularFirestore) { }
  getMessage() {
    return this.firestore.collection('EventProfSendMsgs').snapshotChanges();
  }
}
