import { RegisterName } from "./RegisterName"

export type RegisterNameArrayAction = |
{
    type: 'registry',
} |
{
    type: 'unregister',
    registerName: RegisterName
}