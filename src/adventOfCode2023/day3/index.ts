import { readTxtFile } from "../util/readTxtFile";

export const isNumber = (char: string): boolean => !isNaN(Number(char));

export const isSymbol = (char: string): boolean =>
  !isNumber(char) && char !== ".";

export const returnNeighbours = (
  matrix: string[][],
  position: number[]
): string[] => {
  const [row, col] = position;
  return [
    matrix[row][col - 1], //x y-1
    matrix[row][col + 1], //x y-1
    !matrix[row - 1] ? [][col] : matrix[row - 1][col], //nasty attempt to handle undefined indexing
    !matrix[row + 1] ? [][col] : matrix[row + 1][col],
    !matrix[row + 1] ? [][col - 1] : matrix[row + 1][col - 1],
    !matrix[row - 1] ? [][col + 1] : matrix[row - 1][col + 1],
    !matrix[row - 1] ? [][col - 1] : matrix[row - 1][col - 1],
    !matrix[row + 1] ? [][col + 1] : matrix[row + 1][col + 1],
  ].filter((neighbour) => !!neighbour);
};

export const lookForNumbers = (
  matrix: string[][],
  position: number[]
): string => {
  const [row, col] = position;
  let numString = matrix[row][col];
  let i = col;

  while (isNumber(matrix[row][i + 1])) {
    numString = numString + matrix[row][i + 1];
    i++;
  }

  i = col;

  while (isNumber(matrix[row][i - 1])) {
    numString = matrix[row][i - 1] + numString;
    i--;
  }

  return numString.trim();
};

const shouldSkip = (
  char: string,
  matrix: string[][],
  rowIndex: number,
  colIndex: number
): boolean =>
  isNumber(char) &&
  isNumber(matrix[rowIndex][colIndex + 1]) && //look ahead
  returnNeighbours(matrix, [rowIndex, colIndex + 1]).some((neighbour) =>
    isSymbol(neighbour)
  );

/*
  this handles the case
  .*..
  789.
  ....
  */

export const returnAnswerPart1 = (input: string): number => {
  const matrix = input.split("\n").map((row) => row.trim().split(""));

  return matrix.reduce((sum: number, row: string[], rowIndex: number) => {
    row.forEach((char, colIndex) => {
      if (shouldSkip(char, matrix, rowIndex, colIndex)) return sum;
      else if (
        isNumber(char) &&
        returnNeighbours(matrix, [rowIndex, colIndex]).some((neighbour) =>
          isSymbol(neighbour)
        )
      ) {
        sum += Number(lookForNumbers(matrix, [rowIndex, colIndex]));
      }
    });

    return sum;
  }, 0);
};

const input = readTxtFile("src/adventOfCode2023/day3/input.txt");
// console.log(returnAnswerPart1(input));

//part 2
export const isGear = (char: string): boolean => char === "*";

export const returnNeighbourCoords = (
  rowIndex: number,
  colIndex: number
): (number | undefined)[][] =>
  [
    [rowIndex, colIndex - 1],
    [rowIndex, colIndex + 1],
    [rowIndex - 1, colIndex],
    [rowIndex + 1, colIndex],
    [rowIndex + 1, colIndex - 1],
    [rowIndex - 1, colIndex + 1],
    [rowIndex - 1, colIndex - 1],
    [rowIndex + 1, colIndex + 1],
  ].map(([rowIndex, colIndex]) =>
    rowIndex < 0 || colIndex < 0 ? [undefined] : [rowIndex, colIndex]
  );

export const returnCoords = (
  matrix: string[][],
  checkFunction: (char: string) => boolean
): number[][] =>
  matrix.flatMap((row, rowIndex) =>
    row
      .map((char, colIndex) => {
        if (checkFunction(char)) {
          return [rowIndex, colIndex];
        } else return [];
      })
      .filter((coord) => coord.length == 2)
  );

export const returnNumsFromValidGears = (
  numberCoords: number[][],
  gearCoords: number[][],
  matrix: string[][]
) =>
  gearCoords
    .map(([gearRow, gearCol]) =>
      returnNeighbourCoords(gearRow, gearCol).filter((neighbour) =>
        numberCoords.some((coords) =>
          coords.every((item, index) => item === neighbour[index])
        )
      )
    )
    .map((coords) =>
      coords.map((coord) => lookForNumbers(matrix, coord as number[]))
    )
    .filter((nums) => nums.length >= 2)
    .map((nums) => new Set(nums))
    .map((numSet) => Array.from(numSet))
    .filter((nums) => nums.length === 2)
    .map(nums => nums.map(num => Number(num)) )
    .map(nums => nums[0]*nums[1])
    .reduce((sum, num) => sum += num)

export const returnAnswerPart2 = (input: string) => {
  const matrix = input.split("\n").map((row) => row.trim().split(""));
  const gearCoords = returnCoords(matrix, isGear);
  const numberCoords = returnCoords(matrix, isNumber);
  return returnNumsFromValidGears(numberCoords, gearCoords, matrix);
};

console.log(returnAnswerPart2(input))

