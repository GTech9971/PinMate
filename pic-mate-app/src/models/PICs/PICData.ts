import { RegisterPinArray } from "../Registers/RegisterPinArray";
import { PICName } from "./PICName";
import { UNDetectPICName } from "./UnDetectPICName";

export class PICData {

    public get Name(): PICName { return this.name; }

    public get Registers(): RegisterPinArray { return this.registerPinArray; }

    constructor(private readonly name: PICName,
        private readonly registerPinArray: RegisterPinArray) {

        if (name instanceof UNDetectPICName) {
            throw new Error('UnDetect PIC Name');
        }

        if (registerPinArray.existsUnAssignRegisterPin()) {
            throw new Error('Exists UnAssign Pin');
        }
    }
}