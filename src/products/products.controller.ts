import { BadRequestException, Controller , Get , NotFoundException, Param, Post , Body , Put , Delete} from '@nestjs/common';

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
