import { plainToInstance } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
    @IsString()
    POSTGRES_HOST: string;

    @IsNumber()
    POSTGRES_PORT: number;

    @IsString()
    POSTGRES_DATABASE: string;

    @IsString()
    POSTGRES_USERNAME: string;

    @IsString()
    POSTGRES_PASSWORD: string;

    @IsBoolean()
    POSTGRES_SYNCHRONIZE: boolean;

    // Add other environment variables as needed
    @IsString()
    JWT_SECRET: string;

    @IsNumber()
    PORT: number;
}

export function validateEnv(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
}