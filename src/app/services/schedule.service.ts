import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse} from '../Interfaces/API_Response';
import {Hosts} from '../enums/hosts';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}
  public getSchedule(name): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${Hosts.API_HOST}/api/schedule?name=${name}`, {headers: {token: localStorage.getItem('token')}});
  }

  public updateSchedule(schedule): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/schedule`, {schedule: schedule}, {headers: {token: localStorage.getItem('token')}});
  }
}
