import { AssignPinNoArray } from "./AssignPinNoArray";
import { AssignPinNoArrayAction } from "./AssignPinNoArray.action";

export const AssignPinNoArrayReducer = (state: AssignPinNoArray, action: AssignPinNoArrayAction): AssignPinNoArray => {
    switch (action.type) {
        case 'assign': {
            const array: number[] = [...state.Value, action.pinNo];
            const newAssignPinArray: AssignPinNoArray = new AssignPinNoArray(array);
            return newAssignPinArray;
        } case 'unassign': {
            const array: number[] = state.Value.filter((pinNo) => pinNo !== action.pinNo);
            const newAssignPinArray: AssignPinNoArray = new AssignPinNoArray(array);
            return newAssignPinArray;
        }
    }
}