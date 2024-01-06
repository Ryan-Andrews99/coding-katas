import { readTxtFile } from "../util/readTxtFile";
import {
  destinationToSourceRange,
  isInRange,
  returnAnswerPart1,
  skipRangeCheck,
  returnMinMapping,
  createRange,
} from "./index";

describe("isInRange tests", () => {
  it("isInRange returns true if in range", () => {
    expect(isInRange(50, 50, 5)).toEqual(true);
  });

  it("isInRange returns false if not in range", () => {
    expect(isInRange(1, 50, 5)).toEqual(false);
  });

  it("isInRange returns true if in range", () => {
    expect(isInRange(99, 98, 2)).toEqual(true);
  });

  it("isInRange returns false if out of range", () => {
    expect(isInRange(81, 15, 37)).toEqual(false);
  });
});

describe("destinationToSourceRange", () => {
  it("maps an in range number correcty", () => {
    expect(destinationToSourceRange(79, [52, 50, 48])).toEqual(81);
  });

  it("maps an in range number correcty", () => {
    expect(destinationToSourceRange(50, [52, 50, 48])).toEqual(52);
  });

  it("maps an out of range number correcty", () => {
    expect(destinationToSourceRange(14, [52, 50, 48])).toEqual(14);
  });

  it("addtional test for mapping down ", () => {
    expect(destinationToSourceRange(50, [1, 50, 5])).toEqual(1);
  });

  it("addtional test for mapping up ", () => {
    expect(destinationToSourceRange(50, [80, 50, 5])).toEqual(80);
  });

  it("addtional mapping to same val ", () => {
    expect(destinationToSourceRange(50, [50, 50, 5])).toEqual(50);
  });

  it("addtional mapping to same val ", () => {
    expect(destinationToSourceRange(50, [51, 50, 5])).toEqual(51);
  });

  it("addtional mapping to same val ", () => {
    expect(destinationToSourceRange(81, [37, 52, 2])).toEqual(81);
  });

  it("addtional mapping to same val ", () => {
    expect(destinationToSourceRange(81, [50, 98, 2])).toEqual(81);
  });

  it("addtional mapping to same val ", () => {
    expect(destinationToSourceRange(81, [52, 50, 48])).toEqual(83);
  });
});

describe("returnAnswerPart1 tests", () => {
  it("passes test data ", () => {
    const testInput = readTxtFile("src/adventOfCode2023/day5/Testinput.txt");
    expect(returnAnswerPart1(testInput)).toEqual(35);
  });
});

describe("skipRangeCheck tests", () => {
  it("returns false if number is mapped down ", () => {
    expect(skipRangeCheck(50, [1, 50, 5])).toEqual(false);
  });

  it("returns true if number is mapped up ", () => {
    expect(skipRangeCheck(50, [80, 50, 5])).toEqual(true);
  });

  it("returns true if mapped to same val ", () => {
    expect(skipRangeCheck(50, [50, 50, 5])).toEqual(true);
  });

  it("skips range check for number outside of ranges ", () => {
    expect(skipRangeCheck(81, [0, 15, 37])).toEqual(true);
  });

  it("skips range check for number outside of ranges ", () => {
    expect(skipRangeCheck(81, [37, 52, 2])).toEqual(true);
  });

  it("skips range check for number outside of ranges ", () => {
    expect(skipRangeCheck(81, [39, 0, 15])).toEqual(true);
  });
});

describe("returnMinMapping", () => {
  it("returns minimum mapping ", () => {
    expect(
      returnMinMapping(50, [
        [50, 98, 2],
        [52, 50, 48],
      ]),
    ).toEqual(50);
  });

  it("returns minimum mapping ", () => {
    expect(
      returnMinMapping(79, [
        [50, 98, 2],
        [52, 50, 48],
      ]),
    ).toEqual(79);
  });
});

describe("createRange tests", () => {
  it("creates a range based on two input values", () => {
    expect(createRange(10, 3)).toStrictEqual([10, 11, 12]);
  });
});

// describe("returnAnswerPart2 tests", () => {
//   it("passes test data ", () => {
//     const testInput = readTxtFile('src/adventOfCode2023/day5/Testinput.txt')
//     expect(
//       returnAnswerPart2(testInput),
//     ).toEqual(49);
//   });
// });
