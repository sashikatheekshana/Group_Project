import { Injectable } from '@angular/core';
import { acLog } from "./log.model";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private acLog : acLog

  constructor(
    private firestore : AngularFirestore 
  ) { }

  getLog(){
    return this.firestore.collection('Log').snapshotChanges();
  }
}
