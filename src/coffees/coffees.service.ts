import { Injectable } from '@nestjs/common';
import { Coffee } from './entity/coffee/coffee';
import { CoffeeCreateDto } from './dto/coffee-create.dto/coffee-create.dto';
import { CoffeeUpdateDto } from './dto/coffee-update.dto/coffee-update.dto';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [];

    findAll(): Coffee[] {
        return this.coffees;
    }

    findOne(id: string): Coffee | undefined {
        return this.coffees.find(coffee => coffee.id === +id);
    }

    create(coffee: CoffeeCreateDto): void {
        const newCoffee: Coffee = {
            id: this.coffees.length + 1,
            name: coffee.name,
            brand: coffee.brand,
            flavors: coffee.flavors
        }
        this.coffees.push(newCoffee);
    }

    update(id: string, coffee: CoffeeUpdateDto): void {
        const coffeeToUpdate = this.findOne(id);

        if (coffeeToUpdate) {
            const index = this.coffees.findIndex(coffee => coffee.id === +id);
            const newCoffee: Coffee = {
                id: coffeeToUpdate.id,
                name: coffee.name === undefined ? coffeeToUpdate.name : coffee.name,
                brand: coffee.brand === undefined ? coffeeToUpdate.brand : coffee.brand,
                flavors: coffee.flavors === undefined ? coffeeToUpdate.flavors : coffee.flavors
            }
            this.coffees[index] = newCoffee;
        }
    }

    delete(id: string): void {
        const index = this.coffees.findIndex(coffee => coffee.id === +id);

        if (index) {
            this.coffees.splice(index, 1);
        }
    }
}
