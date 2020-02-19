import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router }  from '@angular/router';
import { analytics } from 'firebase';
import { Booking } from 'src/app/BackendConfig/booking.model';
import { BookingService } from 'src/app/BackendConfig/booking.service';
import { User } from 'src/app/BackendConfig/user.model';
import { UserService } from 'src/app/BackendConfig/user.service';
import { map } from 'rxjs/operators'
import { AuthService } from "./../../BackendConfig/auth.service";
import { formatDate }  from "@angular/common";

export interface booking {
  id: string;
  Date: string;
  bid: string;
  date :string;
  eventType: string;
  userName: string;
  profId: string;
  userId: string;
  status: string;
  userComplete: string;
  eventComplete: string;
  cancel: string;
}

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {
  getBookingList=[];
  userBooking: any;
  userData: any;
  shani:boolean;
  shani2 :boolean;
  status=true;

  userSubject = new BehaviorSubject<Boolean>(false);
  d : Date ;
  a : Date ;

  flag: Boolean
  flag2 : Boolean 
  Log: any
  list:booking[];
  BookList : Booking[]
  compDate = new Date();


  currentDate = new Date();

  private bookDoc: AngularFirestoreCollection<booking>
  bookings: Observable<booking[]>
  bookinglist: booking[] = [] as booking[]
  bookinglist2: booking[] = [] as booking[]
  bookinglist3: booking[] = [] as booking[]
  
  tempBooking: booking = {} as booking;

  public get authenticated() : Observable<Boolean> {
    return this.userSubject.asObservable();
  }

  constructor(
    private users : UserService,
    private booking : BookingService,
    public afAuth: AngularFireAuth,
    public authService : AuthService,
    private firestore : AngularFirestore,
    private toastr : ToastrService,
    public route:Router,
  )
  {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('users', this.userData.uid);
        this.userData.uid;
        this.Log = localStorage.getItem('users');
        this.userSubject.next(true);
        
      } else {
        localStorage.setItem('users', null);
        this.Log = localStorage.getItem('users');
        this.userSubject.next(false);
      }
    })
  }

  ngOnInit() {

    
    let flag: boolean = false;
    this.authService.authenticated.subscribe(isAuthed => {
    this.flag = isAuthed;
    this.Log = this.authService.GetUserData().subscribe(user => {
      this.Log = user;
      this.bookDoc = this.firestore.collection('Booking')

      this.bookDoc.snapshotChanges().pipe(
        map(items=>items.map(
          bookings=>{
            //retrieve ongoing bookings by user Id
            //status should be "accepted" and event should not be completed -> eventComplete should be "false"
            if(!flag && bookings.payload.doc.data().userId ==this.Log.uid && bookings.payload.doc.data().eventComplete=="false"  && bookings.payload.doc.data().status=="accepted"){
              this.bookinglist2.push(bookings.payload.doc.data());

              var newdate = bookings.payload.doc.data();
              newdate.id=bookings.payload.doc.id;
              
              var bookDate=newdate.Date;
              var resBook = bookDate.split("-");
              var resCur = this.currentDate.toISOString().split('T')[0];
              var resCurr = resCur.split("-");
              var bookDateNew = new Date(parseInt(resBook[0]),parseInt(resBook[1])-1,parseInt(resBook[2]));
              var currentDateNew = new Date(parseInt(resCurr[0]),parseInt(resCurr[1])-1,parseInt(resCurr[2]));
                              
              bookDateNew.setDate(bookDateNew.getDate()-7);
              console.log("Comp Date : " + bookDateNew);
              console.log("Ada Date : " + this.currentDate);
              console.log(this.currentDate > bookDateNew)

              if(this.currentDate > bookDateNew){this.firestore.collection('Booking').doc(newdate.id).update({cancel:"false"});}
              else{this.firestore.collection('Booking').doc(newdate.id).update({cancel:"true"});}
            }
            else if(!flag && bookings.payload.doc.data().userId==this.Log.uid && (bookings.payload.doc.data().status=="completed" || bookings.payload.doc.data().status=="rejected" || bookings.payload.doc.data().status=="cancelled" || bookings.payload.doc.data().cancel=="false")){
              const id = bookings.payload.doc.id;
              this.bookinglist3.push(bookings.payload.doc.data()); 
            }
          }
        ))
      ).subscribe(c=>{
        flag = true;
      });

    });
  });
}

async changeStatus(id, status){
  await this.firestore.collection('Booking').doc(id).update({status: status });
  location.reload();
}

}