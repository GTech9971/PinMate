import { Register } from "./Register"

export type RegisterArrayAction = |
{
    type: 'registry',
} |
{
    type: 'unregister',
    register: Register
} |
{
    type: 'updat-register',
    register: Register,
}