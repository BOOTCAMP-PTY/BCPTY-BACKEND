import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const configService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle(
      configService.get('APP_SITE_TITLE') || process.env.npm_package_name,
    )
    .setDescription(
      configService.get('SWAGGER_API_DESCRIPTION') ||
        process.env.npm_package_description,
    )
    .setVersion(
      configService.get('SWAGGER_API_VERSION') ||
        process.env.npm_package_version,
    )
    .addTag(configService.get('SWAGGER_API_TAG') || 'API Boilerplate')
    .setContact(
      configService.get('SWAGGER_API_CONTACT_NAME') ||
        process.env.npm_package_author_name,
      configService.get('SWAGGER_API_CONTACT_URL') ||
        process.env.npm_package_author_url,
      configService.get('SWAGGER_API_CONTACT_EMAIL') ||
        process.env.npm_package_author_email,
    )
    .setLicense(
      configService.get('SWAGGER_API_LICENSE_TYPE') ||
        process.env.npm_package_license,
      configService.get('SWAGGER_API_LICENSE_URL'),
    )
    .setTermsOfService(configService.get('SWAGGER_API_TOS'))
    // .addServer(
    //  configService.get('SWAGGER_API_SERVER_URL'),
    //  configService.get('SWAGGER_API_SERVER_NAME'),
    // )
    .setExternalDoc(
      configService.get('SWAGGER_API_EXTERNAL_DOCS_TITLE'),
      configService.get('SWAGGER_API_EXTERNAL_DOCS_URL'),
    )
    .addBearerAuth()
    .build();

  SwaggerModule.setup(
    configService.get('SWAGGER_API_DOCS_URL'),
    app,
    SwaggerModule.createDocument(app, options),
  );
}
