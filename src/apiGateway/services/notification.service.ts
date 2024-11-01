import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatDate } from 'date-fns';
import { Address } from 'nodemailer/lib/mailer';
import { Repository } from 'typeorm';
import { Notification } from '../models/notification.entity';

/**
 *
 */
@Injectable()
export class NotificationService {
  /**/
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(Notification, 'api_gateway')
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  /**
   *
   */
  private readonly logger = new Logger(NotificationService.name);

  /**
   *
   * Envia una notificación
   * @param sendMail
   * @returns
   */
  async sendNotification(sendMail: ISendMailOptions) {
    try {
      sendMail.context = {
        user: 'Rolando Casigña Parra',
        url: 'http://localhost:3000',
        date: formatDate(new Date(), 'dd-MM-yyyy HH:mm:ss'),
      };
      //
      const sendedMail = await this.mailerService.sendMail(sendMail);
      const recivers = listEmailsToString(sendMail.to);
      //
      await this.notificationRepository.insert({
        recivers,
        subject: sendMail.subject,
        messageTemplate: sendMail.template as string,
      });
      //
      this.logger.log(`Notificación enviada ${sendedMail.messageId}`);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Obtiene una notificación por id
   * @param id
   * @returns
   */
  async getNotification(id: string): Promise<Notification> {
    try {
      return await this.notificationRepository.findOneBy({ id });
    } catch (e) {
      throw e;
    }
  }
}

const listEmailsToString = (emails: string | Address | (string | Address)[]): string => {
  let finalEmail = '';
  if (Array.isArray(emails)) {
    finalEmail = emails.join(';');
  } else if (typeof emails === 'string') {
    finalEmail = emails;
  }
  return finalEmail;
};
