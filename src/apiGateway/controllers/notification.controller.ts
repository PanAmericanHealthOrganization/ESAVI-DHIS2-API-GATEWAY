import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';

/**
 *
 */
@ApiTags('Notifications')
@Controller({ path: 'notification', version: '1' })
export class NotificationController {
  /**
   *
   * @param emailService
   */
  constructor(private readonly emailService: NotificationService) {}
  /**
   *
   * @returns
   */
  @Get('/test')
  async testNotification() {
    await this.emailService.sendNotification({
      from: '4sQpX@example.com',
      to: '4sQpX@example.com',
      subject: 'Prueba de notificación',
      template: './meddraNewVersion',
    });
  }
  /**
   *
   * @param id
   * @returns
   */
  @Get('/:id')
  async getNotification(@Param('id') id: string) {
    return this.emailService.getNotification(id);
  }
}
