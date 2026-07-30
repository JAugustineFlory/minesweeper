# Mine Sweeper 
### By Augustine Incorporated

My take on this globally adored game!
Can you beat all the difficulties?
Can you get the best time?

*Did you find all the easter eggs?*

## Rules:
On each turn, the user clicks on a square to uncover it. If the square:

1. If the selected tile contains a mine, the user loses, and the game is over!

2. If the selected tile is adjacent to a mine, the square displays the total number of mines in the 8 squares around it.

3. If the selected tile is not adjacent to a mine, the square is blank and should behave as if the 8 adjacent squares were also clicked. 
- For each of those squares, their neighboring squares continue to be revealed in each direction (i.e., this step is applied recursively to all neighboring squares) until the edge of the board is reached or until a square is reached that is adjacent to a mine, in which case the previous rule applies.
*This rule winds up uncovering large areas of the board in one turn. This helps speed up gameplay.*

**4. The user wins when they uncover all squares that don’t have mines.**

----------
## Current Version: 0.0.0 | Scaffolding! update

### Features: 
- *None*
- **Look out for more in the next update!**

## Next Version: 0.1.0 | I can play! update

### Upcoming Versions & Features:
#### 0.1.0
##### Adds:
- **Beginner Mode**
    - 10 x 10 grid
    - Number of bombs remaining (10)
    - Timer to track score
    - Button to reset progress
    - Clicking tiles reveals what's underneath
        - Bombs placed randomly
        - Number displaying how many bombs are next to that tile
##### Fixes:
- N/A
----



#### 0.1.1
##### Adds:
-
##### Fixes:
-
-------
## Road Map