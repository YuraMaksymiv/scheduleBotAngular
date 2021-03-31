import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatAutocompleteModule,
    MatButtonModule, MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatSelectModule, MatSortModule,
    MatTableModule
} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {GroupListsComponent} from './groups/group-lists/group-lists.component';
import {GroupNamesComponent} from './groups/group-names/group-names.component';
import {UsersForGroupComponent} from './groups/users-for-group/users-for-group.component';
import {MatRippleModule} from '@angular/material';
import {ScheduleComponent} from './schedule/schedule.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScheduleItemComponent} from './schedule/schedule-item/schedule-item.component';
import {LoginComponent} from './login/login.component';
import {MenuComponent} from './menu/menu.component';
import {TokenGuard} from './guards/token.guard';
import {GroupsService} from './services/groups.service';
import {ParamInterceptor} from './api.interceptor';
import {LoginGuard} from './guards/login.guard';
import {ScheduleService} from './services/schedule.service';
import {ImportComponent} from './import/import.component';
import {UsersComponent} from './users/users.component';
import {AboutComponent} from './about/about.component';
import {UserService} from './services/user.service';
import {MatMenuModule} from '@angular/material/typings/esm5/menu';
import { NotificationComponent } from './notification/notification.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:2337', options: {} };


const routes: Routes = [
  {path: '', component: MenuComponent, canActivate: [TokenGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'sections', component: GroupsComponent, canActivate: [TokenGuard]},
  {path: 'sections/:section', component: GroupListsComponent, pathMatch: 'full', canActivate: [TokenGuard]},
  {path: 'sections/:section/groups/:groupName', component: GroupNamesComponent, pathMatch: 'full', canActivate: [TokenGuard]},
  {path: 'sections/:section/groups/:groupName/course/:courseName', component: UsersForGroupComponent, pathMatch: 'full', canActivate: [TokenGuard]},
  {path: 'schedule', component: ScheduleComponent, canActivate: [TokenGuard]},
  {path: 'import', component: ImportComponent, canActivate: [TokenGuard]},
  {path: 'users', component: UsersComponent, canActivate: [TokenGuard]},
  {path: 'notifications', component: NotificationComponent, canActivate: [TokenGuard]},
  {path: 'about', component: AboutComponent, canActivate: [TokenGuard]},
  {path: 'sandbox', component: SandboxComponent, canActivate: [TokenGuard]}
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
    ImportComponent,
    UsersComponent,
    AboutComponent,
    NotificationComponent,
    SandboxComponent
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
        MatProgressSpinnerModule,
        MatSortModule,
        MatMenuModule,
        MatExpansionModule,
        MatAutocompleteModule,
        SocketIoModule.forRoot(config),
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
    },
    UserService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
