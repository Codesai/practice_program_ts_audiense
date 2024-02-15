import {Tile} from "./tile";
import {Category} from "./category";
import {AskingQuestionsEvents} from "./game-events";

const POP_CATEGORY = 'Pop';
const SCIENCE_CATEGORY = 'Science';
const SPORTS_CATEGORY = 'Sports';
const ROCK_CATEGORY = 'Rock';
const BOARD_SIZE: number = 12;
const NUMBER_OF_QUESTIONS_BY_CATEGORY: number = 50;

export class Board {
    private readonly _tiles: Tile[];

    private constructor(tiles: Array<Tile>) {
        this._tiles = tiles;
    }

    initialTile(): Tile {
        return this._tiles[0];
    }

    public getTileAtPosition(position: number): Tile {
        if (position >= BOARD_SIZE) {
            position = position - BOARD_SIZE;
        }
        return this._tiles[position]
    }

    static create(askingQuestionsEvents: AskingQuestionsEvents): Board {
        const categories: Record<string, Category> = createCategories(askingQuestionsEvents);
        const tiles: Array<Tile> = createTiles(categories);
        return new Board(tiles);
    }
}

function createTiles(categories: Record<string, Category>): Array<Tile> {
    const tiles: Array<Tile> = [];
    for (let position: number = 0; position < BOARD_SIZE; position++) {
        tiles.push(createTile(position, categories))
    }
    return tiles;
}

function createCategories(askingQuestionsEvents: AskingQuestionsEvents): {
    [POP_CATEGORY]: Category;
    [ROCK_CATEGORY]: Category;
    [SCIENCE_CATEGORY]: Category;
    [SPORTS_CATEGORY]: Category
} {
    return {
        [POP_CATEGORY]: Category.generate(POP_CATEGORY, NUMBER_OF_QUESTIONS_BY_CATEGORY, askingQuestionsEvents),
        [SCIENCE_CATEGORY]: Category.generate(SCIENCE_CATEGORY, NUMBER_OF_QUESTIONS_BY_CATEGORY, askingQuestionsEvents),
        [SPORTS_CATEGORY]: Category.generate(SPORTS_CATEGORY, NUMBER_OF_QUESTIONS_BY_CATEGORY, askingQuestionsEvents),
        [ROCK_CATEGORY]: Category.generate(ROCK_CATEGORY, NUMBER_OF_QUESTIONS_BY_CATEGORY, askingQuestionsEvents),
    };
}

function createTile(position: number, categories: Record<string, Category>): Tile {
    return new Tile(position, selectCorrespondingCategory(position, categories));
}

function selectCorrespondingCategory(position: number, categories: Record<string, Category>): Category {
    return categories[selectCategoryName(position)];

    function selectCategoryName(position: number): string {
        if ([0, 4, 8].includes(position)) {
            return POP_CATEGORY;
        }
        if ([1, 5, 9].includes(position)) {
            return SCIENCE_CATEGORY;
        }
        if ([2, 6, 10].includes(position)) {
            return SPORTS_CATEGORY;
        }
        return ROCK_CATEGORY;
    }
}
