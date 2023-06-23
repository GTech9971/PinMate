import { DetectRegisterName } from "./DetectRegisterName";
import { RegisterName } from "./RegisterName";

export class RegisterNameArray {
    private readonly value: RegisterName[];
    public get Value(): RegisterName[] { return this.value; }

    constructor(private readonly array: RegisterName[]) {
        const uniqueSortedArray: RegisterName[] = Array.from(new Set(this.array)).sort();
        this.value = uniqueSortedArray;
    }

    /**
     * 新しいレジスター名を作成
     * RA -> RB -> RC ...
     */
    public nextRegisterName(): RegisterName {
        let newRegisterName: RegisterName;
        if (this.Value.length === 0) {
            newRegisterName = new DetectRegisterName('RA');
        } else {
            const lastRegisterName: RegisterName = this.Value[this.Value.length - 1];
            const nextRegisterName: string = 'R' + String.fromCharCode(lastRegisterName.Value.charCodeAt(1) + 1);
            newRegisterName = new DetectRegisterName(nextRegisterName);
        }

        return newRegisterName;
    }
}