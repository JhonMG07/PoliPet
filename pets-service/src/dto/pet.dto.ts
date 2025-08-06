import { IsString, IsEnum, IsBoolean, IsOptional, IsArray, IsUrl } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsEnum(['dog', 'cat', 'bird', 'rabbit', 'hamster', 'other'])
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';

  @IsString()
  breed: string;

  @IsEnum(['small', 'medium', 'large'])
  size: 'small' | 'medium' | 'large';

  @IsEnum(['puppy', 'young', 'adult', 'senior'])
  age: 'puppy' | 'young' | 'adult' | 'senior';

  @IsString()
  description: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  weight?: string;

  @IsString()
  @IsOptional()
  healthNotes?: string;

  @IsString()
  @IsOptional()
  behaviorNotes?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specialNeeds?: string[];

  @IsBoolean()
  @IsOptional()
  isVaccinated?: boolean;

  @IsBoolean()
  @IsOptional()
  isNeutered?: boolean;

  @IsBoolean()
  @IsOptional()
  isMicrochipped?: boolean;
}

export class UpdatePetDto implements Partial<CreatePetDto> {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(['dog', 'cat', 'bird', 'rabbit', 'hamster', 'other'])
  @IsOptional()
  type?: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';

  @IsString()
  @IsOptional()
  breed?: string;

  @IsEnum(['small', 'medium', 'large'])
  @IsOptional()
  size?: 'small' | 'medium' | 'large';

  @IsEnum(['puppy', 'young', 'adult', 'senior'])
  @IsOptional()
  age?: 'puppy' | 'young' | 'adult' | 'senior';

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  weight?: string;

  @IsString()
  @IsOptional()
  healthNotes?: string;

  @IsString()
  @IsOptional()
  behaviorNotes?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specialNeeds?: string[];

  @IsBoolean()
  @IsOptional()
  isVaccinated?: boolean;

  @IsBoolean()
  @IsOptional()
  isNeutered?: boolean;

  @IsBoolean()
  @IsOptional()
  isMicrochipped?: boolean;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
