import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse} from '../Interfaces/API_Response';
import {Hosts} from '../enums/hosts';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}
  public getAllGroups(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${Hosts.API_HOST}/api/groups`, {headers: {token: this.token}});
  }

  public getGroupsBySection(section): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${Hosts.API_HOST}/api/groups/groupsListBySection/${section}`, {headers: {token: this.token}});
  }

  public getUsersForGroup(groupName): Observable<APIResponse> {
    return this.http.post<APIResponse>((`${Hosts.API_HOST}/api/user/getUsersForGroup`), {group: groupName}, {headers: {token: this.token}});
  }
}
