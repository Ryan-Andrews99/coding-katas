import {
  filterToMatches,
  increaseScore,
  isNumber,
  returnAnswerPart1,
  returnAnswerPart2,
  numberOfScratchies,
} from "./index";

describe("filterToMatches tests", () => {
  it("returns the cardNums present in the winning nums", () => {
    expect(
      filterToMatches(
        ["41", "48", "83", "86", "17"],
        ["83", "86", "6", "31", "17", "9", "48", "53"],
      ),
    ).toEqual(["83", "86", "17", "48"]);
  });
});

describe("increaseScore tests", () => {
  it("if score is zero it returns 1", () => {
    expect(increaseScore(0)).toEqual(1);
  });

  it("doubles a non-zero score", () => {
    expect(increaseScore(1)).toEqual(2);
  });

  it("doubles a non-zero score", () => {
    expect(increaseScore(2)).toEqual(4);
  });
});

describe("returnAnswerPart1 tests", () => {
  it("returns the cardNums present in the winning nums", () => {
    expect(
      returnAnswerPart1(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
      Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
      Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
      Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
      Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
      Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`),
    ).toEqual(13);
  });
});

describe("isNumber tests", () => {
  it("returns true for number Char", () => {
    expect(isNumber("2")).toEqual(true);
  });

  it("returns false for undefined", () => {
    expect(isNumber("undefined")).toEqual(false);
  });

  it("returns true for 0", () => {
    expect(isNumber("0")).toEqual(true);
  });

  it("returns false for non-number Char", () => {
    expect(isNumber("a")).toEqual(false);
  });

  it("returns false for non-number symbol char", () => {
    expect(isNumber(".")).toEqual(false);
  });
});

describe("numberOfScratchies tests", () => {
  it("applies the number of scratchards based on winning numbers", () => {
    expect(numberOfScratchies([4, 2, 2, 1, 0, 0])).toEqual([1, 2, 4, 8, 14, 1]);
  });
});

describe("returnAnswerPart2 tests", () => {
  it("passes test data", () => {
    expect(
      returnAnswerPart2(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
      Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
      Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
      Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
      Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
      Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`),
    ).toEqual(30);
  });
});
