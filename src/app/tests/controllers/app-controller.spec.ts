import { Test } from "@nestjs/testing";
import { AppModule } from "src/app";
import { AppController } from "src/app/controllers";


describe('AppComponent', () => {
    let myController: AppController;
    beforeEach( async () => {
        const module = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
        myController= module.get<AppController>(AppController);
        
      });

      it('should the correct value', async() => {
        expect(await myController.welcome()).toEqual('BOOTCAMP-PTY  - Gateway Server');
      });
});
