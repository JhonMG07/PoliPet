// pets-service/src/services/pets.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from '../entities/pet.entity';
import { CreatePetDto, UpdatePetDto } from '../dto/pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async findAll(): Promise<Pet[]> {
    // Eliminamos la relación
    return this.petRepository.find();
  }

  async findOne(id: string): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id },
      // Eliminamos la relación
    });
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
    return pet;
  }
  
  // ... (el método create se queda igual)

  async findByShelter(shelterId: string): Promise<Pet[]> {
    return this.petRepository.find({
      where: { shelterId },
      // Eliminamos la relación
    });
  }

  async findAvailable(): Promise<Pet[]> {
    return this.petRepository.find({
      where: { isAvailable: true },
      // Eliminamos la relación
    });
  }
  
  // ... (los métodos update y remove se quedan igual)
  async create(shelterId: string, createPetDto: CreatePetDto): Promise<Pet> {
    const pet = this.petRepository.create({
      ...createPetDto,
      shelterId,
    });
    return await this.petRepository.save(pet);
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOne(id);
    Object.assign(pet, updatePetDto);
    return await this.petRepository.save(pet);
  }

  async remove(id: string): Promise<void> {
    const pet = await this.findOne(id);
    await this.petRepository.remove(pet);
  }
}