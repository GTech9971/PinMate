import { Register } from "../Register";

export class DeviceData {

    public get Name(): string { return this.name; }

    public get Registers(): Register[] { return this.registers; }

    constructor(private readonly name: string,
        private readonly registers: Register[]) {
    }
}