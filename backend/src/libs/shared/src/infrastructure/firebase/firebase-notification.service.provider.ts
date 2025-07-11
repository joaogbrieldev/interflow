// OPÇÃO 1: Correção usando Custom Provider (Recomendada)
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';
import { FirebaseNotificationService } from '../firebase-notification.service';

export const FirebaseNotificationServiceProvider: Provider = {
  provide: FirebaseNotificationService,
  useFactory: (configService: ConfigService) => {
    const projectId = configService.get<string>('FIREBASE_PROJECT_ID');
    const privateKey = configService.get<string>('FIREBASE_PRIVATE_KEY');
    const clientEmail = configService.get<string>('FIREBASE_CLIENT_EMAIL');

    console.log('projectId:', projectId);
    console.log(
      'privateKey:',
      privateKey ? privateKey.substring(0, 10) + '...' : privateKey,
    );
    console.log('clientEmail:', clientEmail);

    if (!projectId || !privateKey || !clientEmail) {
      throw new Error('Alguma variável de ambiente do Firebase está faltando!');
    }

    const firebaseConfig: ServiceAccount = {
      projectId,
      privateKey: privateKey.replace(/\\n/g, '\n'),
      clientEmail,
    };

    console.log('firebaseConfig:', firebaseConfig);

    return new FirebaseNotificationService(firebaseConfig);
  },
  inject: [ConfigService],
};
