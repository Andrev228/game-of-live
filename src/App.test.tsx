import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App, { MATRIX_SIZE, TICK_TIMES_MS } from './App';

jest.useFakeTimers();

test('should render matrix with the provided size', () => {
  render(<App />);
  const cells = screen.getAllByTestId(/cell-\d+-\d+/);
  expect(cells).toHaveLength(MATRIX_SIZE * MATRIX_SIZE);
});

test(`should update matrix after ${TICK_TIMES_MS}ms`, async () => {
  const { getAllByTestId } = render(<App />);
  const initialCells = getAllByTestId(/cell-\d+-\d+/).map(cell => cell.className);
  jest.advanceTimersByTime(400);
  await waitFor(() => {
    const updatedCells = getAllByTestId(/cell-\d+-\d+/).map(cell => cell.className);
    expect(updatedCells).not.toEqual(initialCells);
  });
});
