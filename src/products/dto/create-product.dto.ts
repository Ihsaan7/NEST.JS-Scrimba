import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsBoolean } from 'class-validator';


export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    title:string

    @IsNumber()
    @Min(0)
    price: number

    @IsOptional()
    @IsBoolean()
    inStock?: boolean
}