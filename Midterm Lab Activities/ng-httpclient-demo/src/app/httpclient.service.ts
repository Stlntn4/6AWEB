import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { User } from './user.model';
import { Post } from './post.model';


@Injectable({
  providedIn: 'root'
})
export class HttpclientService {


  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';


  constructor(private http: HttpClient) { }


  // CACHED USERS
  getUsersRemotely(): Observable<User[]> {
    const cachedUsers = localStorage.getItem('users');


    if (cachedUsers) {
      return of(JSON.parse(cachedUsers));
    }


    return this.http.get<User[]>(this.usersUrl).pipe(
      tap(users => localStorage.setItem('users', JSON.stringify(users)))
    );
  }


  // 🔹 POSTS (only one method)
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }
}
