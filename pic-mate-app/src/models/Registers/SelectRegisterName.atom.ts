import { atom } from "recoil";
import { RegisterName } from "./RegisterName";

export const SelectRegisterNameAtom = atom<RegisterName>({
    key: 'selectRegisterNameAtom',
    default: undefined
})