import { PICName } from "./PICName";

/**
 * 未確定のPIC名
 */
export class UNDetectPICName implements PICName {
    get Value(): string { return ''; }
}