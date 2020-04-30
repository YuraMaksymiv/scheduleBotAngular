import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {MatCardModule} from '@angular/material';
import { GroupListsComponent } from './groups/group-lists/group-lists.component';
import { GroupNamesComponent } from './groups/group-names/group-names.component';
import { UsersForGroupComponent } from './groups/users-for-group/users-for-group.component';
import {MatRippleModule} from '@angular/material';
import { ScheduleComponent } from './schedule/schedule.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScheduleItemComponent } from './schedule/schedule-item/schedule-item.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import {TokenGuard} from './token.guard';
import {GroupsService} from './services/groups.service';
import {ParamInterceptor} from './api.interceptor';
import {LoginGuard} from './login.guard';
import {ScheduleService} from './services/schedule.service';
import { ImportComponent } from './import/import.component';

const routes: Routes = [
  {path: '', component: MenuComponent, canActivate: [TokenGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'sections', component: GroupsComponent, canActivate: [TokenGuard]},
  {path: 'sections/:section', component: GroupListsComponent, pathMatch: 'full', canActivate: [TokenGuard]},
  {path: 'sections/:section/groups/:groupName', component: GroupNamesComponent, pathMatch: 'full', canActivate: [TokenGuard]},
  {path: 'sections/:section/groups/:groupName/course/:courseName', component: UsersForGroupComponent, pathMatch: 'full', canActivate: [TokenGuard]},
  {path: 'schedule', component: ScheduleComponent, canActivate: [TokenGuard]},
  {path: 'import', component: ImportComponent, canActivate: [TokenGuard]}
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
    LoginComponent,
    MenuComponent,
    ImportComponent
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
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [TokenGuard,
    LoginGuard,
    GroupsService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    },
    ScheduleService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
