import {Vector} from "./Vector";

export interface Command {
    execute(vector: Vector, displacement: number): Vector;
}

export class MovingBackwards implements Command {
    execute(vector: Vector, displacement: number): Vector {
        return vector.moveBackwards(displacement);
    }
}

export class MovingForward implements Command {
    execute(vector: Vector, displacement: number): Vector {
        return vector.moveForward(displacement);
    }
}

export class TurningLeft implements Command {
    execute(vector: Vector, displacement: number): Vector {
        return vector.rotateLeft();
    }
}

export class TurningRight implements Command {
    execute(vector: Vector, displacement: number): Vector {
        return vector.rotateRight();
    }
}

export class UnknownCommand implements Command {
    execute(vector: Vector, displacement: number): Vector {
        return vector;
    }
}