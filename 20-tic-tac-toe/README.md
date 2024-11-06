# Interactive Tic Tac Toe kata

A kata to practice using test doubles

## What we need to build

Tic-tac-toe is a game played on a three-by-three grid by two players, who alternately place the marks X and O in one of the nine spaces in the grid.

Tic Tac Toe rules are summarized below:

- A game is over when all fields in a row are taken by a player
- Players take turns taking fields until the game is over
- A game is over when all fields in a diagonal are taken by a player
- A game is over when all fields are taken
- There are two players in the game (X and O)
- A game has nine fields in a 3x3 grid
- A game is over when all fields in a column are taken by a player
- A player can take a field if not already taken
- X player always starts the game
- A player only changes his turn when he chooses a valid field
- A player takes the field using a number from 1 to 9
```
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
```

These are possible outputs of the game:

```
1 | 2 | 3      X | 2 | X      X | O | X
---------      ---------      --------- 
4 | 5 | 6      O | X | 6      O | O | X 
---------      ---------      ---------
7 | 8 | 9      7 | O | X      O | X | X 
```

Each player will indicate the play through his own console.

For example:

```
player1$  

1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9

you turn...
player1$  

```
Player takes the 1 field
```
player1$ 1 

X | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
```
In the player 2 console shows:
```
player2$  

X | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9

you turn...
player2$  
```
Player takes the 5 field
```
player2$ 5 

X | 2 | 3
---------
4 | O | 6
---------
7 | 8 | 9

```
In the player 1 console shows:
```
player1$ 

X | 2 | 3
---------
4 | O | 6
---------
X | 8 | 9

you turn...
player1$ 
```
And so on until game is over:

A) Some wins the game in both console shows:
```
X | O | X
--------- 
O | O | X 
---------
O | X | X 

Player 1 wins
```

B) There is a draw in both console shows:
```
X | O | X
--------- 
O | X | O 
---------
O | X | X 

Draw!
```

## Hint

The interface (public methods) of the `TicTacToeGame` class is:

```ts#
start(): void
```


Inspired by https://kata-log.rocks/tic-tac-toe-kata