import { Module } from '@nestjs/common';
import { InstallmentsService } from './installments.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [InstallmentsService],
})
export class InstallmentsModule {}
