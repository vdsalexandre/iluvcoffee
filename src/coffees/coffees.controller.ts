import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeeCreateDto } from './dto/coffee-create.dto/coffee-create.dto';
import { CoffeeUpdateDto } from './dto/coffee-update.dto/coffee-update.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

    @Get()
    findAll() {
        return this.coffeesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coffeesService.findOne(id);
    }

    @Post()
    create(@Body() coffee: CoffeeCreateDto) {
        return this.coffeesService.create(coffee);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() coffee: CoffeeUpdateDto) {
        return this.coffeesService.update(id, coffee);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.delete(id);
    }
}
