import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app: NestExpressApplication = await NestFactory.create(AppModule, {
		logger: [ 'debug', 'error', 'log', 'verbose', 'warn' ]
	});
	const config: ConfigService = app.get(ConfigService);
	const port: number = config.get<number>('PORT');

	// pipe-ovi za validaciju DTO-a
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	app.enableCors({ allowedHeaders: '*' });

	// verzionisanje
	app.enableVersioning({
		type: VersioningType.URI,
		prefix: 'v'
	});

	// globalni prefiks 'api', vazi za sve osim za swagger
	app.setGlobalPrefix('api', { exclude: [ 'swagger' ] });

	// swagger
	const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
		.setTitle('Store - Api')
		.setDescription('Store API backend')
		.setVersion('1.0')
		.addTag('Store')
		.build();
	const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('swagger', app, swaggerDocument);

	await app.listen(port, () => {
		console.log(`[WEB] Server started at port ${port}!`);
	});
}

bootstrap();