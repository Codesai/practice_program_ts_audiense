import { Position } from './Position';
import { Category } from './category';
import { POP_CATEGORY, ROCK_CATEGORY, SCIENCE_CATEGORY, SPORTS_CATEGORY } from './game';
import { Notifier } from './notifier';

export class Board {
  private categories: Record<string, Category>;
  private readonly boardSize = 12;
  private _positions: Position[];

  constructor(notifier: Notifier) {
    this.categories = {
      [POP_CATEGORY]: new Category(POP_CATEGORY, notifier),
      [SCIENCE_CATEGORY]: new Category(SCIENCE_CATEGORY, notifier),
      [SPORTS_CATEGORY]: new Category(SPORTS_CATEGORY, notifier),
      [ROCK_CATEGORY]: new Category(ROCK_CATEGORY, notifier),
    };
    this._positions = [];
    for (let i = 0; i < this.boardSize; i++) {
      const currentCategory = this.currentCategory(i);
      this._positions.push(new Position(this.categories[currentCategory], i));
    }
  }

  get positions(): Position[] {
    return this._positions;
  }

  private currentCategory(positionNumber: number): string {
    if (positionNumber == 0) return POP_CATEGORY;
    if (positionNumber == 4) return POP_CATEGORY;
    if (positionNumber == 8) return POP_CATEGORY;
    if (positionNumber == 1) return SCIENCE_CATEGORY;
    if (positionNumber == 5) return SCIENCE_CATEGORY;
    if (positionNumber == 9) return SCIENCE_CATEGORY;
    if (positionNumber == 2) return SPORTS_CATEGORY;
    if (positionNumber == 6) return SPORTS_CATEGORY;
    if (positionNumber == 10) return SPORTS_CATEGORY;
    return ROCK_CATEGORY;
  }

  moveForward(currentPositionIndex: number, roll: number): Position {
    let newPositionIndex = currentPositionIndex + roll;
    if (newPositionIndex >= this.boardSize) {
      newPositionIndex = newPositionIndex - this.boardSize;
    }
    return this.positions[newPositionIndex];
  }
}
