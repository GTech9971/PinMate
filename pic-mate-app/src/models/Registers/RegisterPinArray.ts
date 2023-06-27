import { RegisterName } from "./RegisterName";
import { RegisterPin } from "./RegisterPin";
import { UnDetectRegisterName } from "./UnDetectRegisterName";

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

    public maxRegisterNo(registerName: RegisterName): number {
        if (registerName instanceof UnDetectRegisterName) {
            throw new Error("UnDetect Register Name");
        }
        return this.value
            .filter((registerPin) => registerPin.RegisterName.Value === registerName.Value)
            .reduce((max, current) => (current.RegisterNo.Value > max ? current.RegisterNo.Value : max), this.value[0].RegisterNo.Value);
    }

    public nextRegisterNo(registerName: RegisterName): number {
        if (registerName instanceof UnDetectRegisterName) {
            throw new Error("UnDetect Register Name");
        }
        const maxRegisterNo: number = this.maxRegisterNo(registerName);
        return maxRegisterNo + 1;
    }

    /**
     * アサインされていないピンが存在するか調べる
     * @returns true:アサインされていないピンが存在
     */
    public existsUnAssignRegisterPin(): boolean {
        for (const pin of this.value) {
            if (pin.RegisterName instanceof UnDetectRegisterName) {
                return true;
            }
        }

        return false;
    }
}