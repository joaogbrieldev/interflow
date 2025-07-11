import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseNotificationService } from '../firebase-notification.service';
import { FirebaseNotificationServiceProvider } from './firebase-notification.service.provider';

@Module({
  imports: [ConfigModule],
  providers: [FirebaseNotificationServiceProvider],
  exports: [FirebaseNotificationService],
})
export class FirebaseNotificationModule {}
