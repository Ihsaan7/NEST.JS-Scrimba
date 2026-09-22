import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {

      private products = [
        { id: 1, title: "Wireless Mouse", price: 29.99 },
        { id: 2, title: "Mechanical Keyboard", price: 89.99 },
        { id: 3, title: "USB-C Hub", price: 49.99 },
    ];

    findAll(){
        return {
            success: true,
            count:this.products.length,
            data:this.products
        }
    }

    findOne(id: string)
    {
        const productId = parseInt(id , 10)
        const product = this.products.find(p=> p.id === productId)

        if(!product){ throw new NotFoundException("No product found")}
        return{
            success: true,
            data: product
        }
    }


    create(body:{title:string; price:number})
    {
        if(!body.title || body.price === undefined)
            {
                throw new BadRequestException("Both fields requied!")
            }
        const newProduct=
        {
            id: this.products.length + 1,
            title: body.title,
            price: body.price
        }

        this.products.push(newProduct)
        return {
            success: true,
            message:"Product created",
            data: newProduct
        }
    }

    update(id:string, body:{title?: string , price?:number})
    {
        const productId = parseInt(id , 10)
        
    }
}
