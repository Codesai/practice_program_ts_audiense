export class ElementId {
    private readonly id: string;

    constructor(name: string) {
        this.id = name;
    }

    static from(name: string): ElementId {
        return new ElementId(name);
    }

    asString(): string {
        return this.id;
    }
}