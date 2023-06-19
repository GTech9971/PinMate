import { Pin } from "./Pin";

export class PinArray {

    private readonly PIN_LENGTH: number = 8;

    private readonly value: Pin[];
    public get Value(): Pin[] { return this.value; }

    constructor(private readonly array: Pin[]) {
        // if (array.length !== this.PIN_LENGTH) {
        //     throw new Error('');
        // }
        const uniqueSortedArray: Pin[] = Array.from(new Set(this.array)).sort();
        this.value = uniqueSortedArray;
    }
}