import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class Httpclient {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsersRemotely(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // ✅ Challenge requirement: limit to 5 users
  getFiveUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?_limit=5`);
  }
}
