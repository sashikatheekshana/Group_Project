import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from 'src/app/BackendConfig/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  users: User[];
  filtered: User[];
  isVisible: boolean = false;
  value: string = "";
  searchKey: String = "";
  displayName: String = "";

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.isVisible = false;
    }
  }

  constructor(private firestore: AngularFirestore, private eRef: ElementRef, private router: Router) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.firestore.collection('users').snapshotChanges().subscribe(data => {
      this.users = data.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as User
      });

      this.filtered = this.users;
    });
    
  }

  onType(event: any) {
    this.isVisible = true;

    this.searchKey = event.target.value;

    this.filtered = this.users.filter(item => {
      return item.userType == "Professional" && item.displayName.toLowerCase().includes(this.searchKey.toLowerCase());
    })
    // console.log(this.filtered);
  }

  onFocusOut() {
    // console.log("Focus out");
    
    this.isVisible = false;
  }

  onItemClick(displayName: string) {
    // console.log("Clicked", displayName);
    
    this.value = displayName;
    this.isVisible = false;
  }

  onSearchClick(){
    // Update url and pass parameter USER ID as value

    // console.log(this.value);

    const userID = this.users.filter(user => user.displayName.toLowerCase().includes(this.value.toLowerCase()));
    console.log(userID)

    this.router.navigate([`DynamicUser/${userID[0].uid}`]);
  }
}
