// adoptions-service/src/services/adoptions.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Adoption } from '../entities/adoption.entity';
import { CreateAdoptionDto, UpdateAdoptionDto } from '../dto/adoption.dto';

@Injectable()
export class AdoptionsService {
  private petsServiceUrl = 'http://localhost:8000/api/pets';

  constructor(
    @InjectRepository(Adoption)
    private readonly adoptionRepository: Repository<Adoption>,
    private readonly httpService: HttpService,
  ) {}

  async create(userId: string, createAdoptionDto: CreateAdoptionDto): Promise<Adoption> {
    try {
      const petResponse = await firstValueFrom(
        this.httpService.get(`${this.petsServiceUrl}/${createAdoptionDto.petId}`)
      );
      const pet = petResponse.data;

      if (!pet.isAvailable) {
        throw new Error('La mascota no está disponible para adopción.');
      }

      const adoption = this.adoptionRepository.create({
        ...createAdoptionDto,
        userId,
        shelterId: pet.shelterId,
        status: 'pending',
      });

      return await this.adoptionRepository.save(adoption);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al comunicarse con el servicio de mascotas o al crear la adopción.');
    }
  }

  async update(id: string, updateAdoptionDto: UpdateAdoptionDto): Promise<Adoption> {
    const adoption = await this.findOne(id);
    const originalStatus = adoption.status;
    Object.assign(adoption, updateAdoptionDto);

    // --- INICIO DE LA SAGA ---
    if (updateAdoptionDto.status === 'completed' && originalStatus !== 'completed') {
      try {
        // Evento: Notificar al servicio de mascotas para que actualice la disponibilidad
        await firstValueFrom(
          this.httpService.patch(`${this.petsServiceUrl}/${adoption.petId}/unavailable`, {})
        );
      } catch (error) {
        // Transacción de Compensación: Si la llamada falla, se revierte la operación.
        console.error('Fallo la saga, no se pudo actualizar la mascota:', error.message);
        throw new InternalServerErrorException('No se pudo actualizar el estado de la mascota. El estado de la adopción no fue modificado.');
      }
    }

    return await this.adoptionRepository.save(adoption);
  }
  
  // --- Otros métodos (findAll, findOne, etc.) ---
  findAll(): Promise<Adoption[]> {
    return this.adoptionRepository.find();
  }

  async findOne(id: string): Promise<Adoption> {
    const adoption = await this.adoptionRepository.findOne({ where: { id } });
    if (!adoption) {
      throw new NotFoundException(`Adopción con ID ${id} no encontrada`);
    }
    return adoption;
  }
  
  async remove(id: string): Promise<void> {
    await this.adoptionRepository.delete(id);
  }

  findByUser(userId: string): Promise<Adoption[]> {
    return this.adoptionRepository.find({ where: { userId } });
  }

  findByShelter(shelterId: string): Promise<Adoption[]> {
    return this.adoptionRepository.find({ where: { shelterId } });
  }
}