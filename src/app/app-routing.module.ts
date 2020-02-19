import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
// import { SearchComponentComponent } from "../SharedComponents/SearchComponentComponent";

import { DisplayPageComponent } from "./Dynamic/display-page/display-page.component";
import { DisplayPageBarComponent } from "./Dynamic/display-page-bar/display-page-bar.component";

import { ProfileComponent } from './profile/profile.component';

//Admin panel - imports
    import { DashboardComponent } from './Admin/dashboard/dashboard.component'
    import { ProfileInsightsComponent } from './Admin/profile-insights/profile-insights.component'
    import { UserDataComponent } from './Admin/userdata/userdata.component';
    import { ExtrasComponent } from './Admin/extras/extras.component';
    import { LogComponent } from './Admin/log/log.component';

//User Panel - Imports
    import { UserProfileComponent } from "./User/user-profile/user-profile.component";
    import { EditUserComponent } from "./User/edit-user/edit-user.component";
    import { BookingHistoryComponent } from "./User/booking-history/booking-history.component";
    import { UserDeleteComponent } from './User/user-delete/user-delete.component';
    import { EventProfRequestComponent } from './User/event-prof-request/event-prof-request.component';

//event prof 
    import { ProfEditProfileComponent } from "./eventProf/prof-edit-profile/prof-edit-profile.component";
    import { ProfMainComponent } from "./eventProf/prof-main/prof-main.component";
    import { MessagingComponent } from './eventProf/messaging/messaging.component';
    import { BookingComponent    } from "./eventProf/booking/booking.component";

import { SearchResultComponent } from "./SharedComponents/search-result/search-result.component";
import { FilterPageComponent } from './Dynamic/filter-page/filter-page.component';
import { MessageComponent } from './User/message/message.component';
import { ViewComponent } from "./Dynamic/view/view.component";
import { FilterPageProComponent } from './Dynamic/filter-page-pro/filter-page-pro.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Signin', component: SigninComponent },
  { path: 'Signup', component: SignupComponent },
  { path: 'Profile', component: ProfileComponent },
  // { path: 'search',               component: SearchComponentComponent},

  { path: 'DynamicUser/:id', component: DisplayPageComponent },
  { path: 'FilterPage/:type' , component: FilterPageComponent},
  {path: 'View/:id'         , component: ViewComponent},
  { path: 'FilterPagePro/:type' , component: FilterPageProComponent},


  //Admin Panel
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile-insights', component: ProfileInsightsComponent },
      { path: 'user-data', component: UserDataComponent },
      { path: 'Extra', component: ExtrasComponent },
      { path: 'ActivityLog', component: LogComponent },
  

  //user
  { path: 'UserEditUser', component: EditUserComponent},
  { path: 'UserBooking', component: BookingHistoryComponent},
  { path: 'UserDelete' , component: UserDeleteComponent},
  { path: 'EventProfRequest', component: EventProfRequestComponent},
  { path: 'UserProfile', component: UserProfileComponent },
  { path: 'UserEditUser', component: EditUserComponent },
  //{ path: 'UserBooking',          component: BookingHistoryComponent },
  //{ path: 'UserDelete', component: UserDeleteComponent },
  { path: 'Message', component:MessageComponent },

  { path: 'EventMain',            component:ProfMainComponent},
  { path: 'EventEditProfile',     component:ProfEditProfileComponent},
  { path: 'Messaging',            component:MessagingComponent},
  { path:  'Booking',             component:BookingComponent},
  { path: 'EventMain', component: ProfMainComponent },
  { path: 'EventEditProfile', component: ProfEditProfileComponent },
  {path: 'SearchResult/:id', component: SearchResultComponent}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
