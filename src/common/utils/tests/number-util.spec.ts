import { isNumeric } from "../number.util";

describe('number util service', () => {
    it('should be defined as number', () => {
        expect(isNumeric(12)).toBeTruthy();
    });



});
