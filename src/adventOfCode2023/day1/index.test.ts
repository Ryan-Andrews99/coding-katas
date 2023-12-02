import {
  isNumber,
  returnAnswer,
  combineFirstAndLastDigit,
  replaceWordNumbersWithDigits,
  wordsToNums,
  returnAnswerPart2,
} from "./index";

describe("isNumber tests", () => {
  it("returns true for a number string", () => {
    expect(isNumber("2")).toEqual(true);
  });
  it("returns false for a non-number string", () => {
    expect(isNumber("asd")).toEqual(false);
  });
});

describe("combineFirstAndLastDigit tests", () => {
  it("combines the first and last numbers of an array", () => {
    expect(combineFirstAndLastDigit(["1", "2", "3", "4", "5", "6"])).toEqual(
      16,
    );
  });

  it("handles one element in the array", () => {
    expect(combineFirstAndLastDigit(["6"])).toEqual(66);
  });
});

describe("returnAnswer tests", () => {
  it("passes test data", () => {
    expect(
      returnAnswer(`1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`),
    ).toEqual(142);
  });
});

describe("replaceWordNumbersWithDigits tests", () => {
  it("replaces the word representations wiht numbers", () => {
    expect(
      replaceWordNumbersWithDigits(
        "onetwothreefourfivesix",
        Object.keys(wordsToNums),
        wordsToNums,
      ),
    ).toEqual("123456");
  });

  it("replaces the word representations with numbers and not any non numbers", () => {
    expect(
      replaceWordNumbersWithDigits(
        "onetwothreeabcdfourfivesix",
        Object.keys(wordsToNums),
        wordsToNums,
      ),
    ).toEqual("123abcd456");
  });

  it("replaces multiple occurances", () => {
    expect(
      replaceWordNumbersWithDigits(
        "mxmkjvgsdzfhseightonetwoeight7",
        Object.keys(wordsToNums),
        wordsToNums,
      ),
    ).toEqual("mxmkjvgsdzfhs81287");
  });

  it("replaces the first occurance of a number from left to right, without considering numerical ordering", () => {
    expect(
      replaceWordNumbersWithDigits(
        "eightwo",
        Object.keys(wordsToNums),
        wordsToNums,
      ),
    ).toEqual("8wo");
  });

  it("handles overlaps", () => {
    expect(
      replaceWordNumbersWithDigits(
        "eightwo",
        Object.keys(wordsToNums),
        wordsToNums,
      ),
    ).toEqual("82"); // hate this test 
  });
});

describe("returnAnswer2 tests", () => {
  it("passes test data", () => {
    expect(
      returnAnswerPart2(`two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`),
    ).toEqual(281);
  });
});
