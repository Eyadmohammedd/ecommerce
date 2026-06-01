import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor() {}

  list() {
    return [
      { id: 1, name: 'iphone 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
      { id: 3, name: 'Product 3', price: 300 },
    ];
  }
}
