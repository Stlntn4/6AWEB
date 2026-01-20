import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Products {

  getProducts() {
    return [
      {
        productId: 'P-101',
        productName: 'Logitech Mouse',
        description: '6 Button Mechanical Mouse',
        price: 899.00
      },
      {
        productId: 'P-102',
        productName: 'JBL BT Speaker',
        description: 'Waterproof Radio 360 Surround',
        price: 1099.00
      },
      {
        productId: 'P-103',
        productName: 'Mechanical Keyboard',
        description: 'Hot-swappable RGB Backlit',
        price: 2395.00
      },
      {
        productId: 'P-104',
        productName: 'Oculus Meta',
        description: 'All-in-one Gaming Headset',
        price: 22450.00
      }
    ];
  }
}
