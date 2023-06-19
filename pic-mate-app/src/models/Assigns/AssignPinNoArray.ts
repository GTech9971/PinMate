export class AssignPinNoArray {
    private readonly value: number[];
    public get Value(): number[] { return this.value; }

    constructor(private readonly array: number[]) {
        const uniqueSortedArray: number[] = Array.from(new Set(this.array)).sort();
        this.value = uniqueSortedArray;
    }


}