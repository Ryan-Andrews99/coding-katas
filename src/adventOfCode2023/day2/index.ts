import { readTxtFile } from "../util/readTxtFile";

const input = readTxtFile("src/adventOfCode2023/day2/input.txt");

// start solution
export const extractGameNumber = (gameRow: string): number =>
  Number(gameRow.slice("Game ".length, gameRow.lastIndexOf(":")));

export const isGamePossible = (gameRow: string, cubeLimits: number[]): boolean => {
  const [redMax, greenMax, blueMax] = cubeLimits;
  const gameBlueMax = extractHighestNumberOfCubes(
    Array.from(gameRow.matchAll(/[\d]+ blue/g)),
  );
  const gameGreenMax = extractHighestNumberOfCubes(
    Array.from(gameRow.matchAll(/[\d]+ green/g)),
  );
  const gameRedMax = extractHighestNumberOfCubes(
    Array.from(gameRow.matchAll(/[\d]+ red/g)),
  );

  return (
    gameRedMax <= redMax && gameGreenMax <= greenMax && gameBlueMax <= blueMax
  );
};

export const extractHighestNumberOfCubes = (cubeOccurances: string[][]): number =>
  cubeOccurances
    .flatMap((cubeOccurance) =>
      cubeOccurance[0]
        .split("")
        .filter((char) => !isNaN(Number(char)))
        .join(""),
    )
    .map((num) => Number(num))
    .sort((a, b) => b - a)[0];

export const returnPart1Answer = (input: string):number =>
  input
    .split("\n")
    .filter((row) => isGamePossible(row, [12, 13, 14]))
    .map((row) => extractGameNumber(row.trim()))
    .reduce((sum, num) => (sum += num), 0);

console.log(returnPart1Answer(input));

//part 2

export const gamePowers = (gameRow: string): number => {
  const gameBlueMax = extractHighestNumberOfCubes(
    Array.from(gameRow.matchAll(/[\d]+ blue/g)),
  );
  const gameGreenMax = extractHighestNumberOfCubes(
    Array.from(gameRow.matchAll(/[\d]+ green/g)),
  );
  const gameRedMax = extractHighestNumberOfCubes(
    Array.from(gameRow.matchAll(/[\d]+ red/g)),
  );

  return gameRedMax * gameGreenMax * gameBlueMax
};

export const returnPart2Answer = (input: string): number =>
  input
    .split("\n")
    .map((row) => gamePowers(row.trim()))
    .reduce((sum, num) => (sum += num), 0);

console.log(returnPart2Answer(input));

