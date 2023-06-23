import { Pin } from "../Devices/Pin";
import { RegisterName } from "./RegisterName";
import { RegisterNo } from "./RegisterNo";

/**
 * レジスターの番号を持ったピン
 */
export interface RegisterPin {
    /** ピン */
    get Pin(): Pin;
    /** レジスター名 */
    get RegisterName(): RegisterName;

    /** レジスター番号 */
    get RegisterNo(): RegisterNo;

}