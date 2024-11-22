import { ConfigService } from '@nestjs/config';
const configService: ConfigService = new ConfigService();

export default () => ({
  ENV: process.env.ENV || 'development',
  DATABASE_URL: configService.getOrThrow<string>('DATABASE_URL')
});
