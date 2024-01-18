import {Position} from "./position";
import {Notifier} from "./notifier";
import {Category} from "./category";

const POP_CATEGORY = 'Pop';
const SCIENCE_CATEGORY = 'Science';
const SPORTS_CATEGORY = 'Sports';
const ROCK_CATEGORY = 'Rock';
const BOARD_SIZE: number = 12;

export class Board {
    private readonly positions: Position[];

    private constructor(positions: Array<Position>) {
        this.positions = positions;
    }

    initialPosition(): Position {
        return this.positions[0];
    }

     moveForward(position: Position, roll: number): Position {
        let newPositionNumber = position.number + roll;
        if (newPositionNumber >= BOARD_SIZE) {
            newPositionNumber = newPositionNumber - BOARD_SIZE;
        }
        return this.positions[newPositionNumber]
    }

    static create(notifier: Notifier): Board {
        return new Board(createPositions(notifier, BOARD_SIZE));
    }
}

function createPositions(notifier: Notifier, boardSize: number): Position[] {
    const categories: Record<string, Category> = createCategories(notifier);
    const positions: Array<Position> = [];
    for (let positionNumber = 0; positionNumber < boardSize; positionNumber++) {
        positions.push(createPosition(positionNumber, categories))
    }
    return positions;
}

function createCategories(notifier: Notifier): {
    [POP_CATEGORY]: Category;
    [ROCK_CATEGORY]: Category;
    [SCIENCE_CATEGORY]: Category;
    [SPORTS_CATEGORY]: Category
} {
    return {
        [POP_CATEGORY]: new Category(POP_CATEGORY, notifier),
        [SCIENCE_CATEGORY]: new Category(SCIENCE_CATEGORY, notifier),
        [SPORTS_CATEGORY]: new Category(SPORTS_CATEGORY, notifier),
        [ROCK_CATEGORY]: new Category(ROCK_CATEGORY, notifier),
    };
}

function createPosition(positionNumber: number, categories: Record<string, Category>): Position {
    return new Position(selectCurrentCategory(positionNumber, categories), positionNumber);
}

function selectCurrentCategory(positionNumber: number, categories: Record<string, Category>): Category {
    return categories[selectCurrentCategoryName(positionNumber)];

    function selectCurrentCategoryName(positionNumber: number): string {
        if ([0, 4, 8].includes(positionNumber)) {
            return POP_CATEGORY;
        }
        if ([1, 5, 9].includes(positionNumber)) {
            return SCIENCE_CATEGORY;
        }
        if ([2, 6, 10].includes(positionNumber)) {
            return SPORTS_CATEGORY;
        }
        return ROCK_CATEGORY;
    }
}