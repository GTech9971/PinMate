export type AssignPinNoArrayAction = |
{
    type: 'assign',
    pinNo: number
} |
{
    type: 'unassign',
    pinNo: number
}