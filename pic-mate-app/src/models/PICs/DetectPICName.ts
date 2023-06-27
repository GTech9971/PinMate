import { PICName } from "./PICName";

/**
 * 決定済みPIC名
 */
export class DetectPICName implements PICName {
    get Value(): string {
        return this.name;
    }

    constructor(private readonly name: string) {
        if (!this.name) {
            throw new Error('Invalid Parameter PIC Name is not Empty');
        }
    }

}