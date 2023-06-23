import { RegisterNo } from "./RegisterNo";

export class UnDetectRegisterNo implements RegisterNo {
    get Value(): number {
        return -1;
    }

}