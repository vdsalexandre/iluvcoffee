import { PartialType } from "@nestjs/mapped-types";
import { CoffeeCreateDto } from "../coffee-create.dto/coffee-create.dto";

export class CoffeeUpdateDto extends PartialType(CoffeeCreateDto) {}
