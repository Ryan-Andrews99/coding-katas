import {
  calcDiffs,
  createRanges,
  extrapolateBackwards,
  extrapolateForward,
  parseInput,
  part1,
  part2,
  returnHistory,
} from "./index";

describe("createRanges tests", () => {
  it("creates the ranges for test data", () => {
    expect(createRanges([0, 3, 6, 9, 12, 15])).toStrictEqual([
      [0, 3, 6, 9, 12, 15],
      [3, 3, 3, 3, 3],
      [0, 0, 0, 0],
    ]);
  });

  it("creates the ranges for test data", () => {
    expect(createRanges([10, 13, 16, 21, 30, 45])).toStrictEqual([
      [10, 13, 16, 21, 30, 45],
      [3, 3, 5, 9, 15],
      [0, 2, 4, 6],
      [2, 2, 2],
      [0, 0],
    ]);
  });
});

describe("calculate differences", () => {
  it("returns an array of differences between numbers", () => {
    expect(calcDiffs([0, 3, 6, 9, 12, 15])).toStrictEqual([3, 3, 3, 3, 3]);
  });

  it("returns an array of differences between numbers", () => {
    expect(calcDiffs([3, 3, 3, 3, 3])).toStrictEqual([0, 0, 0, 0]);
  });
});

describe("extrapolateForward", () => {
  it("extrapolates correctly", () => {
    expect(
      extrapolateForward([
        [0, 3, 6, 9, 12, 15],
        [3, 3, 3, 3, 3],
        [0, 0, 0, 0],
      ]),
    ).toStrictEqual([
      [0, 3, 6, 9, 12, 15, 18],
      [3, 3, 3, 3, 3, 3],
      [0, 0, 0, 0, 0],
    ]);
  });

  it("extrapolates test data correctly", () => {
    expect(
      extrapolateForward([
        [10, 13, 16, 21, 30, 45],
        [3, 3, 5, 9, 15],
        [0, 2, 4, 6],
        [2, 2, 2],
        [0, 0],
      ]),
    ).toStrictEqual([
      [10, 13, 16, 21, 30, 45, 68],
      [3, 3, 5, 9, 15, 23],
      [0, 2, 4, 6, 8],
      [2, 2, 2, 2],
      [0, 0, 0],
    ]);
  });
});

describe("returnHistory", () => {
  it("returns last val of index 0", () => {
    expect(
      returnHistory([
        [0, 3, 6, 9, 12, 15, 18],
        [3, 3, 3, 3, 3, 3],
        [0, 0, 0, 0, 0],
      ]),
    ).toStrictEqual(18);
  });

  it("returns last val of index 0", () => {
    expect(
      returnHistory([
        [10, 13, 16, 21, 30, 45, 68],
        [3, 3, 5, 9, 15, 23],
        [0, 2, 4, 6, 8],
        [2, 2, 2, 2],
        [0, 0, 0],
      ]),
    ).toStrictEqual(68);
  });
});

describe("parseInput tests", () => {
  it("parses input correctly", () => {
    expect(
      parseInput(`0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45`),
    ).toStrictEqual([
      [0, 3, 6, 9, 12, 15],
      [1, 3, 6, 10, 15, 21],
      [10, 13, 16, 21, 30, 45],
    ]);
  });
});

describe("part1 tests", () => {
  it("passes test data", () => {
    expect(
      part1(`0 3 6 9 12 15
          1 3 6 10 15 21
          10 13 16 21 30 45`),
    ).toEqual(114);
  });
});

describe("extrapolateBackwards", () => {
  it("extrapolates test data correctly", () => {
    expect(
      extrapolateBackwards([
        [10, 13, 16, 21, 30, 45],
        [3, 3, 5, 9, 15],
        [0, 2, 4, 6],
        [2, 2, 2],
        [0, 0],
      ]),
    ).toStrictEqual([
      [5, 10, 13, 16, 21, 30, 45],
      [5, 3, 3, 5, 9, 15],
      [-2, 0, 2, 4, 6],
      [2, 2, 2, 2],
      [0, 0, 0],
    ]);
  });
});

describe("part2 tests", () => {
  it("passes test data", () => {
    expect(
      part2(`0 3 6 9 12 15
            1 3 6 10 15 21
            10 13 16 21 30 45`),
    ).toEqual(2);
  });
});
