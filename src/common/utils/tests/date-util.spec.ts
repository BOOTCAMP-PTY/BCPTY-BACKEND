import { getAge } from "../date.util";

describe('date util service', () => {
    it('should be defined', () => {
        expect(getAge(12)).toBeDefined();
    });



});
