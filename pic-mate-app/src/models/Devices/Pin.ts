import { RegisterName } from "../RegisterName";

export class Pin {

    public get No(): number { return this.no; }

    public get RegisterName(): RegisterName { return this.registerName; }

    public get RegisterNo(): number { return this.registerNo; }

    public get isEnable(): boolean { return this.enable; }

    constructor(private readonly no: number,
        private readonly registerName: RegisterName,
        private readonly registerNo: number,
        private readonly enable: boolean) { }

    public Enable(): Pin { return new Pin(this.no, this.registerName, this.registerNo, true); }

    public Disable(): Pin { return new Pin(this.no, this.registerName, this.registerNo, false); }
}