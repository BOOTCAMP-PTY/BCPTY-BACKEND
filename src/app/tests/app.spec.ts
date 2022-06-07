import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "..";


describe('AppComponent', () => {

    it('should compile the module', async () => {
        const module = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
    
        expect(module).toBeDefined();
      });
});
