import { RegisterName } from "../Registers/RegisterName";
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
            const registerNo: number = state.MaxRegisterNo + 1;
            //レジスターピンリストに追加
            const array: RegisterPin[] = state.Value.map((registerPin) => {
                return registerPin.Pin.No === action.pin.No
                    ?
                    new RegisterPin(registerPin.Pin, action.registerName, registerNo)
                    :
                    registerPin
            });
            const newAssignRegisterPinArray: RegisterPinArray = new RegisterPinArray(array);
            return newAssignRegisterPinArray;
        } case 'unassign': {
            //レジスターピンリストからピン番号と一致するレジスター番号、レジスター名を削除
            const array: RegisterPin[] = state.Value.map((registerPin) => {
                return registerPin.Pin.No === action.pin.No
                    ? new RegisterPin(registerPin.Pin, new RegisterName(''), 0)
                    :
                    registerPin
            });
            const newAssignRegisterPinArray: RegisterPinArray = new RegisterPinArray(array);
            return newAssignRegisterPinArray;
        } case 'clear': {
            //レジスターピンリストを空にする
            const emptyAssignRegisterPinArray: RegisterPinArray = new RegisterPinArray([]);
            return emptyAssignRegisterPinArray;
        }
    }
}