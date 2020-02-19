import { Injectable } from '@angular/core'; 
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from "./contact.model";

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  sendMessage : Contact = new Contact();

  constructor(private firestore : AngularFirestore) { }

  getMessage(){
    return this.firestore.collection('Contact').snapshotChanges();
  }

}
