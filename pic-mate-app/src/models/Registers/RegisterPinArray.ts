import { RegisterPin } from "./RegisterPin";

/**
 * レジスターピンリスト
 */
export class RegisterPinArray {

    private readonly value: RegisterPin[];
    public get Value(): RegisterPin[] { return this.value; }

    constructor(private readonly array: RegisterPin[]) {
        const uniqueSortedArray: RegisterPin[] = Array.from(new Set(this.array)).sort();
        this.value = uniqueSortedArray;
    }

    public get MaxRegisterNo(): number {
        return this.value.reduce((max, current) => (current.RegisterNo > max ? current.RegisterNo : max), this.value[0].RegisterNo);
    }
}