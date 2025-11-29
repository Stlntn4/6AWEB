import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './data-binding.html',
  styleUrls: ['./data-binding.css'],
})
export class DataBinding {
  title = 'Hello there';
  imageURL = "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg"; // Direct image
  w = 100;
  h = 100;
  message = 'Data Binding Demonstration';
  description = 'Cute Cat';
  textColor = "blue";
  isHighlighted = true;

  yourName = '';

  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
