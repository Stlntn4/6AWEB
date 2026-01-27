import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user.model';

interface Car {
  id: number;
  model: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit {
  users: User[] = [];

  // 🔹 Hardcoded top 5 cars
  cars: Car[] = [
    { id: 1, model: 'Tesla Model S', description: 'Electric luxury sedan with autopilot and 396 mi range.' },
    { id: 2, model: 'Ford Mustang GT', description: 'Iconic American muscle car with 450 hp V8 engine.' },
    { id: 3, model: 'BMW M3', description: 'High-performance sports sedan with precision handling.' },
    { id: 4, model: 'Porsche 911 Carrera', description: 'Legendary sports car with rear-engine layout and sharp dynamics.' },
    { id: 5, model: 'Lamborghini Huracán', description: 'Exotic supercar with V10 engine and breathtaking acceleration.' },
  ];

  ngOnInit(): void {
    // If you still want cached users
    const cachedUsers = localStorage.getItem('users');
    if (cachedUsers) {
      this.users = JSON.parse(cachedUsers);
    }
  }
}
