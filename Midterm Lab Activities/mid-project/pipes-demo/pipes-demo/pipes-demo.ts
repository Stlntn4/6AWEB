import { Component } from '@angular/core';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  LowerCasePipe,
  SlicePipe,
  UpperCasePipe,
  PercentPipe,
  KeyValuePipe,
  TitleCasePipe,
  NgFor
} from '@angular/common';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pipes-demo',
  standalone: true,
  imports: [
    DatePipe,
    UpperCasePipe,
    LowerCasePipe,
    CurrencyPipe,
    SlicePipe,
    AsyncPipe,
    DecimalPipe,
    PercentPipe,
    KeyValuePipe,
    TitleCasePipe,
    NgFor
  ],
  templateUrl: './pipes-demo.html',
  styleUrl: './pipes-demo.css',
})
export class PipesDemo {

  presentDate = new Date();
  price = 20000;

  // AsyncPipe
  time$ = interval(1000).pipe(
    map(() => new Date())
  );

  Fruits = ['Apple', 'Orange', 'Grapes', 'Mango', 'Kiwi', 'Pomegranate'];

  // DecimalPipe
  decimalNum1: number = 8.7589623;
  decimalNum2: number = 5.43;

  // PercentPipe
  completionRate: number = 0.875;

  // TitleCasePipe
  titleText: string = 'angular pipes demo application';

  // KeyValuePipe
  student = {
    Name: 'Sherene',
    Age: 21,
    Course: 'BSIT',
    Status: 'Active'
  };
}
