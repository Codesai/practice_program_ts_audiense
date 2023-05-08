export class Vector {
    private readonly coordinates: Coordinates;
    private readonly direction: Direction;

    static create(x: number, y: number, direction: string): Vector {
        return new Vector(new Coordinates(x, y), Direction.create(direction));
    }

    private constructor(coordinates: Coordinates, direction: Direction) {
        this.coordinates = coordinates;
        this.direction = direction;
    }

    rotateRight(): Vector {
        return new Vector(this.coordinates, this.direction.rotateRight());
    }

    rotateLeft(): Vector {
        return new Vector(this.coordinates, this.direction.rotateLeft());
    }

    moveForward(displacement: number): Vector {
        return new Vector(this.direction.move(this.coordinates, displacement), this.direction);
    }

    moveBackwards(displacement: number): Vector {
        return new Vector(this.direction.move(this.coordinates, -displacement), this.direction);
    }
}

class Coordinates {
    private readonly x: number;
    private readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    moveAlongYAxis(displacement: number): Coordinates {
        return new Coordinates(this.x, this.y + displacement);
    }

    moveAlongXAxis(displacement: number): Coordinates {
        return new Coordinates(this.x + displacement, this.y);
    }
}

abstract class Direction {
    private direction: string;
    protected static NORTH_ENCODING: string = "N";
    protected static SOUTH_ENCODING: string = "S";
    protected static WEST_ENCODING: string = "W";
    protected static EAST_ENCODING: string = "E";

    protected constructor(direction: string) {
        this.direction = direction;
    }
    static create(directionEncoding: string): Direction {
        if (directionEncoding === this.NORTH_ENCODING)
            return new North();
        if (directionEncoding === this.SOUTH_ENCODING)
            return new South();
        if (directionEncoding === this.WEST_ENCODING)
            return new West();
        return new East();
    }

    abstract rotateLeft(): Direction;
    abstract rotateRight(): Direction
    abstract move(coordinates: Coordinates, displacement: number): Coordinates
}

class North extends Direction {
    constructor() {
        super(Direction.NORTH_ENCODING);
    }

    rotateLeft(): Direction {
        return Direction.create(Direction.WEST_ENCODING);
    }

    rotateRight(): Direction {
        return Direction.create(Direction.EAST_ENCODING);
    }

    move(coordinates: Coordinates, displacement: number): Coordinates {
        return coordinates.moveAlongYAxis(displacement);
    }
}

class South extends Direction {
    constructor() {
        super(Direction.SOUTH_ENCODING);
    }
    rotateLeft(): Direction {
        return Direction.create(Direction.EAST_ENCODING);
    }

    rotateRight(): Direction {
        return Direction.create(Direction.WEST_ENCODING);
    }

    move(coordinates: Coordinates, displacement: number): Coordinates {
        return coordinates.moveAlongYAxis(-displacement);
    }
}

class West extends Direction {
    constructor() {
        super(Direction.WEST_ENCODING);
    }
    rotateLeft(): Direction {
        return Direction.create(Direction.SOUTH_ENCODING);
    }

    rotateRight(): Direction {
        return Direction.create(Direction.NORTH_ENCODING);
    }

    move(coordinates: Coordinates, displacement: number): Coordinates {
        return coordinates.moveAlongXAxis(-displacement);
    }
}

class East extends Direction {
    constructor() {
        super(Direction.EAST_ENCODING);
    }
    rotateLeft(): Direction {
        return Direction.create(Direction.NORTH_ENCODING);
    }

    rotateRight(): Direction {
        return Direction.create(Direction.SOUTH_ENCODING);
    }

    move(coordinates: Coordinates, displacement: number): Coordinates {
        return coordinates.moveAlongXAxis(displacement);
    }
}
