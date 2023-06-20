export class RegisterName {

    public get Value(): string { return this.name; }

    constructor(private readonly name: string) {
        // if (!name) { throw new Error(''); }
    }
}