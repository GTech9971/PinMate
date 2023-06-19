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
}