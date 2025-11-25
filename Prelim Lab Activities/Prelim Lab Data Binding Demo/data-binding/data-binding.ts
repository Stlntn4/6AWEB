import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.css',
})
export class DataBinding {
  title='Hello there';
  imageURL = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fcute%2520cat%2F&psig=AOvVaw0-rv1o_eKKzLYy9Dp_tN3-&ust=1764116025914000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLj538iCjJEDFQAAAAAdAAAAABAL";
  w = 100;
  h = 100;
  message = 'Data Binding Demonstration';
  description = 'Cute Cat';
  textColor="Blue";
  isHighlighted=true;

  yourName='';

  count = 0;
  increment(){
    this.count++;
  }
  decrement(){
    this.count--;
  }
}
