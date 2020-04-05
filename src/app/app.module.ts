import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule, MatListModule, MatPaginatorModule, MatSelectModule, MatTableModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import { GroupListsComponent } from './groups/group-lists/group-lists.component';
import { GroupNamesComponent } from './groups/group-names/group-names.component';
import { UsersForGroupComponent } from './groups/users-for-group/users-for-group.component';
import {MatRippleModule} from '@angular/material';
import { ScheduleComponent } from './schedule/schedule.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScheduleItemComponent } from './schedule/schedule-item/schedule-item.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {path: '', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sections', component: GroupsComponent},
  {path: 'sections/:section', component: GroupListsComponent, pathMatch: 'full'},
  {path: 'sections/:section/groups/:groupName', component: GroupNamesComponent, pathMatch: 'full'},
  {path: 'sections/:section/groups/:groupName/course/:courseName', component: UsersForGroupComponent, pathMatch: 'full'},
  {path: 'schedule', component: ScheduleComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    GroupListsComponent,
    GroupNamesComponent,
    UsersForGroupComponent,
    ScheduleComponent,
    ScheduleItemComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    RouterModule.forRoot(routes),
    MatRippleModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
