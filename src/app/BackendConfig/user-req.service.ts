import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Requests } from "./user-req.model";

@Injectable({
  providedIn: 'root'
})
export class UserReqService {

  constructor(private firestore : AngularFirestore) { }

  getRequests(){
    return this.firestore.collection('userReq',ref=>ref.where("status","==","pending")).snapshotChanges();
  }

  getApproves(){
    return this.firestore.collection('userReq',ref=>ref.where("status","==","approved")).snapshotChanges();
  }

  getDeclines(){
    return this.firestore.collection('userReq',ref=>ref.where("status","==","declined")).snapshotChanges();
  }

}
