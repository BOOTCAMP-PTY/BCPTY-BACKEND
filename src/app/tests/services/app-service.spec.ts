import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "src/app/controllers";
import { AppService } from "../../../app/services";

describe("AppService", () => {
  let appService: AppService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
      ],
    }).compile();
    appService = app.get<AppService>(AppService);
  });

  it('should return response', async () => {

    expect(appService.welcome()).toBeDefined();
  });

  
  it('should return text', async () => {

    expect(appService.welcome()).toEqual('BOOTCAMP-PTY  - Gateway Server');
  });

  it('should compile', async () => {

    expect(await appService.onModuleInit()).toBeUndefined();
  });
});