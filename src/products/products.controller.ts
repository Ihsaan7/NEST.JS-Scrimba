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
        return this.productServices.findOne(id)
    }


    // POST '/products'
    @Post()
    create(@Body() body:{title: string , price: number})
    {
        return this.productServices.create(body)
    }

    // PUT '/products/:id'
    @Put(':id')
    update(
        @Param('id') id:string,
        @Body() body: { title?: string; price?: number}
    )
    {
        const productId = parseInt(id , 10)
        const product = this.products.find(p=> p.id === productId)

        if(!product){ throw new NotFoundException(`Product with ID ${id} not found!`)}
        
        if(body.title !== undefined) product.title = body.title;
        if(body.price !== undefined) product.price = body.price;

        return{
            success: true,
            message: `Product ${id} updated succesfully`,
            data: product
        }


    }

    // DELETE '/products/:id'
    @Delete(':id')
    remove(@Param('id') id :string)
    {
        const productId = parseInt(id , 10);
        const index = this.products.findIndex(p => p.id === productId)
        
        if(index === -1){ throw new NotFoundException(`Product with ${id} not found!`)}

        const deleted = this.products.splice(index , 1)[0]

        return{
            success: true,
            message:"Product deleted succesfully",
            data: deleted
        }
    }
}
