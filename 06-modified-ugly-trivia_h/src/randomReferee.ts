import {Referee} from "./referee";

export class RandomReferee implements Referee {
    isAnswerWrong(): boolean {
        return Math.floor(Math.random() * 10) == 7;
    }
}