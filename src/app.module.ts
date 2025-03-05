import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AppDataSource } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      useFactory: () => ({
        autoLoadEntities: true, // Auto-load entities from forFeature()
      }),
      inject: [ConfigService], // Inject ConfigService into useFactory and dataSourceFactory
      dataSourceFactory: async () => {
        try {
          if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log('Database connected successfully');
          }
          await AppDataSource.runMigrations();
          console.log('Migrations executed successfully');
          return AppDataSource;
        } catch (error) {
          console.error(
            'Error during DataSource initialization or migration:',
            error,
          );
          throw error;
        }
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
