import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from "./contact.model";
import { Message } from 'src/app/BackendConfig/message.model';
import { AuthService } from 'src/app/BackendConfig/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  formData: Message;
  Log: any

  constructor(private firestore: AngularFirestore,
    public authService: AuthService) { }


  getMessage(userMail) {
    return this.firestore
    .collection('Contact',ref=> ref.where("receiver","==","userMail"))
    .doc()
    .get()
    .pipe()
  }
}