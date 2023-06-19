import { Register } from "./Register";
import { RegisterArray } from "./RegisterArray";
import { RegisterArrayAction } from "./RegisterArray.action";
import { RegisterName } from "./RegisterName";
import { RegisterPinArray } from "./RegisterPinArray";

export const RegisterArrayReducer = (state: RegisterArray, action: RegisterArrayAction): RegisterArray => {
    switch (action.type) {
        case "registry": {
            let newRegisterName: RegisterName;
            if (state.Value.length === 0) {
                newRegisterName = new RegisterName('RA');
            } else {
                const lastRegister: Register = state.Value[state.Value.length - 1];
                const nextRegisterName: string = 'R' + String.fromCharCode(lastRegister.Name.Value.charCodeAt(1) + 1);
                newRegisterName = new RegisterName(nextRegisterName);
            }
            const newRegister: Register = new Register(newRegisterName, new RegisterPinArray([]));
            const array: Register[] = [...state.Value, newRegister];
            const newRegisterArray: RegisterArray = new RegisterArray(array);
            return newRegisterArray;
        } case "unregister": {
            const array: Register[] = state.Value.filter((register) => register !== action.register);
            const newRegisterArray: RegisterArray = new RegisterArray(array);
            return newRegisterArray;
        } case 'updat-register': {
            const array: Register[] = state.Value.map((register) => {
                return register.Name.Value === action.register.Name.Value ? action.register : register;
            });
            const newRegisterArray: RegisterArray = new RegisterArray(array);
            return newRegisterArray;
        }
    }
}