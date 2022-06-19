import { removeSlashAtEnd } from "../path.util";

describe('path util service', () => {
    it('should be slashed', () => {
        expect(removeSlashAtEnd("add/")).toEqual("add");
    });

    it('should be not slashed', () => {
        expect(removeSlashAtEnd("add")).toEqual("add");
    });
    it('should be not slashed', () => {
        expect(removeSlashAtEnd("/add")).toEqual("/add");
    });


});
