import { BadRequestException, Controller , Get , NotFoundException, Param, Post , Body , Put , Delete} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('products')
export class ProductsController {
    constructor(private readonly productServices : ProductsService ){}

    // GET /products
    @Get()
    findAll()
    {
        return this.productServices.findAll();
    }
   
    // GET /products/:id
    @Get(':id')
    findOne(@Param('id') id:string)
    {
        return this.productServices.findOne(id)
    }


    // POST '/products'
    @Post()
    create(@Body() body: CreateProductDto)
    {
        return this.productServices.create(body)
    }

    // PUT '/products/:id'
    @Put(':id')
    update(
        @Param('id')id:string,
        @Body() body: UpdateProductDto)
    {
    
        return this.productServices.update(id , body)
    }




    // DELETE '/products/:id'
    @Delete(':id')
    remove(@Param('id') id: string)
    {
        return this.productServices.remove(id)
    }
}
