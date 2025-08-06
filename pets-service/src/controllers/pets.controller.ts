import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, Patch, UseGuards} from '@nestjs/common';
import { PetsService } from '../services/pets.service';
import { CreatePetDto, UpdatePetDto } from '../dto/pet.dto';
import { Pet } from '../entities/pet.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Importa el guardia

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  findAll(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Get('available')
  findAvailable(): Promise<Pet[]> {
    return this.petsService.findAvailable();
  }

  @Get('shelter/:shelterId')
  findByShelter(@Param('shelterId', ParseUUIDPipe) shelterId: string): Promise<Pet[]> {
    return this.petsService.findByShelter(shelterId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Pet> {
    return this.petsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post(':shelterId')
  create(
    @Param('shelterId', ParseUUIDPipe) shelterId: string,
    @Body() createPetDto: CreatePetDto,
  ): Promise<Pet> {
    return this.petsService.create(shelterId, createPetDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<Pet> {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.petsService.remove(id);
  }
  
  @Patch(':id/unavailable')
  setAsUnavailable(@Param('id', ParseUUIDPipe) id: string): Promise<Pet> {
    return this.petsService.update(id, { isAvailable: false });
  }
}
