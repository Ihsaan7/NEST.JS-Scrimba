import { BadRequestException, Controller , Get , NotFoundException, Param, Post , Body} from '@nestjs/common';

@Controller('products')
export class ProductsController {
   private products = [
        { id: 1, title: "Wireless Mouse", price: 29.99 },
        { id: 2, title: "Mechanical Keyboard", price: 89.99 },
        { id: 3, title: "USB-C Hub", price: 49.99 },
    ];

    // GET '/products'
    @Get()
    findAll()
    {
        return{
            success: true,
            count:this.products.length,
            data:this.products
        }
    }

    // GET '/products/:id'
    @Get(':id')
    findOne(@Param('id') id:string)
    {
        const productId = parseInt(id, 10)
        const product = this.products.find((p => p.id === productId))

        if(!product){
            throw new NotFoundException(`Product with ID ${id} not found!`)
        }

        return{
            success: true,
            data: product
        }
    }

    // POST '/products'
    @Post()
    create(@Body() body: {title: string; price: number})
    {
        if(!body.title || body.price === undefined)
            {
                throw new BadRequestException('Title and Price are required!')
            }
        const newProduct=
        {
            id: this.products.length + 1,
            title: body.title,
            price: body.price
        }

        this.products.push(newProduct)
        return{
            success:true,
            message:"Product created successfully",
            data: newProduct
        }
    }

    // PUT '/products/:id'
    @Put()
}
