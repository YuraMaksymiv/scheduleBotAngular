import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse} from '../Interfaces/API_Response';
import {Hosts} from '../enums/hosts';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  public getUsers(data): Observable<any> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/user`, data, {headers: {token: localStorage.getItem('token')}});
  }

  public changeType(userId, type): Observable<any> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/user/type/${userId}/${type}`, {}, {headers: {token: localStorage.getItem('token')}});
  }
}
