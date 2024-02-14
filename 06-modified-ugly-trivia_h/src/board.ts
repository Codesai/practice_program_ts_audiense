import {Position} from "./position";
import {Notifier} from "./notifier";
import {Category} from "./category";

const POP_CATEGORY = 'Pop';
const SCIENCE_CATEGORY = 'Science';
const SPORTS_CATEGORY = 'Sports';
const ROCK_CATEGORY = 'Rock';
const BOARD_SIZE: number = 12;
const NUMBER_OF_QUESTIONS_BY_CATEGORY: number = 50;

export class Board {
    private readonly _positions: Position[];

    private constructor(positions: Array<Position>) {
        this._positions = positions;
    }

    initialPosition(): Position {
        return this._positions[0];
    }

    public getPositionInside(position: number): Position {
        if (position >= BOARD_SIZE) {
            position = position - BOARD_SIZE;
        }
        return this._positions[position]
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
        [POP_CATEGORY]: Category.generate(POP_CATEGORY, NUMBER_OF_QUESTIONS_BY_CATEGORY, notifier),
        [SCIENCE_CATEGORY]: Category.generate(SCIENCE_CATEGORY, NUMBER_OF_QUESTIONS_BY_CATEGORY, notifier),
        [SPORTS_CATEGORY]: Category.generate(SPORTS_CATEGORY, NUMBER_OF_QUESTIONS_BY_CATEGORY, notifier),
        [ROCK_CATEGORY]: Category.generate(ROCK_CATEGORY, NUMBER_OF_QUESTIONS_BY_CATEGORY, notifier),
    };
}

function createPosition(positionNumber: number, categories: Record<string, Category>): Position {
    let category = selectCurrentCategory(positionNumber, categories);
    return new Position(positionNumber, category);
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
