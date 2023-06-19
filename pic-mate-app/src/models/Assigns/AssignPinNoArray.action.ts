import { Pin } from "../Devices/Pin"

export type AssignPinNoArrayAction = |
{
    type: 'assign',
    pin: Pin
} |
{
    type: 'unassign',
    pin: Pin
}