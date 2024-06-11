const CHANCE_OF_ALIVE_CELL = 0.75;

export const generateMatrix = (MATRIX_SIZE: number): number[][] => {
    const rows = [];

    for (let i = 0; i < MATRIX_SIZE; i++) {
        const row = [];
        for (let j = 0; j < MATRIX_SIZE; j++) {
            const cellStatus = Math.random() > CHANCE_OF_ALIVE_CELL ? 1 : 0;
            row.push(cellStatus);
        }
        rows.push(row);
    }

    return rows;
};

export const getCellStatus = (cellStatus: number, numberOfAdjacentAlive: number) => {
    /*
      Condition to cover AC:
      Any live cell with fewer than two live neighbours dies (underpopulation).
      Any live cell with more than three live neighbours dies (overcrowding).
    */ 
    if (cellStatus === 1 && (numberOfAdjacentAlive < 2 || numberOfAdjacentAlive > 3)) {
      return 0;
    }
    /*
      Condition to cover AC:
      Any dead cell with exactly three live neighbours becomes a live cell (reproduction).
    */
    if (numberOfAdjacentAlive === 3) {
      return 1;
    }
  
    // Otherwise: Any live cell with two or three live neighbours lives on to the next generation.
    return cellStatus;
};

// O(1)
export const countAdjacentAliveCells = (matrix: number[][], x: number, y: number): number => {
    let adjacentAliveCellsNumber = 0;
  
    for (let i = Math.max(0, x - 1); i <= Math.min(matrix.length - 1, x + 1); i++) {
        for (let j = Math.max(0, y - 1); j <= Math.min(matrix[i].length - 1, y + 1); j++) {
            // skip the current element
            if (i === x && j === y) continue;
  
            adjacentAliveCellsNumber += matrix[i][j];
        }
    }
  
    return adjacentAliveCellsNumber;
};
