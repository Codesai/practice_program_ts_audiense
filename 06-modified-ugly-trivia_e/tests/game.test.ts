import {Notifier} from "../src/notifier";
import {Game} from "../src/game";
import {capture, instance, mock} from "ts-mockito";

describe("Ugly trivia", () => {
    let notifier: Notifier;

    it("a repeatable simulation with high coverage", () => {
        const expectedNotifications = [
            ["Chet was added"],
            ["They are player number 1"],
            ["Pat was added"],
            ["They are player number 2"],
            ["Sue was added"],
            ["They are player number 3"],
            ["Ramon was added"],
            ["They are player number 4"],
            ["Juan was added"],
            ["They are player number 5"],
            ["Maria was added"],
            ["They are player number 6"],
            ["Laura was added"],
            ["They are player number 7"],
            ["Chet is the current player"],
            ["They have rolled a 6"],
            ["Chet's new location is 6"],
            ["The category is Sports"],
            ["Sports Question 0"],
            ["Answer was correct!!!!"],
            ["Chet now has 1 Gold Coins."],
            ["Pat is the current player"],
            ["They have rolled a 3"],
            ["Pat's new location is 3"],
            ["The category is Rock"],
            ["Rock Question 0"],
            ["Answer was correct!!!!"],
            ["Pat now has 1 Gold Coins."],
            ["Sue is the current player"],
            ["They have rolled a 1"],
            ["Sue's new location is 1"],
            ["The category is Science"],
            ["Science Question 0"],
            ["Answer was correct!!!!"],
            ["Sue now has 1 Gold Coins."],
            ["Ramon is the current player"],
            ["They have rolled a 1"],
            ["Ramon's new location is 1"],
            ["The category is Science"],
            ["Science Question 1"],
            ["Answer was correct!!!!"],
            ["Ramon now has 1 Gold Coins."],
            ["Juan is the current player"],
            ["They have rolled a 2"],
            ["Juan's new location is 2"],
            ["The category is Sports"],
            ["Sports Question 1"],
            ["Answer was correct!!!!"],
            ["Juan now has 1 Gold Coins."],
            ["Maria is the current player"],
            ["They have rolled a 1"],
            ["Maria's new location is 1"],
            ["The category is Science"],
            ["Science Question 2"],
            ["Answer was correct!!!!"],
            ["Maria now has 1 Gold Coins."],
            ["Laura is the current player"],
            ["They have rolled a 6"],
            ["Laura's new location is 6"],
            ["The category is Sports"],
            ["Sports Question 2"],
            ["Answer was correct!!!!"],
            ["Laura now has 1 Gold Coins."],
            ["Chet is the current player"],
            ["They have rolled a 1"],
            ["Chet's new location is 7"],
            ["The category is Rock"],
            ["Rock Question 1"],
            ["Answer was correct!!!!"],
            ["Chet now has 2 Gold Coins."],
            ["Pat is the current player"],
            ["They have rolled a 1"],
            ["Pat's new location is 4"],
            ["The category is Pop"],
            ["Pop Question 0"],
            ["Answer was correct!!!!"],
            ["Pat now has 2 Gold Coins."],
            ["Sue is the current player"],
            ["They have rolled a 4"],
            ["Sue's new location is 5"],
            ["The category is Science"],
            ["Science Question 3"],
            ["Answer was correct!!!!"],
            ["Sue now has 2 Gold Coins."],
            ["Ramon is the current player"],
            ["They have rolled a 4"],
            ["Ramon's new location is 5"],
            ["The category is Science"],
            ["Science Question 4"],
            ["Answer was correct!!!!"],
            ["Ramon now has 2 Gold Coins."],
            ["Juan is the current player"],
            ["They have rolled a 3"],
            ["Juan's new location is 5"],
            ["The category is Science"],
            ["Science Question 5"],
            ["Answer was correct!!!!"],
            ["Juan now has 2 Gold Coins."],
            ["Maria is the current player"],
            ["They have rolled a 2"],
            ["Maria's new location is 3"],
            ["The category is Rock"],
            ["Rock Question 2"],
            ["Answer was correct!!!!"],
            ["Maria now has 2 Gold Coins."],
            ["Laura is the current player"],
            ["They have rolled a 1"],
            ["Laura's new location is 7"],
            ["The category is Rock"],
            ["Rock Question 3"],
            ["Question was incorrectly answered"],
            ["Laura was sent to the penalty box"],
            ["Chet is the current player"],
            ["They have rolled a 4"],
            ["Chet's new location is 11"],
            ["The category is Rock"],
            ["Rock Question 4"],
            ["Answer was correct!!!!"],
            ["Chet now has 3 Gold Coins."],
            ["Pat is the current player"],
            ["They have rolled a 3"],
            ["Pat's new location is 7"],
            ["The category is Rock"],
            ["Rock Question 5"],
            ["Answer was correct!!!!"],
            ["Pat now has 3 Gold Coins."],
            ["Sue is the current player"],
            ["They have rolled a 4"],
            ["Sue's new location is 9"],
            ["The category is Science"],
            ["Science Question 6"],
            ["Question was incorrectly answered"],
            ["Sue was sent to the penalty box"],
            ["Ramon is the current player"],
            ["They have rolled a 1"],
            ["Ramon's new location is 6"],
            ["The category is Sports"],
            ["Sports Question 3"],
            ["Answer was correct!!!!"],
            ["Ramon now has 3 Gold Coins."],
            ["Juan is the current player"],
            ["They have rolled a 1"],
            ["Juan's new location is 6"],
            ["The category is Sports"],
            ["Sports Question 4"],
            ["Answer was correct!!!!"],
            ["Juan now has 3 Gold Coins."],
            ["Maria is the current player"],
            ["They have rolled a 6"],
            ["Maria's new location is 9"],
            ["The category is Science"],
            ["Science Question 7"],
            ["Answer was correct!!!!"],
            ["Maria now has 3 Gold Coins."],
            ["Laura is the current player"],
            ["They have rolled a 4"],
            ["Laura is not getting out of the penalty box"],
            ["Chet is the current player"],
            ["They have rolled a 2"],
            ["Chet's new location is 1"],
            ["The category is Science"],
            ["Science Question 8"],
            ["Answer was correct!!!!"],
            ["Chet now has 4 Gold Coins."],
            ["Pat is the current player"],
            ["They have rolled a 2"],
            ["Pat's new location is 9"],
            ["The category is Science"],
            ["Science Question 9"],
            ["Answer was correct!!!!"],
            ["Pat now has 4 Gold Coins."],
            ["Sue is the current player"],
            ["They have rolled a 3"],
            ["Sue is getting out of the penalty box"],
            ["Sue's new location is 0"],
            ["The category is Pop"],
            ["Pop Question 1"],
            ["Answer was correct!!!!"],
            ["Sue now has 3 Gold Coins."],
            ["Ramon is the current player"],
            ["They have rolled a 1"],
            ["Ramon's new location is 7"],
            ["The category is Rock"],
            ["Rock Question 6"],
            ["Answer was correct!!!!"],
            ["Ramon now has 4 Gold Coins."],
            ["Juan is the current player"],
            ["They have rolled a 5"],
            ["Juan's new location is 11"],
            ["The category is Rock"],
            ["Rock Question 7"],
            ["Answer was correct!!!!"],
            ["Juan now has 4 Gold Coins."],
            ["Maria is the current player"],
            ["They have rolled a 6"],
            ["Maria's new location is 3"],
            ["The category is Rock"],
            ["Rock Question 8"],
            ["Answer was correct!!!!"],
            ["Maria now has 4 Gold Coins."],
            ["Laura is the current player"],
            ["They have rolled a 1"],
            ["Laura is getting out of the penalty box"],
            ["Laura's new location is 8"],
            ["The category is Pop"],
            ["Pop Question 2"],
            ["Answer was correct!!!!"],
            ["Laura now has 2 Gold Coins."],
            ["Chet is the current player"],
            ["They have rolled a 1"],
            ["Chet's new location is 2"],
            ["The category is Sports"],
            ["Sports Question 5"],
            ["Answer was correct!!!!"],
            ["Chet now has 5 Gold Coins."],
            ["Pat is the current player"],
            ["They have rolled a 2"],
            ["Pat's new location is 11"],
            ["The category is Rock"],
            ["Rock Question 9"],
            ["Answer was correct!!!!"],
            ["Pat now has 5 Gold Coins."],
            ["Sue is the current player"],
            ["They have rolled a 2"],
            ["Sue is not getting out of the penalty box"],
            ["Ramon is the current player"],
            ["They have rolled a 3"],
            ["Ramon's new location is 10"],
            ["The category is Sports"],
            ["Sports Question 6"],
            ["Answer was correct!!!!"],
            ["Ramon now has 5 Gold Coins."],
            ["Juan is the current player"],
            ["They have rolled a 6"],
            ["Juan's new location is 5"],
            ["The category is Science"],
            ["Science Question 10"],
            ["Question was incorrectly answered"],
            ["Juan was sent to the penalty box"],
            ["Maria is the current player"],
            ["They have rolled a 1"],
            ["Maria's new location is 4"],
            ["The category is Pop"],
            ["Pop Question 3"],
            ["Answer was correct!!!!"],
            ["Maria now has 5 Gold Coins."],
            ["Laura is the current player"],
            ["They have rolled a 3"],
            ["Laura is getting out of the penalty box"],
            ["Laura's new location is 11"],
            ["The category is Rock"],
            ["Rock Question 10"],
            ["Answer was correct!!!!"],
            ["Laura now has 3 Gold Coins."],
            ["Chet is the current player"],
            ["They have rolled a 2"],
            ["Chet's new location is 4"],
            ["The category is Pop"],
            ["Pop Question 4"],
            ["Answer was correct!!!!"],
            ["Chet now has 6 Gold Coins."],
        ];

        const rollNumbers: Array<number> = [
            6, 3, 1, 1, 2, 1, 6, 1, 1, 4, 4, 3, 2, 1, 4, 3, 4, 1, 1, 6, 4, 2, 2, 3, 1,
            5, 6, 1, 1, 2, 2, 3, 6, 1, 3, 2,
        ];

        const answersAreWrong: Array<boolean> = [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
        ];

        notifier = mock<Notifier>();

        const game = new ExtendedGame(
            rollNumbers,
            answersAreWrong,
            instance(notifier)
        );

        game.add("Chet");
        game.add("Pat");
        game.add("Sue");
        game.add("Ramon");
        game.add("Juan");
        game.add("Maria");
        game.add("Laura");

        game.run();

        const notifications = getCallsArguments();
        expect(notifications).toEqual(expectedNotifications);
    });

    class ExtendedGame extends Game {
        private readonly rollNumbers: Array<number>;
        private readonly answersAreWrong: Array<boolean>;
        private isAnswerWrongCalls: number;
        private getRollNumberCalls: number;
        public log: Array<string | undefined>;

        constructor(
            rollNumbers: Array<number>,
            answersAreWrong: Array<boolean>,
            notifier: Notifier
        ) {
            super(notifier);
            this.rollNumbers = rollNumbers;
            this.answersAreWrong = answersAreWrong;
            this.isAnswerWrongCalls = 0;
            this.getRollNumberCalls = 0;
            this.log = [];
        }

        protected isAnswerWrong(): boolean {
            const value = this.answersAreWrong[this.isAnswerWrongCalls];
            this.isAnswerWrongCalls++;
            return value;
        }

        protected getRollNumber(): number {
            const value = this.rollNumbers[this.getRollNumberCalls];
            this.getRollNumberCalls++;
            return value;
        }
    }

    function getCallsArguments() {
        const calls: { actions: Array<{ args: Array<string> }> } = capture(
            notifier.notify
        ) as any as { actions: Array<{ args: Array<string> }> };
        const notifications = calls["actions"].map((item) => item["args"]);
        return notifications;
    }
});