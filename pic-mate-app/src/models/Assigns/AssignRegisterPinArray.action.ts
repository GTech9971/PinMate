import { Pin } from "../Devices/Pin"
import { RegisterName } from "../Registers/RegisterName"

/**
 * レジスターピンリストの操作用アクション
 */
export type AssignRegisterPinArrayAction = |
{
    type: 'init',
    pinLength: number,
} |
{
    //レジスターピンをアサイン
    type: 'assign',
    pin: Pin,
    registerName: RegisterName,
} |
{
    //レジスターピンのアサインを解除
    type: 'unassign',
    pin: Pin
} |
{
    //レジスターピンリストを空にする
    type: 'clear',
}