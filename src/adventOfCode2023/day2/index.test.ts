import {
  extractGameNumber,
  extractHighestNumberOfCubes,
  gamePowers,
  isGamePossible,
  returnPart1Answer,
  returnPart2Answer,
} from "./index";

describe("extractGameNumber tests", () => {
  it("extracts the game number from the title", () => {
    expect(
      extractGameNumber(
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      ),
    ).toEqual(1);
  });
});

describe("isGamePossible tests", () => {
  it("returns true for a possible game", () => {
    expect(
      isGamePossible(
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        [12, 13, 14], //r, g, b
      ),
    ).toEqual(true);
  });

  it("returns false for an impossible game", () => {
    expect(
      isGamePossible(
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        [12, 13, 14],
      ),
    ).toEqual(false);
  });
});

describe("extractHighestNumberOfCubes tests", () => {
  it("returns the highest number of cube occurances from an array of cubes", () => {
    expect(extractHighestNumberOfCubes([["5 blue"], ["6 blue"]])).toEqual(6);
  });

  it("matches multi digits and preserves 0s", () => {
    expect(
      extractHighestNumberOfCubes([["20 red"], ["4 red"], ["1 red"]]),
    ).toEqual(20);
  });
});

describe("returnPart1Answer tests", () => {
  it("passes test data", () => {
    expect(
      returnPart1Answer(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
      Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
      Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
      Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
      Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`),
    ).toEqual(8);
  });
});

describe("extractHighestNumberOfCubes tests", () => {
  it("returns the highest number of cube occurances from an array of cubes", () => {
    expect(extractHighestNumberOfCubes([["5 blue"], ["6 blue"]])).toEqual(6);
  });

  it("matches multi digits and preserves 0s", () => {
    expect(
      extractHighestNumberOfCubes([["20 red"], ["4 red"], ["1 red"]]),
    ).toEqual(20);
  });
});

describe("gamePower tests", () => {
  it.each`
    testCase                                                                      | res
    ${"Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"}                   | ${48}
    ${"Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green"}                 | ${12}
    ${"Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"} | ${1560}
    ${"Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red"} | ${630}
    ${"Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"}                   | ${36}
  `("passes test data", ({ testCase, res }) => {
    expect(gamePowers(testCase)).toEqual(res);
  });
});

describe("returnPart2Answer tests", () => {
  it("passes test data", () => {
    expect(
      returnPart2Answer(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`),
    ).toEqual(2286);
  });
});
