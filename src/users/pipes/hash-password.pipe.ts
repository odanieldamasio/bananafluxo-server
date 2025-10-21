import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private readonly configService: ConfigService) {}

   async transform(password: string) {
    const salt = Number(this.configService.get('SALT_PASSWORD'));

    const passwordHash = await bcrypt.hash(password, salt);

    return passwordHash;
  }
}
