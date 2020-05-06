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

  public loginUser(username, password): Observable<any> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/user/login`, {username: username, password: password});
  }

  public registerUser(username, password): Observable<any> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/user/register`, {username: username, password: password});
  }

  public getUsers(data): Observable<any> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/user`, {search: data.search ? data.search : "", sort: data.sort ? data.sort : {}, filter: data.filter ? data.filter : {}}, {headers: {token: this.token}});
  }
}
