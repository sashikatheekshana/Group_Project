//Core
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

//Services
import { AuthService } from "../../../app/BackendConfig/auth.service";
import { ContactService } from 'src/app/BackendConfig/contact.service';
import { RecMsgsService } from "src/app/BackendConfig/rec-msgs.service";

//Models
import { Contact } from 'src/app/BackendConfig/contact.model';
import { RecMsgs } from "src/app/BackendConfig/rec-msgs.model";

@Component({
  selector: 'app-profile-insights',
  templateUrl: './profile-insights.component.html',
  styleUrls: ['./profile-insights.component.scss']
})
export class ProfileInsightsComponent implements OnInit {
  date = (new Date()).toLocaleString();
  ms : any  ;
  Rms : any ;
  flag: Boolean ;
  Log: any ;
  
  constructor(
    private Msg : ContactService,
    private Rmsg : RecMsgsService,
    private toastr : ToastrService,
    private firestore : AngularFirestore,
    private authService : AuthService
    ) { }

  getMessageList : Contact[];
  getUserMessages : RecMsgs[];

  ngOnInit() {
    this.resetForm();

    //Checking the logged in user
    this.authService.authenticated.subscribe(isAuthed => {
      this.flag = isAuthed;
      this.Log = this.authService.GetUserData().subscribe(user => {
        this.Log = user
      });
    })

    //Retrieving Sent Messages 
    this.Msg.getMessage().subscribe(dataArray => {
      this.getMessageList = dataArray.map(item =>{
      return {id : item.payload.doc.id,
            ...item.payload.doc.data()
            } as Contact
      })
    })

    
    //Retrieving Feedbacks
    this.Rmsg.getRecMessage().subscribe(MsgArray => {
      this.getUserMessages = MsgArray.map(item =>{
      return {id : item.payload.doc.id,
            ...item.payload.doc.data()
            } as RecMsgs
      })
    })
  }

    //Send new messages
    onSubmit(form : NgForm){ 
      let data = form.value ;
      console.log("success");
      this.firestore.collection('Contact').add(data);
      if(form.value.receiverType == "Private"){
        this.firestore.collection('Log').add({adminId:this.Log.uid, adminName:this.Log.displayName,action :"Message Sent" , log:"New message has been sent to the user with the email address " + form.value.receiver, time : this.date });
      }
      else if(form.value.receiverType == "Global"){
        this.firestore.collection('Log').add({adminId:this.Log.uid, adminName:this.Log.displayName,action :"Message Sent" , log:"Broadcast message has been sent Globally", time : this.date });
      }
      else if(form.value.receiverType == "Professional"){
        this.firestore.collection('Log').add({adminId:this.Log.uid, adminName:this.Log.displayName,action :"Message Sent" , log:"Broadcast message has been sent to all Professionals", time : this.date });
      }
      else if(form.value.receiverType == "User"){
        this.firestore.collection('Log').add({adminId:this.Log.uid, adminName:this.Log.displayName,action :"Message Sent" , log:"Broadcast message has been sent to all Users", time : this.date });
      }
      this.toastr.success('Message Sent Sucessfully', 'Jamboree.NewMessage');
      this.resetForm(form);
    }

    resetForm(form ?: NgForm){
      if(form!=null)
        form.resetForm();
        this.Msg.sendMessage= {
          id : null ,
          name : 'Jamboree Team',
          email : 'jamboree.inco@gmail.com' ,
          message : '' ,
          date : this.date ,
          receiverType : '',
          receiver : ''
      }
    }

  //Delete Sent messages
  onDelete(id : string){
    if(confirm("Are you sure, you want to delete this message?")){
      this.firestore.doc('Contact/' + id).delete();
      this.firestore.collection('Log').add({adminId:this.Log.uid, adminName:this.Log.displayName,action :"Message Deleted" , log:"A sent message has been deleted", time : this.date });
      this.toastr.success('Message deleted sucessfully', 'Jamboree.MessageDelete');
    }
  }

  //Delete Feedback Messages
  RecOnDelete(id : string){
    if(confirm("Are you sure, you want to delete this message?")){
      this.firestore.doc('ResMessages/' + id).delete();
      this.firestore.collection('Log').add({adminId:this.Log.uid, adminName:this.Log.displayName,action :"Message Deleted" , log:"A received message has been deleted", time : this.date });
      this.toastr.success('Message deleted sucessfully', 'Jamboree.MessageDelete');
    }
  }

  //load message on modal 
  showFrame(ms , frame1){
    this.ms = ms.message ;
    console.log(ms.message);
    frame1.show();
  }

  showFrame2(Rms , frame2){
    this.Rms = Rms.message ;
    console.log(Rms.message);
    frame2.show();
  }
}
