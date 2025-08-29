import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({ example: 'Banano MEI' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'banano-mei' })
  @IsNotEmpty()
  slug: string;
}
