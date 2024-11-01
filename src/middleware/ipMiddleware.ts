import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WhiteListCorsService } from 'src/apiGateway/services/whitelistcors.service';
/**
 *
 */
@Injectable()
export class IpFilterMiddleware implements NestMiddleware {
  /**
   *
   * @param whiteListCorsService
   */
  constructor(private readonly whiteListCorsService: WhiteListCorsService) {}
  /**
   *
   */
  private readonly logger = new Logger(IpFilterMiddleware.name);

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async use(req: Request, res: Response, next: NextFunction) {
    //
    const clientIp = req.ip;
    this.logger.debug(`Client IP: ${clientIp}`);
    const allowedIps = await this.whiteListCorsService.getWhitelist();
    //
    if (!allowedIps.includes(clientIp)) {
      this.logger.error(`IP: ${clientIp}, not allowed`);
      throw new UnauthorizedException(`IP: ${clientIp}, not allowed`);
    }
    //
    next();
  }
}
