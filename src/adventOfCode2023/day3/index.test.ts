import {
  isGear,
  isNumber,
  isSymbol,
  lookForNumbers,
  returnAnswerPart1,
  returnAnswerPart2,
  returnCoords,
  returnNeighbourCoords,
  returnNeighbours,
} from "../day3";

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

describe("isSymbol tests", () => {
  it("returns true for symbol Char", () => {
    expect(isSymbol("%")).toEqual(true);
  });

  it("returns false for number Char", () => {
    expect(isSymbol("3")).toEqual(false);
  });

  it("returns false for '.' char", () => {
    expect(isSymbol(".")).toEqual(false);
  });
});

describe("returnNeighbours tests", () => {
  it("returns eight neighbours for a position with 8 neighbours", () => {
    expect(
      returnNeighbours(
        [
          ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."],
          [".", ".", ".", "*", ".", ".", ".", ".", ".", "."],
          [".", ".", "3", "5", ".", ".", "6", "3", "3", "."],
        ],
        [1, 3],
      ),
    ).toEqual([".", ".", ".", "5", "3", ".", "7", "."]);
  });

  it("handles top left edges", () => {
    expect(
      returnNeighbours(
        [
          ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."],
          [".", ".", ".", "*", ".", ".", ".", ".", ".", "."],
          [".", ".", "3", "5", ".", ".", "6", "3", "3", "."],
        ],
        [0, 0],
      ),
    ).toEqual(["6", ".", "."]);
  });

  it("bottom left handles edges", () => {
    expect(
      returnNeighbours(
        [
          ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."],
          [".", ".", ".", "*", ".", ".", ".", ".", ".", "."],
          [".", ".", "3", "5", ".", ".", "6", "3", "3", "."],
        ],
        [2, 9],
      ),
    ).toEqual(["3", ".", "."]);
  });

  it("handles left edges", () => {
    expect(
      returnNeighbours(
        [
          ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."],
          [".", ".", ".", "*", ".", ".", ".", ".", ".", "."],
          [".", ".", "3", "5", ".", ".", "6", "3", "3", "."],
        ],
        [1, 0],
      ),
    ).toEqual([".", "4", ".", "6", "."]);
  });
});

describe("lookForNumbers tests", () => {
  it("forward looks for numbers", () => {
    expect(
      lookForNumbers(
        [
          ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."],
          [".", ".", ".", "*", ".", ".", ".", ".", ".", "."],
          [".", ".", "3", "5", ".", ".", "6", "3", "3", "."],
        ],
        [2, 2],
      ),
    ).toEqual("35");
  });

  it("backwards looks for numbers", () => {
    expect(
      lookForNumbers(
        [
          ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."],
          [".", ".", ".", "*", ".", ".", ".", ".", ".", "."],
          [".", ".", "3", "5", ".", ".", "6", "3", "3", "."],
        ],
        [0, 2],
      ),
    ).toEqual("467");
  });
});

describe("returnPart1Answer tests", () => {
  it("passes the test data", () => {
    expect(
      returnAnswerPart1(
        `467..114..
      ...*......
      ..35..633.
      ......#...
      617*......
      .....+.58.
      ..592.....
      ......755.
      ...$.*....
      .664.598..`,
      ),
    ).toEqual(4361);
  });
});

describe("returnNeighbourCoords tests", () => {
  it("returns 3 non undefined values for 0,0", () => {
    expect(returnNeighbourCoords(0, 0)).toEqual([
      [undefined],
      [0, 1],
      [undefined],
      [1, 0],
      [undefined],
      [undefined],
      [undefined],
      [1, 1],
    ]);
  });

  it("returns 8 expected values for 1,3", () => {
    expect(returnNeighbourCoords(1, 3)).toEqual([
      [1, 2],
      [1, 4],
      [0, 3],
      [2, 3],
      [2, 2],
      [0, 4],
      [0, 2],
      [2, 4],
    ]);
  });
});

describe("returnCoords tests", () => {
  it("returns coords for Number entries", () => {
    expect(
      returnCoords(
        [
          ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."],
          [".", ".", ".", "*", ".", ".", ".", ".", ".", "."],
          [".", ".", "3", "5", ".", ".", "6", "3", "3", "."],
        ],
        isNumber,
      ),
    ).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 5],
      [0, 6],
      [0, 7],
      [2, 2],
      [2, 3],
      [2, 6],
      [2, 7],
      [2, 8],
    ]);
  });

  it("returns coords for gear entries", () => {
    expect(
      returnCoords(
        [
          ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."],
          [".", ".", ".", "*", ".", ".", ".", ".", ".", "."],
          [".", ".", "3", "5", ".", ".", "6", "3", "3", "."],
        ],
        isGear,
      ),
    ).toEqual([[1, 3]]);
  });
});

describe("returnAnswerPart2 tests", () => {
  it("passes the test data", () => {
    expect(
      returnAnswerPart2(
      `467..114..
      ...*......
      ..35..633.
      ......#...
      617*......
      .....+.58.
      ..592.....
      ......755.
      ...$.*....
      .664.598..`,
      ),
    ).toEqual(467835);
  });
});
