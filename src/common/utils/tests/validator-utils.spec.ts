import { isEmail, isUUID } from "class-validator";
import { isMobileOrPhone } from "../validator.util";

describe('validator util service', () => {

    it('should be return true email', () => {
        expect(isEmail("pato@gmail.com")).toBeTruthy();
    });

    it('should be return false email', () => {
        expect(isEmail("pato.com")).toBeFalsy();
    });
    it('should be return false email', () => {
        expect(isEmail("pato")).toBeFalsy();
    });
    it('should be return false email', () => {
        expect(isEmail("")).toBeFalsy();
    });



    it('should be return is mobile Or Phone', () => {
        expect(isMobileOrPhone("68884767")).toBeTruthy();
    });
    it('should be return false is not uuid', () => {
        expect(isUUID("68884767")).toBeFalsy();
    });
});
