import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const SERVICES = {
  SHRINKER: {
    HOST: process.env.SHRINKER_HOST || '0.0.0.0',
    PORT: process.env.SHRINKER_PORT || '8080'
  },
  UNSHRINKER: {
    HOST: process.env.UNSHRINKER_HOST || '0.0.0.0',
    PORT: process.env.UNSHRINKER_PORT || '8081'
  },
  ACCOUNT: {
    HOST: process.env.UNSHRINKER_HOST || '0.0.0.0',
    PORT: process.env.UNSHRINKER_PORT || '8082'
  }
}

@Module({
  imports: [
    ClientsModule.register([
    {
      name: "SHRINKER_SVC",
      transport: Transport.TCP,
      options: {
        host: SERVICES.SHRINKER.HOST,
        port: parseInt(SERVICES.SHRINKER.PORT)
      }
    },
    {
      name: "UNSHRINKER_SVC",
      transport: Transport.TCP,
      options: {
        host: SERVICES.UNSHRINKER.HOST,
        port: parseInt(SERVICES.UNSHRINKER.PORT)
      }
    },
    {
      name: "ACCOUNT_SVC",
      transport: Transport.TCP,
      options: {
        host: SERVICES.ACCOUNT.HOST,
        port: parseInt(SERVICES.ACCOUNT.PORT)
      }
    }
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
