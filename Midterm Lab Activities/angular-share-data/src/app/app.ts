import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { Products } from './products';
import { CurrencyPipe, CommonModule } from '@angular/common'; // <-- import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CurrencyPipe], // <-- add here
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  protected readonly title = signal('angular-share-data');

  public employees: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  }[] = [];

  public products: {
    productId: string;
    productName: string;
    description: string;
    price: number;
  }[] = [];

  constructor(
    private employeeService: Employee,
    private productsService: Products
  ) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.products = this.productsService.getProducts();
  }
}
