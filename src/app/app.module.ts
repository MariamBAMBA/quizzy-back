import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PingController } from './ping/ping.controller';
import { DatabaseService } from './database.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule, // Ajout du module Auth
    MongooseModule.forRoot(process.env.MONGO_URI, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('is connected');
        });
        connection._events.connected();
        return connection;
      },
    }),
  ],
  controllers: [AppController, PingController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
