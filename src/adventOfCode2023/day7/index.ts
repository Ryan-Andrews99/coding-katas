import { readTxtFile } from "../util/readTxtFile";
import { performance } from "perf_hooks";

export const cardVals = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
} as const;

export const parseInput = (input: string): [string, number][] =>
  input
    .split("\n")
    .map((line) => line.trim().split(" "))
    .map(([hand, bid]) => [hand, Number(bid)]);

export const handStrength = (hand: string): number => {
  const cardOccurances = Object.values(
    hand
      .split("")
      .reduce(
        (acc: Record<string, number>, char) =>
          acc[char] === undefined
            ? { ...acc, [char]: 1 }
            : { ...acc, [char]: acc[char] + 1 },
        {}
      )
  ).sort((a, b) => b - a);
  const [firstCardCount, secondCardCount] = cardOccurances;

  if (firstCardCount === 5) return 7;
  else if (firstCardCount === 4 && secondCardCount === 1) return 6;
  else if (firstCardCount === 3 && secondCardCount === 2) return 5;
  else if (firstCardCount === 3 && secondCardCount === 1) return 4;
  else if (firstCardCount === 2 && secondCardCount === 2) return 3;
  else if (firstCardCount === 2 && secondCardCount === 1) return 2;
  else if (firstCardCount === 1 && secondCardCount === 1) return 1;
  else throw new Error("Invalid hand");
};

export const attachScore = (
  hand: [string, number], 
  handStrength: (hand: string) => number
): [string, number, number] => [...hand, handStrength(hand[0])];

export const sortCards = (
  handsWithScores: [string, number, number][],
  cardVals: Record<string, number>
) =>
  handsWithScores.sort((handA, handB) => {
    if (handA[2] > handB[2]) {
      return 1;
    } else if (handB[2] > handA[2]) {
      return -1;
    } else return compareHands(handA[0], handB[0], cardVals);
  });

export const compareHands = (
  handA: string,
  handB: string,
  cardVals: Record<string, number>
) => {
  // I hate this but I couldn't figure out a way to break out of a reduce function :(
  let sortVal = 0;
  for (let i = 0; i < handA.length; i++) {
    const charA = handA[i] as keyof typeof cardVals;
    const charB = handB[i] as keyof typeof cardVals;
    if (charA === charB) continue;
    else if (cardVals[charA] > cardVals[charB]) {
      sortVal = 1;
      break;
    } else if (cardVals[charB] > cardVals[charA]) {
      sortVal = -1;
      break;
    }
  }
  return sortVal;
};

export const answerPart1 = (input: string) =>
  sortCards(parseInput(input).map(hand => attachScore(hand, handStrength)), cardVals).reduce(
    (product, hand, index) => (product += hand[1] * (index + 1)),
    0
  );

let startTime = performance.now();
console.log(answerPart1(readTxtFile("src/adventOfCode2023/day7/input.txt")));
let endTime = performance.now();
console.log(`Part 1 took ${endTime - startTime} milliseconds`);

const cardValsPart2 = {...cardVals, J : 0} as const

export const handStrengthPart2 = (hand: string): number => {
  const cardOccurances = hand
    .split("")
    .reduce(
      (acc: Record<string, number>, char) =>
        acc[char] === undefined
          ? { ...acc, [char]: 1 }
          : { ...acc, [char]: acc[char] + 1 },
      {}
    );
  const { J: jokerCount, ...cardOccurancesWithoutJokers } = cardOccurances;
  const [firstCardCount, secondCardCount] = Object.values(
    cardOccurancesWithoutJokers
  ).sort((a, b) => b - a);

  if (firstCardCount + (jokerCount ?? 0)  === 5 || jokerCount === 5) return 7;
  else if (firstCardCount + (jokerCount ?? 0) === 4 && secondCardCount === 1)
    return 6;
  else if (firstCardCount + (jokerCount ?? 0) === 3 && secondCardCount === 2)
    return 5;
  else if (firstCardCount + (jokerCount ?? 0) === 3 && secondCardCount === 1)
    return 4;
  else if (firstCardCount + (jokerCount ?? 0) === 2 && secondCardCount === 2)
    return 3;
  else if (firstCardCount + (jokerCount ?? 0) === 2 && secondCardCount === 1)
    return 2;
  else if (firstCardCount + (jokerCount ?? 0) === 1 && secondCardCount === 1)
    return 1;
  else throw new Error(`Invalid hand: ${hand}`);
};


export const answerPart2 = (input: string) =>
  sortCards(parseInput(input).map(hand => attachScore(hand, handStrengthPart2)), cardValsPart2).reduce(
    (product, hand, index) => (product += hand[1] * (index + 1)),
    0
  );

startTime = performance.now();
console.log(answerPart2(readTxtFile("src/adventOfCode2023/day7/input.txt")));
endTime = performance.now();
console.log(`Part 2 took ${endTime - startTime} milliseconds`);
