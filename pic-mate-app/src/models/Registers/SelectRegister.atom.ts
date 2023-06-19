import { atom } from "recoil";
import { Register } from "./Register";

export const SelectRegisterAtom = atom<Register>({
    key: 'selectRegisterAtom',
    default: undefined
})