import { Component, OnInit,} from '@angular/core';
// import { UserService } from "../BackendConfig/user.service";
// import { NgForm } from '@angular/forms';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { ToastrService } from 'ngx-toastr';
import { AuthService } from "../BackendConfig/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    // private users : UserService,
    // private firestore : AngularFirestore,
    // private toastr : ToastrService,
    public authService: AuthService
    ) { }

  ngOnInit() {
  }

// resetForm(form ?: NgForm){
//   if(form!=null)
//     form.resetForm();
//     this.users.userData= {
//       id : null ,
//       firstName : '',
//       lastName : '' ,
//       email : '',
//       contact : '',
//       password : '',
//       userType : '',
//       eType : '' ,
//       description : '' ,
//       displayPic : '',
//       district : ''
//   }
// }

// //Data sending to firestore
// onSubmit(form : NgForm){ 
//   let data=form.value ;

  
//   if (form.value.password == form.value.rePassword){
//     console.log("sucess");
//     this.firestore.collection('Users').add(data);
//     this.toastr.success('User Added Sucessfully', 'Jamboree.NewUser');
//   }
//   else {
//     console.log("Failed");
//     this.toastr.error('Passwords not matching', 'Jamboree.NewUser');
//   }

//   this.resetForm(form);
// }


  // resetForm(form? : NgForm){
  //   if(form!= null)
  //   form.resetForm();
  //   this.service.formData = {
  //     FirstName : '' ,
  //     LastName : '' ,
  //     Email : '' ,
  //     Password : '' ,
  //     RePassword : '', 
  //     Contact : '',
  //     UserType : ''
  //   }
  // }

  // onSubmit(form:NgForm){
  //   let data=form.value ;
  //   console.log("print :)))");

  //   if (form.value.Password == form.value.RePassword){

  //       console.log("sucess");
  //       this.firestore.collection('Users').add(data);

  //       this.toastr.success('User Added Sucessfully', 'Jamboree.NewUser');
  //   }
    
  //   else {
  //     console.log("Failed");
  //     this.toastr.error('Passwords not matching', 'Jamboree.NewUser');
  //   }
  //   this.resetForm(form);
  // }
}
