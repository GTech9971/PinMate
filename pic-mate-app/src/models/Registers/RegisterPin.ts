import { Pin } from "../Devices/Pin";
import { RegisterName } from "./RegisterName";

/**
 * レジスターの番号を持ったピン
 */
export class RegisterPin {
    /** ピン */
    public get Pin(): Pin { return this.pin; }
    /** レジスター名 */
    public get RegisterName(): RegisterName { return this.registerName; }

    /** レジスター番号 */
    public get RegisterNo(): number { return this.registerNo; }

    constructor(private readonly pin: Pin,
        private readonly registerName: RegisterName,
        private readonly registerNo: number) {

        if (registerNo < 0) {
            throw new Error('');
        }
    }
}