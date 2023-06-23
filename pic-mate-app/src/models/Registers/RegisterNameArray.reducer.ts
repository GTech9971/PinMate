import { RegisterName } from "./RegisterName";
import { RegisterNameArray } from "./RegisterNameArray";
import { RegisterNameArrayAction } from "./RegisterNameArray.action";

/**
 * レジスター名リストに対する操作
 * @param state 
 * @param action 
 * @returns 
 */
export const RegisterNameArrayReducer = (state: RegisterNameArray, action: RegisterNameArrayAction): RegisterNameArray => {
    switch (action.type) {
        case "registry": {
            //新しいレジスターを追加
            const array: RegisterName[] = [...state.Value, state.nextRegisterName()];
            const newRegisterNameArray: RegisterNameArray = new RegisterNameArray(array);
            return newRegisterNameArray;
        } case "unregister": {
            //レジスターを削除
            const array: RegisterName[] = state.Value.filter((registerName) => registerName.Value !== action.registerName.Value);
            const newRegisterArray: RegisterNameArray = new RegisterNameArray(array);
            return newRegisterArray;
        }
    }
}