import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../_model/index';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    return this.httpClient.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  getFakeDataForTesting(): Observable<any> {
    return this.httpClient.get('https://api.myjson.com/bins/zg8of');
  }



}
