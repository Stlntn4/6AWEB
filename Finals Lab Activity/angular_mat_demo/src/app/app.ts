import { Component } from '@angular/core';
import { ProfileFormComponent } from './profile-form/profile-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileFormComponent],
  templateUrl: './app.html'
})
export class App {
  title = 'angular_mat_demo';
}