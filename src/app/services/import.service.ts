import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse} from '../Interfaces/API_Response';
import {Hosts} from '../enums/hosts';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  public importSchedule(file, section): Observable<APIResponse> {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/import/schedule`, uploadData, {headers: {token: localStorage.getItem('token')}, params: {section: section}});
  }

}
