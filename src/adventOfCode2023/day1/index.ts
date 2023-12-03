import { readTxtFile } from "../util/readTxtFile";

// const input = readTxtFile('src/adventOfCode2023/day1/input.txt')

export const wordsToNums: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

// Start solution
export const isNumber = (char: string): boolean => !isNaN(Number(char));

export const combineFirstAndLastDigit = (nums: string[]): number =>
  Number(`${nums[0]}${nums[nums.length - 1]}`);

export const replaceWordNumbersWithDigits = (
  str: string,
  numbersAsWords: string[],
  wordsToNums: Record<string, number>,
): string =>
  str.split("").reduce((ogString, char, index) => {
    if (isNumber(char)) return ogString;
    const potentialNumber = numbersAsWords.filter((number) =>
      number.includes(`${str[index]}${str[index + 1]}`),
    )[0]; //our words are unique for >1 letter
    return ogString.replace(potentialNumber, `${wordsToNums[potentialNumber]}`);
  }, str);

//Part 1
export const returnAnswer = (input: string): number =>
  input
    .split("\n")
    .map((line) => line.split("").filter((char) => isNumber(char)))
    .map((nums) => combineFirstAndLastDigit(nums))
    .reduce((sum, num) => (sum += num), 0);

//part 2
export const returnAnswerPart2 = (input: string) =>
  input
    .split("\n")
    .map((line) =>
      replaceWordNumbersWithDigits(line, Object.keys(wordsToNums), wordsToNums),
    )
    .map((line) => line.split("").filter((char) => isNumber(char)))
    .map((nums) => combineFirstAndLastDigit(nums))
    .reduce((sum, num) => (sum += num), 0);

// console.log(returnAnswerPart2(input))
