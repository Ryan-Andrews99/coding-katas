import {
  canISurvive,
  canILive,
  nextTick,
  makeGridString,
} from "../src/gameOfLife";

describe("game of life tests", () => {
  it("returns true if current cell has 2-3 neighbours", () => {
    const currentCell = [0, 0];
    const currentLivingCells = [
      [0, 0],
      [0, 5],
      [1, 3],
      [1, 0],
      [1, 1],
    ];
    const willILive = canISurvive(currentCell, currentLivingCells);
    expect(willILive).toBe(true);
  });

  it("returns false if current cell has less than 2 neighbours", () => {
    const currentCell = [0, 0];
    const currentLivingCells = [
      [0, 0],
      [0, 5],
      [1, 3],
      [1, 0],
    ];
    const willILive = canISurvive(currentCell, currentLivingCells);
    expect(willILive).toBe(false);
  });

  it("if a dead cell has exactly 3 neighbours, it becomes alive", () => {
    const currentDeadCell = [0, 0];
    const currentLivingCells = [
      [0, 5],
      [1, 3],
      [1, 0],
      [1, 1],
      [0, 1],
    ];
    const willIBecomeAlive = canILive(currentDeadCell, currentLivingCells);
    expect(willIBecomeAlive).toBe(true);
  });

  it("a dead cell has less than 3 neighbours, it stays dead", () => {
    const currentDeadCell = [0, 0];
    const currentLivingCells = [
      [0, 5],
      [1, 3],
      [1, 0],
    ];
    const willIBecomeAlive = canILive(currentDeadCell, currentLivingCells);
    expect(willIBecomeAlive).toBe(false);
  });

  it("a dead cell has more than 3 neighbours, it stays dead", () => {
    const currentDeadCell = [4, 4];
    const currentLivingCells = [
      [0, 5],
      [1, 3],
      [4, 3],
      [3, 4],
      [3, 3],
      [5, 4],
    ];
    const willIBecomeAlive = canILive(currentDeadCell, currentLivingCells);
    expect(willIBecomeAlive).toBe(false);
  });

  it("produces the state at the next tick", () => {
    const liveCells = [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 2],
      [3, 2],
      [1, 3],
      [2, 3],
    ];

    const expectedLiveCellsAfterTick = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 0],
      [2, 3],
      [3, 1],
      [3, 2],
    ];

    expect(nextTick(liveCells, 4)).toStrictEqual(expectedLiveCellsAfterTick);
  });

  it("produces a grid of given size", () => {
    const liveCells = [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 2],
    ];

    const expectedLiveCellsAfterTick = [
      [0, 0],
      [0, 1],
      [0, 2],
      [2, 0],
      [2, 1],
    ];

    expect(nextTick(liveCells, 3)).toStrictEqual(expectedLiveCellsAfterTick);
  });

  it("constructs an empty grid of given size", () => {
    const expectedGrid = "---\n---\n---";
    const gridOutput = makeGridString(3, []);
    expect(gridOutput).toEqual(expectedGrid);
  });

  it("constructs a grid with live cells of given size", () => {
    const expectedGrid = "---x\nxx--\n----\nxxxx";
    const livingCells = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [0, 2],
      [1, 2],
      [3, 3],
    ];
    const gridOutput = makeGridString(4, livingCells);
    expect(gridOutput).toEqual(expectedGrid);
  });
});
