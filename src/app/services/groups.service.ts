import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse} from '../Interfaces/API_Response';
import {Hosts} from '../enums/hosts';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) {
  }


  getAllGroups(): Observable<APIResponse> {
    return this.http.get<any>(`${Hosts.API_HOST}/api/groups`);
  }

  getGroupsBySection(section): Observable<APIResponse> {
    return this.http.get<any>(`${Hosts.API_HOST}/api/groups/groupsListBySection/${section}`);
  }

  getUsersForGroup(groupName): Observable<APIResponse> {
    return this.http.post<any>((`${Hosts.API_HOST}/getUsersForGroup`), {params: {group: groupName}});
  }
}
