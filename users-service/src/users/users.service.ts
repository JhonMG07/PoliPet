// users-service/src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log('--- Iniciando creación de usuario ---');
    console.log('Datos recibidos:', createUserDto);

    const salt = await bcrypt.genSalt();
    console.log('1. Salt para bcrypt generado.');

    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    console.log('2. Contraseña hasheada correctamente.');

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    console.log('3. Entidad de TypeORM creada.');

    const savedUser = await this.userRepository.save(user);
    console.log('4. Usuario guardado en la base de datos.');

    console.log('--- Creación de usuario finalizada ---');
    return savedUser;
  }

  // ... (los otros métodos: findAll, findOne, update, remove)
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}