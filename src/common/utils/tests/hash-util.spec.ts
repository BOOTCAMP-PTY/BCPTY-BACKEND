import { encodeString, generateHash, validateHash } from "../hash.util";


describe('hash Util service', () => {
    it('should hash pass without problems', () => {
        const plainPass = "123dummydom"
        const hasPass = generateHash(plainPass);
        expect(hasPass).toBeTruthy();
    });

    it('should hash and compare truthy', async () => {
        const plainPass = "123dummydom"
        const hasPass = await generateHash(plainPass);

        const isTruePass = validateHash(plainPass, hasPass)
        expect(isTruePass).toBeTruthy();
    });

    it('should encode code true', async () => {
        const plainPass = "123dummydom"
        const hasPass = await encodeString(plainPass);
        expect(hasPass).toBeTruthy();
    });


});
