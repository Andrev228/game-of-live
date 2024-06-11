import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { generateMatrix, getCellStatus, countAdjacentAliveCells } from './utils';
import './App.css';

export const MATRIX_SIZE = 50;
export const TICK_TIMES_MS = 400;

type MatrixType = number[][];

const App: React.FC = () => {
  const [matrix, setMatrix] = useState<MatrixType>(generateMatrix(MATRIX_SIZE));

  const tick = useCallback(() => {
    setMatrix((oldMatrix) => {
      const newMatrix = oldMatrix.map((row, rowIndex) => row.map((cell, cellIndex) => {
          const numberOfAdjacentAlive = countAdjacentAliveCells(oldMatrix, rowIndex, cellIndex);
          
          return getCellStatus(cell, numberOfAdjacentAlive);
        })
      );

      return newMatrix;
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(tick, TICK_TIMES_MS);
    return () => clearInterval(intervalId);
  }, [tick]);

  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <div
            key={`${rowIndex}-${cellIndex}`}
            data-testid={`cell-${rowIndex}-${cellIndex}`}
            className={clsx('cell', { alive: Boolean(cell) })}
          />))
      )}
    </div>
  );
};

export default App;
