import { PinArray } from "./Devices/PinArray";
import { RegisterName } from "./RegisterName";

export class Register {

    public get Name(): RegisterName { return this.name; }

    public get PinArray(): PinArray { return this.pinArray; }

    constructor(private readonly name: RegisterName,
        private readonly pinArray: PinArray) {
    }


    public EnablePin(pinNo: number): Register {
        return new Register(this.name, this.pinArray.EnablePin(pinNo));
    }

    public DisablePin(pinNo: number): Register {
        return new Register(this.name, this.pinArray.DisablePin(pinNo));
    }
}