import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../data';
import { TruncatePipe } from '../truncate-pipe';
import { Observable, map } from 'rxjs';
import { Post } from '../post';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  // Declare first
  latest$!: Observable<Post[]>;

  constructor(private data: Data) {}

  ngOnInit() {
    // Use data AFTER it is initialized
    this.latest$ = this.data.getPosts().pipe(
      map(posts => posts.slice(0, 5))
    );
  }
}
