import { Pin } from "./Pin";

export class PinArray {

    private readonly PIN_LENGTH: number = 8;

    public get Array(): Pin[] { return this.array; }

    constructor(private readonly array: Pin[]) {
        if (array.length !== this.PIN_LENGTH) {
            throw new Error('');
        }
    }

    public EnablePin(pinNo: number): PinArray {
        const enablePins: Pin[] = this.array.map((pin) => {
            if (pin.No === pinNo) {
                return pin.Enable();
            }
            return pin;
        });
        return new PinArray(enablePins);
    }

    public DisablePin(pinNo: number): PinArray {
        const disablePins: Pin[] = this.array.map((pin) => {
            if (pin.No === pinNo) {
                return pin.Disable();
            }
            return pin;
        });

        return new PinArray(disablePins);
    }


}