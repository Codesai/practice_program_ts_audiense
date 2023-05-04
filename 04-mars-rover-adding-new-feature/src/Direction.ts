import {Coordinates} from "./Coordinates";

export abstract class Direction {
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
