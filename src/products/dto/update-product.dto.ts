import { IsString, IsOptional, IsNumber, Min, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateProduct{

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title?: string
    
    @IsNumber()
    @IsOptional()
    @Min(0)
    price?: number

    @IsOptional()
    @IsBoolean()
    inStock?: boolean
}