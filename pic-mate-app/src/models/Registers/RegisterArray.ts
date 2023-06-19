import { Register } from "./Register";

export class RegisterArray {
    private readonly value: Register[];
    public get Value(): Register[] { return this.value; }

    constructor(private readonly array: Register[]) {
        const uniqueSortedArray: Register[] = Array.from(new Set(this.array)).sort();
        this.value = uniqueSortedArray;
    }
}