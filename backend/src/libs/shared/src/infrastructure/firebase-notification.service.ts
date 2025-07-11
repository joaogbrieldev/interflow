import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import {
  BatchResponse,
  MulticastMessage,
} from 'firebase-admin/lib/messaging/messaging-api';

export interface NotificationMessage {
  title: string;
  body: string;
  data?: Record<string, string>;
}

export class FirebaseNotificationService {
  private initialized = false;

  constructor(serviceAccount: ServiceAccount) {
    console.log('serviceAccount:', serviceAccount);
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      this.initialized = true;
    }
  }

  async sendNotificationToTokens(
    tokens: string[],
    message: NotificationMessage,
  ): Promise<BatchResponse> {
    if (!this.initialized) {
      throw new Error('Firebase app not initialized');
    }
    const multicastMessage: MulticastMessage = {
      tokens,
      notification: {
        title: message.title,
        body: message.body,
      },
      data: message.data || {},
    };
    return await admin.messaging().sendEachForMulticast(multicastMessage);
  }
}
