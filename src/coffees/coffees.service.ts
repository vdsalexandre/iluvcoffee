import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Shipwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla'],
        },
    ];

    findAll() {
        return this.coffees;
    }

    findOne(id: string) {
        const coffee = this.coffees.find(coffee => coffee.id === Number.parseInt(id));

        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    create(createCoffee: any) {
        this.coffees.push(createCoffee);
    }

    update(id: string, updateCoffee: any) {
        const coffeeToFind = this.findOne(id);

        if (coffeeToFind) {
            // update coffee
        }
    }

    remove(id: string) {
        const index = this.coffees.findIndex(coffee => coffee.id === +id);

        if (index >= 0) {
            this.coffees.splice(index, 1);
        }
    }
}
