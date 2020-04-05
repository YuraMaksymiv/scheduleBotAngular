import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse} from '../Interfaces/API_Response';
import {Hosts} from '../enums/hosts';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) {
  }


  getSchedule(name): Observable<APIResponse> {
    return this.http.get<any>(`${Hosts.API_HOST}/api/schedule?name=${name}`);
  }

  updateSchedule(schedule): Observable<APIResponse> {
    return this.http.post<any>(`${Hosts.API_HOST}/api/schedule`, {group: schedule.groupName, schedule: schedule});
  }
}
