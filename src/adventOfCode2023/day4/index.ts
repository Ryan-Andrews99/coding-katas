import { readTxtFile } from "../util/readTxtFile";
const input = readTxtFile("src/adventOfCode2023/day4/input.txt");

export const filterToMatches = (
  winningNums: string[],
  cardNums: string[]
): string[] => cardNums.filter((cardNum) => winningNums.includes(cardNum));

export const increaseScore = (score: number) => (score === 0 ? 1 : score * 2);
export const isNumber = (char: string): boolean => !isNaN(Number(char));

export const returnAnswerPart1 = (input: string) =>
  input
    .split("\n")
    .map((rowNums) =>
      rowNums
        .trim()
        .split("|")
        .map((card) =>
          card
            .split(" ")
            .filter((num) => num.length > 0)
            .filter((num) => isNumber(num))
        )
    )
    .map(([winnerNums, cardNums]) => filterToMatches(winnerNums, cardNums))
    .filter((matchingNums) => matchingNums.length > 0)
    .map((matchingNums) =>
      matchingNums.reduce((sum, num) => (sum = increaseScore(sum)), 0)
    )
    .reduce((sum, num) => (sum += num), 0);

console.log(returnAnswerPart1(input));

export const numberOfScratchies = (winningNums: number[]) => {
  const nums: number[] = Array(winningNums.length).fill(1);
  winningNums.forEach((num, index) => {
    for (let i = 0; i < num; i++) {
      nums[index + i + 1] = nums[index + i + 1] + 1 * nums[index];
    }
  });
  return nums;
};

export const returnAnswerPart2 = (input: string) => numberOfScratchies(input
    .split("\n")
    .map((rowNums) =>
      rowNums
        .trim()
        .split("|")
        .map((card) =>
          card
            .split(" ")
            .filter((num) => num.length > 0)
            .filter((num) => isNumber(num))
        )
    )
    .map(([winnerNums, cardNums]) => filterToMatches(winnerNums, cardNums))
    .map((matchingNums) => matchingNums.length))
    .reduce((num, sum) => sum += num, 0)

console.log(returnAnswerPart2(input));
