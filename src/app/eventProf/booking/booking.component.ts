import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore' ;
import { AuthService } from '../../BackendConfig/auth.service' ;
import { map } from 'rxjs/operators'
import { Action } from 'rxjs/internal/scheduler/Action';
import { element } from 'protractor';
import { BookingService } from "../../BackendConfig/booking.service";
import { Booking } from "../../BackendConfig/booking.model";
import { freemem } from 'os';

export interface booking {
  bid: string;
  date :string;
  eventType: string;
  userName: string;
  profId: string;
  status: string;
  userComplete: string;
  eventComplete: string;
  cancel: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})

export class BookingComponent implements OnInit {

  flag: Boolean
  flag2 : Boolean 
  Log: any
  list:booking[];
  BookList : Booking[]
  compDate = new Date();
  currentDate = new Date(); 
  dataSet: any;
  userKey;
  today: Date = new Date();

  private bookDoc: AngularFirestoreCollection<booking>
  bookings: Observable<booking[]>
  bookinglist: booking[] = [] as booking[]
  bookinglist2: booking[] = [] as booking[]
  bookinglist3: booking[] = [] as booking[]
  
  tempBooking: booking = {} as booking;

  constructor(
    public authService : AuthService ,
    private store: AngularFireStorage, 
    private firestore: AngularFirestore,
    private PlaceBooking : BookingService) { 
  
      


  }


  ngOnInit() {

    this.authService.GetUserData().subscribe(user => {
      this.userKey = user.uid
      this.firestore.collection('Booking', ref => ref.where('profId' , '==' , user.uid)).snapshotChanges().pipe(
        map( items => 
          items.map(item => {
            const data = item.payload.doc.data();
            const key = item.payload.doc.id
            return { key, ...data}
          }))
      ).pipe().subscribe(dataSet => {
        this.dataSet = dataSet;
        })

    })
     
  }
  
  async changeStatus(id, status){
    await this.firestore.collection('Booking').doc(id).update({status: status });
  }

  

}
