import { Pin } from "../Devices/Pin";
import { RegisterName } from "./RegisterName";
import { RegisterNo } from "./RegisterNo";
import { RegisterPin } from "./RegisterPin";
import { UnDetectRegisterName } from "./UnDetectRegisterName";
import { UnDetectRegisterNo } from "./UnDetectRegisterNo";

/**
 * レジスターの番号を持ったピン
 */
export class AssignRegisterPin implements RegisterPin {
    /** ピン */
    public get Pin(): Pin { return this.pin; }
    /** レジスター名 */
    public get RegisterName(): RegisterName { return this.registerName; }

    /** レジスター番号 */
    public get RegisterNo(): RegisterNo { return this.registerNo; }

    constructor(private readonly pin: Pin,
        private readonly registerName: RegisterName,
        private readonly registerNo: RegisterNo) {

        if (registerName instanceof UnDetectRegisterName) {
            throw new Error("レジスター名が決定されていません。");
        }

        if (registerNo instanceof UnDetectRegisterNo) {
            throw new Error('レジスター番号が決定されていません');
        }
    }
}