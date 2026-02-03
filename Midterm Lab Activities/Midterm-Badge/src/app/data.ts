import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class Data {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  private posts$!: Observable<Post[]>;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    if (!this.posts$) {
      this.posts$ = this.http.get<Post[]>(this.url).pipe(
        shareReplay(1) // cache the API result
      );
    }
    return this.posts$;
  }
}
