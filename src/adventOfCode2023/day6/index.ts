import { readTxtFile } from "../util/readTxtFile";

export const calculateDistance = (
  speed: number,
  timeRemaining: number,
): number => speed * timeRemaining;

export const calculateRaces = (totalRaceTime: number) =>
  Array(totalRaceTime + 1)
    .fill(0)
    .map((_, index) => index * (totalRaceTime - index));

export const returnAnswerPart1 = (input: string) => {
  const [times, distances] = input
    .split("\n")
    .map((line) => line.trim())
    .map((line) =>
      line
        .split(" ")
        .filter((char) => !isNaN(Number(char.trim())) && char.length > 0)
        .map((char) => Number(char)),
    );

  return times
    .map(
      (time, index) =>
        calculateRaces(time).filter((distance) => distance > distances[index])
          .length,
    )
    .reduce((product, margin) => (product *= margin), 1);
};

const input = readTxtFile("src/adventOfCode2023/day6/input.txt");

console.log(returnAnswerPart1(input));

export const returnAnswerPart2 = (input: string) => {
  const [time, distance] = input
    .split("\n")
    .map((line) => line.trim())
    .map((line) =>
      line
        .split(" ")
        .filter((char) => !isNaN(Number(char.trim())) && char.length > 0)
        .join(""),
    )
    .map((num) => Number(num));

  return calculateRaces(time).filter((dist) => dist > distance).length;
};

console.log(returnAnswerPart2(input));
