import { RegisterName } from "./RegisterName";
import { RegisterPinArray } from "./RegisterPinArray";

export class Register {

    public get Name(): RegisterName { return this.name; }

    public get RegisterPinArray(): RegisterPinArray { return this.registerPinArray; }

    constructor(private readonly name: RegisterName,
        private readonly registerPinArray: RegisterPinArray) {
    }
}