import { Injectable } from '@angular/core';
import { Booking } from "./booking.model";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  userBooking : Booking = new Booking();

  constructor(private firestore : AngularFirestore) { }

  //list document from firestore collection
  getBooking() {
    return this.firestore.collection('Booking').snapshotChanges();
  }



  //For Event Professional's Reference 
  getRequests(){
    return this.firestore.collection('Booking').snapshotChanges();
  }
  getOngoingRequests(){
    return this.firestore.collection('Booking',ref=>ref.where("status","==","accepted")).snapshotChanges();
  }
  getRejectedRequests(){
    return this.firestore.collection('Booking',ref=>ref.where("status","==","rejected")).snapshotChanges();
  }
  getCompletedRequests(){
    return this.firestore.collection('Booking',ref=>ref.where("status","==","completed")).snapshotChanges();
  }
}
