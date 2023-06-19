export class Pin {

    public get No(): number { return this.no; }

    constructor(private readonly no: number,) {
        if (no < 0) {
            throw new Error('');
        }
    }
}