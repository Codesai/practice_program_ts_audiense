# Interactive Tic Tac Toe kata.

A kata to practice using TDD with test doubles.

## The game.

Tic-tac-toe is a game played on a three-by-three grid by two players, who alternately place the marks X and O in one of
the nine fields in the grid.

Tic Tac Toe rules are summarized below:

- A game is over when all fields in a row are taken by a player.
- Players take turns taking fields until the game is over.
- A game is over when all fields in a diagonal are taken by a player.
- A game is over when all fields are taken.
- There are two players in the game (X and O).
- A game has nine fields in a 3x3 grid.
- A game is over when all fields in a column are taken by a player.
- A player can take a field if it is not already taken.
- X player always starts the game.
- A player only changes his turn when he chooses a valid field.
- A player takes the field using a number from 1 to 9. The correspondence from numbers to fields is indicated in the
  following figure:

```
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
```

These are possible states of the game (a number indicates that no player has taken the field):

```
1 | 2 | 3      X | 2 | X      X | O | X
---------      ---------      --------- 
4 | 5 | 6      O | X | 6      O | O | X 
---------      ---------      ---------
7 | 8 | 9      7 | O | X      O | X | X 
```

## The interactive game.

### The course of the game.

* Each player indicates the field that they would like to take passing its corresponding number through their own
  console (there are two independent consoles).

For example:

When the game is started the `X` player will see the following on their console:

```
playerX$  

1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9

your turn...

playerX$  

```

Then, if the `X` player takes the `1` field, `X` player's console will show:

```
playerX$ 1 

X | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
```

and `O` player's console will show:

```
playerO$  

X | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9

your turn...

playerO$  
```

Then, if `O` player takes the `5` field, `O` player's console will show:

```
playerO$ 5 

X | 2 | 3
---------
4 | O | 6
---------
7 | 8 | 9

```

and `X` player's console will show:

```
playerX$ 

X | 2 | 3
---------
4 | O | 6
---------
X | 8 | 9

your turn...

playerX$ 
```

And so on until the game is over.

### How the game ends?

There are two options:

a. If any player wins the game, both consoles will show the result.

If, for example, the `X` player wins both consoles will show:

```
X | O | X
--------- 
O | O | X 
---------
O | X | X 

X wins!
```

b. If the game ends without a winner both consoles will show:

```
X | O | X
--------- 
O | X | O 
---------
O | X | X 

Draw!
```

## Constraint.

The interface (public methods) of the `TicTacToeGame` class is:

```ts
start(): void;
```

Inspired by https://kata-log.rocks/tic-tac-toe-kata
