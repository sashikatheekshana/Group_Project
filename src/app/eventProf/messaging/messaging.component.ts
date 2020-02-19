import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";
import { RecMsgsService } from 'src/app/BackendConfig/rec-msgs.service';
import { Contact } from 'src/app/BackendConfig/contact.model';
import { RecMsgs } from 'src/app/BackendConfig/rec-msgs.model';
import { AuthService } from 'src/app/BackendConfig/auth.service';
import { MessageService } from 'src/app/BackendConfig/message.service';
import { Message } from 'src/app/BackendConfig/message.model';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  flag: Boolean
  Log: any ;
  list:Message[];
  Msg : Contact[];
  userKey;
  dataSet: any;

  constructor(
    private Rmsg : RecMsgsService,
    private toastr : ToastrService,
    private firestore : AngularFirestore,
    public authService : AuthService ,
    private service: MessageService
  ) { }

  getMessageList : Contact[];
  getUserMessages : RecMsgs[];

  ngOnInit() {
      this.authService.authenticated.subscribe(isAuthed => {
        this.flag = isAuthed;
        this.Log = this.authService.GetUserData().subscribe(LogUser => {
          this.Log = LogUser
          console.log(this.Log.email)
          this.firestore.collection('Contact',ref=>ref.where('receiver','==',this.Log.email)).snapshotChanges().pipe(
            map ( items => 
              items.map(item => {
                const data = item.payload.doc.data();
                const key = item.payload.doc.id
                return { key, ...data}
              }))
          ).pipe().subscribe(dataSet => {
            this.dataSet = dataSet;      
          })
        });
      });
      console.log("display :" + this.Log.email)
  } 
    
}
