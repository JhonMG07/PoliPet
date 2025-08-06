import { IsUUID, IsEnum, IsString, IsOptional } from 'class-validator';

export class CreateAdoptionDto {
  @IsUUID()
  petId: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  reason?: string;
}

export class UpdateAdoptionDto {
  @IsEnum(['pending', 'approved', 'rejected', 'completed', 'cancelled'])
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';

  @IsString()
  @IsOptional()
  notes?: string;
}
