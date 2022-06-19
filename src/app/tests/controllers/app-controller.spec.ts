import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "../../../app/controllers";
import { AppService } from "../../../app/services";

describe("AppController", () => {
  let appController: AppController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  it('should return response', async () => {

    expect(await appController.welcome()).toBeDefined();
  });
});