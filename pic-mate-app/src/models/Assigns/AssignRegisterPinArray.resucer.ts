import { Pin } from "../PICs/Pin";
import { AssignRegisterPin } from "../Registers/AssignRegisterPin";
import { DetectRegisterNo } from "../Registers/DetectRegisterNo";
import { RegisterPin } from "../Registers/RegisterPin";
import { RegisterPinArray } from "../Registers/RegisterPinArray";
import { UnAssignRegisterPin } from "../Registers/UnAssignRegisterPin";
import { AssignRegisterPinArrayAction } from "./AssignRegisterPinArray.action";

/**
 * レジスターピンリストの操作
 * @param state 
 * @param action 
 * @returns 
 */
export const AssignRegisterPinArrayReducer = (state: RegisterPinArray, action: AssignRegisterPinArrayAction): RegisterPinArray => {
    switch (action.type) {
        case 'init': {
            const registerPinFootArray: RegisterPinArray = new RegisterPinArray(
                Array.from({ length: action.pinLength / 2 }, (_, i) => new UnAssignRegisterPin(new Pin(i + 1))).concat(
                    Array.from({ length: action.pinLength / 2 }, (_, i) => new UnAssignRegisterPin(new Pin(i + (action.pinLength / 2) + 1))).reverse()
                ));
            return registerPinFootArray;
        } case 'assign': {
            //新しいレジスター番号を作る
            const registerNo: DetectRegisterNo = new DetectRegisterNo(state.nextRegisterNo(action.registerName));
            //レジスターピンリストに追加
            const array: RegisterPin[] = state.Value.map((registerPin) => {
                return registerPin.Pin.No === action.pin.No
                    ?
                    new AssignRegisterPin(registerPin.Pin, action.registerName, registerNo)
                    :
                    registerPin
            });
            const newAssignRegisterPinArray: RegisterPinArray = new RegisterPinArray(array);
            return newAssignRegisterPinArray;
        } case 'unassign': {
            //レジスターピンリストからピン番号と一致するレジスター番号、レジスター名を削除
            const array: RegisterPin[] = state.Value.map((registerPin) => {
                return registerPin.Pin.No === action.pin.No
                    ? new UnAssignRegisterPin(registerPin.Pin)
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