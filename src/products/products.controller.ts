import { BadRequestException, Controller , Get , NotFoundException, Param, Post , Body , Put , Delete, UseGuards} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../common/guards/auth.guard';

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
    @UseGuards(new RolesGuard('admin'))
    create(@Body() body: CreateProductDto)
    {
        return this.productServices.create(body)
    }

    // PUT '/products/:id'
    @Put(':id')
    @UseGuards(new RolesGuard('admin'))
    update(
        @Param('id')id:string,
        @Body() body: UpdateProductDto)
    {
    
        return this.productServices.update(id , body)
    }


    // DELETE '/products/:id'
    @Delete(':id')
    @UseGuards(new RolesGuard('admin'))
    remove(@Param('id') id: string)
    {
        return this.productServices.remove(id)
    }
}
