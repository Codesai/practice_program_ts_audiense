# Tennis Game Score Board kata

A kata to practice using test doubles

## What we need to build.

Tennis has a rather quirky scoring system, and to newcomers it can be a little difficult to keep track of.
The tennis society has contracted you to build a tennis game scoreboard to display the current score during tennis games.

Tennis scores is summarized below:

- A game is won by the first player to have won at least four points in total and at least two points more than the opponent.
- The running score of each game is described in a manner peculiar to tennis: scores from zero to three points are described as “Love”, “Fifteen”, “Thirty”, and “Forty” respectively.
- If at least three points have been scored by each player, and the scores are equal, the score is “Deuce”.
- If at least three points have been scored by each side and a player has one more point than his opponent, the score of the game is “Advantage” for the player in the lead.

The game score board application will read from the console messages from the referees telling which player has scored.

> $ score 1

means that the first player has scored, and

> $ score 2

means that the second player has scored

After receiving a referee input, the program displays on the console the current score of the game.

For example:

> $ score 1
>
> Fifteen Love
>
> $ score 1
>
> Thirty Love
>
> $ score 2
>
> Thirty Fifteen
>
> $ score 1
>
> Forty Fifteen
>
> ...

When one of the players wins the game, the game score board application will displays the winner on the console and stop.

For example, if the player 1 wins it will show the following message:

> Player 1 has won!!
>
> It was a nice game.
>
> Bye now!

## Constraints.

The interface (public methods) of the `GameScoreBoard` class is:

```c#
startGame(): void
```

## Hints.

Read about the [State design pattern](https://en.wikipedia.org/wiki/State_pattern).
