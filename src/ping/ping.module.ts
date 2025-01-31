import { Module } from '@nestjs/common';
import { PingController } from './ping.controller';
import { DatabaseService } from 'src/app/database.service';

@Module({
  imports: [
    
  ],
  controllers: [PingController],
  providers: [DatabaseService],
})
export class PingModule {}