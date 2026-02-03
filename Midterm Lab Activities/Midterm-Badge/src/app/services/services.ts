import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../data';
import { TruncatePipe } from '../truncate-pipe';
import { BehaviorSubject, combineLatest, Observable, map } from 'rxjs';
import { Post } from '../post';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit {

  private search$ = new BehaviorSubject<string>('');
  posts$!: Observable<Post[]>;

  constructor(private data: Data) {}

  ngOnInit() {
    this.posts$ = combineLatest([
      this.data.getPosts(),
      this.search$
    ]).pipe(
      map(([posts, search]) =>
        posts.filter(p =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.body.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }

  onSearch(value: string) {
    this.search$.next(value);
  }
}
