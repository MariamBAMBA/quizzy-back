import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { DatabaseService } from 'src/app/database.service';

@Controller('ping')
export class PingController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async ping(@Res() res: Response) {
    const isDatabaseConnected = await this.databaseService.checkDatabaseConnection();
    const status = isDatabaseConnected ? 'OK' : 'Partial';
    const databaseStatus = isDatabaseConnected ? 'OK' : 'KO';

    res.status(isDatabaseConnected ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR).json({
      status,
      details: {
        database: databaseStatus,
      },
    });
  }
}