import { Pin } from "../Devices/Pin";

export class RegisterPin {

    public get Pin(): Pin { return this.pin; }

    public get RegisterNo(): number { return this.registerNo; }

    constructor(private readonly pin: Pin,
        private readonly registerNo: number) {

        if (registerNo < 0) {
            throw new Error('');
        }
    }
}