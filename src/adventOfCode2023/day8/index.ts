import { readTxtFile } from "../util/readTxtFile";

export const parseInput = (input: string): [string[], string[][]] =>
  input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.trim())
    .reduce(
      (parsedInput: [string[], string[][]], line, index) => {
        if (index === 0) {
          return [line.split(""), [...parsedInput[1]]];
        } else
          return [
            parsedInput[0],
            [
              ...parsedInput[1],
              line
                .split("=")
                .flatMap((el) => el.replaceAll(/[()\s]/g, "").split(",")),
            ],
          ];
      },
      [[], []],
    );

export const findNode = (nodeToFind: string, nodes: string[][]): string[] => {
  const matchingNode = nodes.filter((node) => node[0] === nodeToFind);
  if (matchingNode.length !== 1) {
    throw new Error(
      `Invalid number of nodes returned: ${matchingNode.length}, node: ${nodeToFind}`,
    );
  }
  return matchingNode[0];
};

export const findNextNode = (currentNode: string[], direction: string) =>
  direction === "L" ? currentNode[1] : currentNode[2];

export const part1NodeMatch = (node: string): boolean => node === "ZZZ";

export const traverseNodes = (
  directions: string[],
  nodes: string[][],
  matchCondition: (node: string) => boolean,
  currentNode = "AAA",
  index = 0,
  steps = 0,
): number => {
  if (index > directions.length - 1) {
    index = 0;
  }
  const nextNode = findNextNode(
    findNode(currentNode, nodes),
    directions[index],
  );
  if (nextNode === currentNode) {
    throw new Error("AAAA recursive hell :)");
  }
  if (matchCondition(nextNode)) {
    //base case
    return steps + 1;
  } else
    return traverseNodes(
      directions,
      nodes,
      matchCondition,
      nextNode,
      index + 1,
      steps + 1,
    );
  // an attempt at TCO even tho JS doesn't support it
};

const [directions, nodes] = parseInput(
  readTxtFile("src/adventOfCode2023/day8/input.txt"),
);

//to run this you need to increase the max stack size in node
// node --stack-size=15000 -r ts-node/register src/adventOfCode2023/day8/index.ts
let start = performance.now();
console.log(traverseNodes(directions, nodes, part1NodeMatch)); //11911
let end = performance.now();
console.log("part 1 took", end - start); //approx 150ms

//part 2
export const greatestCommonDivisor = (a: number, b: number): number =>
  a ? greatestCommonDivisor(b % a, a) : b;
export const lowestCommonMultiple = (a: number, b: number): number =>
  (a * b) / greatestCommonDivisor(a, b);
const nodesEndingA = nodes.filter((node) => node[0][2] === "A");
const part2NodeMatch = (node: string): boolean => node[2] === "Z";

start = performance.now();
console.log(
  nodesEndingA
    .map((node) => traverseNodes(directions, nodes, part2NodeMatch, node[0]))
    .reduce(lowestCommonMultiple),
); //10151663816849
end = performance.now();
console.log("part 2 took", end - start); //part 2 took 625.1938680000603
