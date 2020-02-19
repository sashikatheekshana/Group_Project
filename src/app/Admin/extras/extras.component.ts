//Core
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

//Services
import { UserReqService } from "../../BackendConfig/user-req.service";
import { BookingService } from "src/app/BackendConfig/booking.service";

//Models
import { Requests } from "src/app/BackendConfig/user-req.model";
import { Booking } from "src/app/BackendConfig/booking.model";

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.scss']
})
export class ExtrasComponent implements OnInit {

  approves : Requests[];
  declines : Requests[];
  bookings : Booking[];

  constructor(
    private firestore : AngularFirestore, 
    private req : UserReqService,
    private booking : BookingService
  ) { }

  ngOnInit() {
    //retrieves approved request details
    this.req.getApproves().subscribe(actionArray =>{
      this.approves = actionArray.map(item =>{
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data() 
        } as Requests  
      })
    })

    //retrieves declines request details
    this.req.getDeclines().subscribe(actionArray =>{
      this.declines = actionArray.map(item =>{
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data() 
        } as Requests  
      })
    })

    //Retrieving ongoing bookings
    this.booking.getCompletedRequests().subscribe(actionArray =>{
        this.bookings = actionArray.map(item =>{
            return {
              id : item.payload.doc.id,
              ...item.payload.doc.data()
            } as Booking 
        })
    })

  }
}
