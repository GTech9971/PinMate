import { Pin } from "../Devices/Pin";
import { RegisterName } from "./RegisterName";
import { RegisterNo } from "./RegisterNo";
import { RegisterPin } from "./RegisterPin";
import { UnDetectRegisterName } from "./UnDetectRegisterName";
import { UnDetectRegisterNo } from "./UnDetectRegisterNo";

/**
 * アサインされていないレジスターピン
 */
export class UnAssignRegisterPin implements RegisterPin {

    get Pin(): Pin { return this.pin; }
    get RegisterName(): RegisterName { return new UnDetectRegisterName(); }
    get RegisterNo(): RegisterNo { return new UnDetectRegisterNo(); }

    constructor(private readonly pin: Pin,) {
    }

}