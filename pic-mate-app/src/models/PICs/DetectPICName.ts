import { PICName } from "./PICName";

/**
 * 決定済みPIC名
 */
export class DetectPICName implements PICName {
    get Value(): string {
        return this.value;
    }

    constructor(private readonly value: string) {
        if (!this.value) {
            throw new Error('Invalid Parameter PIC Name is not Empty');
        }
    }

}