import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IEncrypter } from 'src/libs/shared/src/domain/contracts/infrastructure/services/encrypter.service';

@Injectable()
export class EncrypterAdapter implements IEncrypter {
  private readonly rounds: number = parseInt(process.env.SALT_OR_ROUNDS);

  async encrypt(text: string): Promise<string> {
    return await bcrypt.hash(text, this.rounds);
  }

  async theValuesMatch(
    proposedValue: string,
    hashedValue: string,
  ): Promise<boolean> {
    return await bcrypt.compare(proposedValue, hashedValue);
  }
}
