import { RegisterName } from "./RegisterName";

/**
 * レジスター名未定
 */
export class UnDetectRegisterName implements RegisterName {
    get Value(): string { return ""; }

}