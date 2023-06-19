import { Pin } from "../Devices/Pin";

/**
 * レジスターの番号を持ったピン
 */
export class RegisterPin {
    /** ピン */
    public get Pin(): Pin { return this.pin; }
    /** レジスター番号 */
    public get RegisterNo(): number { return this.registerNo; }

    constructor(private readonly pin: Pin,
        private readonly registerNo: number) {

        if (registerNo < 0) {
            throw new Error('');
        }
    }
}