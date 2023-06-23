import { RegisterName } from "./RegisterName";

/**
 * レジスター名決定済み
 */
export class DetectRegisterName implements RegisterName {
    get Value(): string {
        return this.value;
    }

    constructor(private readonly value: string) {
        if (!value) {
            throw new Error('');
        }
    }

}