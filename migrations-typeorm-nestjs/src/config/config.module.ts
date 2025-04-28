import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config-validator';
@Global() // Make this module global
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: validateEnv,
            envFilePath: '.env', // Specify your env file path
        }),
    ],
    providers: [],
    exports: [],
    controllers: [],
})
export class ConfigurationModule { }
