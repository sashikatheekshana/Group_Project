import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { acLog } from "../../BackendConfig/log.model";
import { LogService } from "../../BackendConfig/log.service";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  actLog : acLog[]
  constructor(
    private firestore : AngularFirestore ,
    private aLog : LogService 
  
    ) { }

  ngOnInit() {
    //Retreiving Logs 
    this.aLog.getLog().subscribe(dataArray=> {
      this.actLog = dataArray.map(item =>{
        return{
          id : item.payload.doc.id,
          ...item.payload.doc.data()
        } as acLog
      })
    })
    
  }
}
