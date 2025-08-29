import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({ example: 'Banano MEI' })
  name: string;

  @ApiProperty({ example: 'banano-mei' })
  slug: string;
}
