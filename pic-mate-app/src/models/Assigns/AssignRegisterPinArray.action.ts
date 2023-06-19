import { Pin } from "../Devices/Pin"

/**
 * レジスターピンリストの操作用アクション
 */
export type AssignRegisterPinArrayAction = |
{
    //レジスターピンをアサイン
    type: 'assign',
    pin: Pin,
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