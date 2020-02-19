//Core
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

//Service files
import { AuthenticationService } from 'src/app/Shared/authentication.service';
import { UserService } from "src/app/BackendConfig/user.service";
import { UserReqService } from "src/app/BackendConfig/user-req.service";
import { BookingService } from "src/app/BackendConfig/booking.service";

//Models
import { Authentication } from 'src/app/Shared/authentication.model';
import { Requests } from "src/app/BackendConfig/user-req.model";
import { User } from 'src/app/BackendConfig/user.model';
import { Booking } from "src/app/BackendConfig/booking.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  list : Authentication[];
  getUserList : User[] ;
  requests : Requests[];
  bookings : Booking[];

  totalCount: number;
  bookingCount : number ;
  profCount : number ;
  ms : any ;

  constructor(
    private firestore : AngularFirestore, 
    private toastr : ToastrService,
    private users : UserService,
    private service : AuthenticationService,
    private req : UserReqService,
    private booking : BookingService
    ) { }

  ngOnInit() {

    //Retrieving user info 
    this.users.getUsers().subscribe(dataArray => {
      this.totalCount = dataArray.length;
      this.getUserList = dataArray.map(item =>{         
        return {id : item.payload.doc.id,
        ...item.payload.doc.data() 
        } as User  
      })  
    })

    //Retrieving professional info
    this.users.getProfessionals().subscribe(dataArray => {
      this.profCount = dataArray.length;
      this.getUserList = dataArray.map(item =>{         
        return {id : item.payload.doc.id,
        ...item.payload.doc.data() 
        } as User  
      })  
    })

    //retrieveing unaccepted professional requests
    this.req.getRequests().subscribe(actionArray =>{
      this.requests = actionArray.map(item =>{
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data() 
        } as Requests  
      })
    })

    //Retrieving ongoing bookings
    this.booking.getOngoingRequests().subscribe(actionArray =>{
      this.bookingCount = actionArray.length ;
        this.bookings = actionArray.map(item =>{
            return {
              id : item.payload.doc.id,
              ...item.payload.doc.data()
            } as Booking 
        })
    })
  }

  //Approve event professional
  changeStatus1(uid : any){
    if(confirm("Advance to event professional?")){
      this.firestore.doc('users/' + uid).update({userType:"Professional"});
      this.firestore.doc('userReq/' + uid).update({status :"approved"});
      this.toastr.success('New Event Proffessional Added', 'Jamboree.EventProfAdded');
    } 
  }

  //Decline event professional
  changeStatus2(uid : any){
    if(confirm("Reject the user application?")){
      this.firestore.doc('userReq/' + uid).update({status :"declined"});
      this.toastr.success('New Event Proffessional Added', 'Jamboree.EventProfAdded');
    } 
  }

  showFrame(ms , frame1){
    this.ms = ms.description ;
    console.log(ms.description);
    frame1.show();
  }


}
