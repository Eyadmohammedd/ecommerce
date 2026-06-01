import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  list() {
    const data = this.productService.list();
    return { message: 'Done', data };
  }
}
