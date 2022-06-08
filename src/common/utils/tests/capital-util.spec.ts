import { capitalizeFirst, generateRandomString } from "../string.util";

describe('capitalLetter util service', () => {
    it('should be first letter capitalize', () => {
        expect(capitalizeFirst("patata")).toEqual("Patata");
    });

    it('should be defined', () => {
        expect(generateRandomString(12)).toBeDefined();
    });


});
