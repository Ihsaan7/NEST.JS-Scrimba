import { BadRequestException, Controller , Get , NotFoundException, Param, Post , Body , Put , Delete} from '@nestjs/common';
import { ProductsService } from './products.service.js';

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
        const productId = parseInt(id , 10)
        if(isNaN(productId)){ throw new BadRequestException("Invalid ID formate")}
        return this.productServices.findOne(id)
    }


    // POST '/products'
    @Post()
    create(@Body() body:{title: string , price: number})
    {
        if(!body.title || body.price === undefined){ throw new BadRequestException("Title and price required!")}
        return this.productServices.create(body)
    }

    // PUT '/products/:id'
    @Put(':id')
    update(
        @Param('id')id:string,
        @Body() body: {title?: string , price?: number}
    )
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
