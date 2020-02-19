import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/BackendConfig/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  id: String;
  user: User;
  value: string = "";
  dispalyName: string = "";

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore,private eRef: ElementRef, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.fetchUser();
    });
  }

  fetchUser() {
    if (!!this.id) {
      this.firestore.collection('users').doc(this.id.toString()).snapshotChanges().subscribe(data => {
        this.user = data.payload.data() as User;
        console.log(this.user);
      });
    }
  }
  onClick(){

    
    this.router.navigate([`DynamicUser/${this.id}`]);
    
  }

  }
  


