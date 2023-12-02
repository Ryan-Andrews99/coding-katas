import { moveForwards, moveBackwards, move } from "../src/HelloWorld";

describe("moveForwards", () => {
  it("Throws an error if the direction input is invalid", () => {
    const initalCoords = [0, 0];
    const direction = "INVALID";
    expect(() => moveForwards(initalCoords, direction)).toThrow(
      "invalid direction",
    );
  });

  test.each`
    initialCoords | direction | expectedCoords
    ${[0, 0]}     | ${"N"}    | ${[0, 1]}
    ${[0, 1]}     | ${"S"}    | ${[0, 0]}
    ${[1, 0]}     | ${"W"}    | ${[0, 0]}
    ${[0, 0]}     | ${"E"}    | ${[1, 0]}
  `(
    "Moves forward in the right direction",
    ({ initialCoords, direction, expectedCoords }) => {
      const newCoords = moveForwards(initialCoords, direction);
      expect(newCoords).toEqual(expectedCoords);
    },
  );
});

describe("moveBackwards", () => {
  it("Moves something backwards with a north direction", () => {
    const initalCoords = [0, 2];
    const direction = "N";
    const newCoords = moveBackwards(initalCoords, direction);
    const expectedNewCoords = [0, 1];
    expect(newCoords).toEqual(expectedNewCoords);
  });

  it("Moves something backwards with a south direction", () => {
    const initalCoords = [0, 2];
    const direction = "S";
    const newCoords = moveBackwards(initalCoords, direction);
    const expectedNewCoords = [0, 3];
    expect(newCoords).toEqual(expectedNewCoords);
  });

  it("Moves something backwards with an east direction", () => {
    const initalCoords = [0, 2];
    const direction = "E";
    const newCoords = moveBackwards(initalCoords, direction);
    const expectedNewCoords = [-1, 2];
    expect(newCoords).toEqual(expectedNewCoords);
  });

  it("Moves something backwards with an west direction", () => {
    const initalCoords = [0, 2];
    const direction = "W";
    const newCoords = moveBackwards(initalCoords, direction);
    const expectedNewCoords = [1, 2];
    expect(newCoords).toEqual(expectedNewCoords);
  });

  it("throws an error with an invalid direction", () => {
    const initalCoords = [0, 2];
    const direction = "INVALID";
    expect(() => moveBackwards(initalCoords, direction)).toThrow(
      "invalid direction",
    );
  });
});

describe("move", () => {
  it("Moves forward twice", () => {
    const initalCoords = [0, 0];
    const direction = "N";
    const moves = ["F", "F"];
    const newCoords = move(initalCoords, direction, moves);
    const expectedNewCoords = [0, 2];
    expect(newCoords).toEqual(expectedNewCoords);
  });

  it("Moves backwards twice", () => {
    const initalCoords = [0, 0];
    const direction = "N";
    const moves = ["B", "B"];
    const newCoords = move(initalCoords, direction, moves);
    const expectedNewCoords = [0, -2];
    expect(newCoords).toEqual(expectedNewCoords);
  });
});
