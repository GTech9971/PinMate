import { RegisterNo } from "./RegisterNo";

/**
 * 決定済みレジスター番号
 */
export class DetectRegisterNo implements RegisterNo {
    get Value(): number {
        return this.value;
    }

    constructor(private readonly value: number) {
        if (this.value < 0) {
            throw new Error('Invalid parameter');
        }
    }

}