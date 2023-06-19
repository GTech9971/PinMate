import { Pin } from "../Devices/Pin";
import { PinArray } from "../Devices/PinArray";
import { AssignPinNoArrayAction } from "./AssignPinNoArray.action";

export const AssignPinNoArrayReducer = (state: PinArray, action: AssignPinNoArrayAction): PinArray => {
    switch (action.type) {
        case 'assign': {
            const array: Pin[] = [...state.Value, action.pin];
            const newAssignPinArray: PinArray = new PinArray(array);
            return newAssignPinArray;
        } case 'unassign': {
            const array: Pin[] = state.Value.filter((pin) => pin.No !== action.pin.No);
            const newAssignPinArray: PinArray = new PinArray(array);
            return newAssignPinArray;
        }
    }
}