import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse} from '../Interfaces/API_Response';
import {Hosts} from '../enums/hosts';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  public sendToUser(userId, text): Observable<any> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/notification/${userId}`, {notification: text}, {headers: {token: localStorage.getItem('token')}});
  }

  public sendToAll(text): Observable<any> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/notification/all`, {notification: text}, {headers: {token: localStorage.getItem('token')}});
  }

  public sendToSection(section, text): Observable<any> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/notification/section`, {notification: text, section: section}, {headers: {token: localStorage.getItem('token')}});
  }

  public sendToGroup(group, text): Observable<any> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/notification`, {notification: text, group: group}, {headers: {token: localStorage.getItem('token')}});
  }

  public sendToMonitors(section, text): Observable<any> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/notification/monitors`, {notification: text, section: section}, {headers: {token: localStorage.getItem('token')}});
  }

}
