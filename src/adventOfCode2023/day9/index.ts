import { readTxtFile } from "../util/readTxtFile";

export const createRanges = (initialRange: number[]): number[][] => {
  const ranges = [initialRange];
  // I did not extract the last val out to a constant as it
  // needs to reevaluated at each run of the while loop
  while (!ranges[ranges.length - 1].every((val) => val === 0)) {
    ranges.push(calcDiffs(ranges[ranges.length - 1]));
  }
  return ranges;
};
export const calcDiffs = (nums: number[]) =>
  nums.reduce((acc: number[], num, index, arr) => {
    if (index === arr.length - 1) {
      return acc;
    } else return [...acc, arr[index + 1] - num];
  }, []);

export const extrapolateForward = (vals: number[][]) =>
  vals
    .reverse()
    .reduce((vals: number[][], row, index) => {
      if (index === 0) {
        return [...vals, [...row, 0]];
      } else {
        const prevRow = vals[index - 1];
        const lastValOfPrevRow = prevRow[prevRow.length - 1];
        return [...vals, [...row, row[row.length - 1] + lastValOfPrevRow]];
      }
    }, [])
    .reverse();

export const returnHistory = (vals: number[][]): number =>
  vals[0][vals[0].length - 1];

export const parseInput = (input: string): number[][] =>
  input.split("\n").map((line) =>
    line
      .split(" ")
      .filter((char) => char.length > 0)
      .map((char) => Number(char.trim())),
  );

export const part1 = (input: string): number =>
  parseInput(input)
    .map(createRanges)
    .map(extrapolateForward)
    .map(returnHistory)
    .reduce((sum, val) => (sum += val), 0);

const input = readTxtFile("src/adventOfCode2023/day9/input.txt");

let start = performance.now();
console.log(part1(input)); // 1762065988
let end = performance.now();
console.log("part 1 took", end - start); //part 1 took 48.73225999996066

export const extrapolateBackwards = (vals: number[][]) =>
  vals
    .reverse()
    .reduce((vals: number[][], row, index) => {
      if (index === 0) {
        return [...vals, [0, ...row]];
      } else {
        const prevRow = vals[index - 1];
        const firstValOfPrevRow = prevRow[0];
        return [...vals, [row[0] - firstValOfPrevRow, ...row]];
      }
    }, [])
    .reverse();

export const returnFirstHistory = (vals: number[][]): number => vals[0][0];

export const part2 = (input: string): number =>
  parseInput(input)
    .map(createRanges)
    .map(extrapolateBackwards)
    .map(returnFirstHistory)
    .reduce((sum, val) => (sum += val), 0);

start = performance.now();
console.log(part2(input)); // 1066
end = performance.now();
console.log("part 2 took", end - start); //part 2 took 21.737158998847008
