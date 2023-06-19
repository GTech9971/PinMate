import { RegisterPin } from "../Registers/RegisterPin";
import { RegisterPinArray } from "../Registers/RegisterPinArray";
import { AssignRegisterPinArrayAction } from "./AssignRegisterPinArray.action";

/**
 * レジスターピンリストの操作
 * @param state 
 * @param action 
 * @returns 
 */
export const AssignRegisterPinArrayReducer = (state: RegisterPinArray, action: AssignRegisterPinArrayAction): RegisterPinArray => {
    switch (action.type) {
        case 'assign': {
            //新しいレジスター番号を作る
            let registerNo: number;
            if (state.Value.length === 0) {
                registerNo = 0;
            } else {
                registerNo = state.Value[state.Value.length - 1].RegisterNo + 1;
            }
            //レジスターピンリストに追加
            const array: RegisterPin[] = [...state.Value, new RegisterPin(action.pin, registerNo)];
            const newAssignRegisterPinArray: RegisterPinArray = new RegisterPinArray(array);
            return newAssignRegisterPinArray;
        } case 'unassign': {
            //レジスターピンリストからピン番号と一致するレジスターピンを削除
            const array: RegisterPin[] = state.Value.filter((registerPin) => registerPin.Pin !== action.pin);
            const newAssignRegisterPinArray: RegisterPinArray = new RegisterPinArray(array);
            return newAssignRegisterPinArray;
        } case 'clear': {
            //レジスターピンリストを空にする
            const emptyAssignRegisterPinArray: RegisterPinArray = new RegisterPinArray([]);
            return emptyAssignRegisterPinArray;
        }
    }
}