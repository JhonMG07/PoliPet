import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { AdoptionsService } from '../services/adoptions.service';
import { CreateAdoptionDto, UpdateAdoptionDto } from '../dto/adoption.dto';
import { Adoption } from '../entities/adoption.entity';

@Controller('adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Get()
  findAll(): Promise<Adoption[]> {
    return this.adoptionsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseUUIDPipe) userId: string): Promise<Adoption[]> {
    return this.adoptionsService.findByUser(userId);
  }

  @Get('shelter/:shelterId')
  findByShelter(@Param('shelterId', ParseUUIDPipe) shelterId: string): Promise<Adoption[]> {
    return this.adoptionsService.findByShelter(shelterId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Adoption> {
    return this.adoptionsService.findOne(id);
  }

  @Post(':userId')
  create(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() createAdoptionDto: CreateAdoptionDto,
  ): Promise<Adoption> {
    return this.adoptionsService.create(userId, createAdoptionDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAdoptionDto: UpdateAdoptionDto,
  ): Promise<Adoption> {
    return this.adoptionsService.update(id, updateAdoptionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.adoptionsService.remove(id);
  }
}
