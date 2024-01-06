import {
  calculateDistance,
  calculateRaces,
  returnAnswerPart1,
  returnAnswerPart2,
} from "./index";

describe("calculateDistance tests", () => {
  it("calculates the distance that can be traveled based on speed and time remaning", () => {
    expect(calculateDistance(1, 6)).toEqual(6);
  });

  it("calculates the distance that can be traveled based on speed and time remaning", () => {
    expect(calculateDistance(2, 5)).toEqual(10);
  });
});

describe("calculateRace tests ", () => {
  it("calculates all race outcomes for a given time and distance", () => {
    expect(calculateRaces(7)).toEqual([0, 6, 10, 12, 12, 10, 6, 0]);
  });
});

describe("returnAnswerPart1", () => {
  it("passes the test data", () => {
    expect(
      returnAnswerPart1(`Time:      7  15   30
        Distance:  9  40  200`),
    ).toEqual(288);
  });
});

describe("returnAnswerPart2", () => {
  it("passes the test data", () => {
    expect(
      returnAnswerPart2(`Time:      7  15   30
        Distance:  9  40  200`),
    ).toEqual(71503);
  });
});
