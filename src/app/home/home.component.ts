import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';import { RecMsgsService } from "src/app/BackendConfig/rec-msgs.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private Rmsg : RecMsgsService,
    private toastr : ToastrService,
    private firestore : AngularFirestore,
    private router: Router
  ){}

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(form : NgForm){ 
    let data = form.value ;
    console.log("sucess");
    this.firestore.collection('ResMessages').add(data);
    this.toastr.success('Message Sent Sucessfully', 'Jamboree.NewMessage');
    this.resetForm(form);
  }

  resetForm(form ?: NgForm){
    if(form!=null)
      form.resetForm();
      this.Rmsg.RecMessage= {
        id : null ,
        name : '',
        email : '' ,
        message : '' ,
        date : '' ,
        time : ''
    }
  }
}
