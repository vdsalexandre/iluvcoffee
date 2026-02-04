import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entity/coffee/coffee';
import { CoffeeCreateDto } from './dto/coffee-create.dto/coffee-create.dto';
import { CoffeeUpdateDto } from './dto/coffee-update.dto/coffee-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>
    ) {}

    findAll(): Promise<Coffee[]> {
        return this.coffeeRepository.find();
    }

    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOne({ where: { id: +id } });

        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    create(coffee: CoffeeCreateDto) {
        const newCoffee = this.coffeeRepository.create(coffee);
        return this.coffeeRepository.save(newCoffee);
    }

    async update(id: string, coffee: CoffeeUpdateDto) {
        const updateCoffee = await this.coffeeRepository.preload({
            id: +id,
            ...coffee
        });

        if (!updateCoffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(updateCoffee);
    }

    async delete(id: string) {
        const deleteCoffee = await this.findOne(id);
        return this.coffeeRepository.remove(deleteCoffee);
    }
}
