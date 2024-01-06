import {
  findNode,
  findNextNode,
  parseInput,
  traverseNodes,
  part1NodeMatch,
  greatestCommonDivisor,
  lowestCommonMultiple,
} from "./index";

describe("parseInput tests", () => {
  it("parses the input correctly", () => {
    expect(
      parseInput(`RL

        AAA = (BBB, CCC)
        BBB = (DDD, EEE)
        CCC = (ZZZ, GGG)
        DDD = (DDD, DDD)
        EEE = (EEE, EEE)
        GGG = (GGG, GGG)
        ZZZ = (ZZZ, ZZZ)`),
    ).toStrictEqual([
      ["R", "L"],
      [
        ["AAA", "BBB", "CCC"],
        ["BBB", "DDD", "EEE"],
        ["CCC", "ZZZ", "GGG"],
        ["DDD", "DDD", "DDD"],
        ["EEE", "EEE", "EEE"],
        ["GGG", "GGG", "GGG"],
        ["ZZZ", "ZZZ", "ZZZ"],
      ],
    ]);
  });
});

describe("findNode tests", () => {
  it("finds a given node", () => {
    expect(
      findNode("AAA", [
        ["AAA", "BBB", "CCC"],
        ["BBB", "DDD", "EEE"],
        ["CCC", "ZZZ", "GGG"],
        ["DDD", "DDD", "DDD"],
        ["EEE", "EEE", "EEE"],
        ["GGG", "GGG", "GGG"],
        ["ZZZ", "ZZZ", "ZZZ"],
      ]),
    ).toStrictEqual(["AAA", "BBB", "CCC"]);
  });

  it("throws an error for missing node", () => {
    expect(() =>
      findNode("FFF", [
        ["AAA", "BBB", "CCC"],
        ["BBB", "DDD", "EEE"],
        ["CCC", "ZZZ", "GGG"],
        ["DDD", "DDD", "DDD"],
        ["EEE", "EEE", "EEE"],
        ["GGG", "GGG", "GGG"],
        ["ZZZ", "ZZZ", "ZZZ"],
      ]),
    ).toThrowError("Invalid number of nodes returned: 0");
  });

  it("throws for duplicate nodes", () => {
    expect(() =>
      findNode("AAA", [
        ["AAA", "BBB", "CCC"],
        ["AAA", "DDD", "EEE"],
        ["CCC", "ZZZ", "GGG"],
        ["DDD", "DDD", "DDD"],
        ["EEE", "EEE", "EEE"],
        ["GGG", "GGG", "GGG"],
        ["ZZZ", "ZZZ", "ZZZ"],
      ]),
    ).toThrowError("Invalid number of nodes returned: 2");
  });
});

describe("nextNode tests", () => {
  it("finds the next node given a direction and a current node", () => {
    expect(findNextNode(["AAA", "BBB", "CCC"], "L")).toStrictEqual("BBB");
  });
});

describe("traverseNodes tests", () => {
  it("traverses the nodes until ZZZ is the current node", () => {
    expect(
      traverseNodes(
        ["R", "L"],
        [
          ["AAA", "BBB", "CCC"],
          ["BBB", "DDD", "EEE"],
          ["CCC", "ZZZ", "GGG"],
          ["DDD", "DDD", "DDD"],
          ["EEE", "EEE", "EEE"],
          ["GGG", "GGG", "GGG"],
          ["ZZZ", "ZZZ", "ZZZ"],
        ],
        part1NodeMatch,
      ),
    ).toStrictEqual(2);
  });
});

describe("gcd tests", () => {
  it("finds the gcd", () => {
    expect(greatestCommonDivisor(54, 24)).toStrictEqual(6);
  });
});

describe("lcm tests", () => {
  it("lcm", () => {
    expect(lowestCommonMultiple(12, 15)).toStrictEqual(60);
  });
});
