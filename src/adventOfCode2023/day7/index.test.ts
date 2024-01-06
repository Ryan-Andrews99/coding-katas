import {
  answerPart1,
  answerPart2,
  attachScore,
  cardVals,
  compareHands,
  handStrength,
  handStrengthPart2,
  parseInput,
  sortCards,
} from "./index";

describe("parseInput tests", () => {
  it("parses the input correctly", () => {
    expect(
      parseInput(`32T3K 765
    T55J5 684
    KK677 28
    KTJJT 220
    QQQJA 483`),
    ).toStrictEqual([
      ["32T3K", 765],
      ["T55J5", 684],
      ["KK677", 28],
      ["KTJJT", 220],
      ["QQQJA", 483],
    ]);
  });
});

describe("handStrength tests", () => {
  it("returns 7 for five of a kind", () => {
    expect(handStrength("AAAAA")).toStrictEqual(7);
  });

  it("returns 6 for four of a kind", () => {
    expect(handStrength("AA8AA")).toStrictEqual(6);
  });

  it("returns 5 for full house", () => {
    expect(handStrength("23332")).toStrictEqual(5);
  });

  it("returns 4 for 3 of a kind", () => {
    expect(handStrength("TTT98")).toStrictEqual(4);
  });

  it("returns 3 for 2 pairs", () => {
    expect(handStrength("23432")).toStrictEqual(3);
  });

  it("returns 2 for 1 pair", () => {
    expect(handStrength("A23A4")).toStrictEqual(2);
  });

  it("returns 1 for 0 pairs", () => {
    expect(handStrength("23456")).toStrictEqual(1);
  });
});

describe("attachScore tests", () => {
  it("adds the hand score to last arr element", () => {
    expect(attachScore(["AAAAA", 765], handStrength)).toStrictEqual([
      "AAAAA",
      765,
      7,
    ]);
  });
});

describe("sortCards tests", () => {
  it("sorts by the hand score ascending if they differ", () => {
    expect(
      sortCards(
        [
          ["AAAAA", 765, 7],
          ["QQQJA", 483, 4],
        ],
        cardVals,
      ),
    ).toStrictEqual([
      ["QQQJA", 483, 4],
      ["AAAAA", 765, 7],
    ]);
  });

  it("sorts by the hand score if they differ", () => {
    expect(
      sortCards(
        [
          ["A23A4", 765, 2],
          ["23456", 483, 1],
        ],
        cardVals,
      ),
    ).toStrictEqual([
      ["23456", 483, 1],
      ["A23A4", 765, 2],
    ]);
  });

  it("sorts by the card ordering if the hand score is equal", () => {
    expect(
      sortCards(
        [
          ["KK677", 765, 3],
          ["KTJJT", 483, 3],
        ],
        cardVals,
      ),
    ).toStrictEqual([
      ["KTJJT", 483, 3],
      ["KK677", 765, 3],
    ]);
  });

  it("sorts multiple cards", () => {
    expect(
      sortCards(
        [
          ["32T3K", 765, 2],
          ["T55J5", 684, 4],
          ["KK677", 28, 3],
          ["KTJJT", 220, 3],
          ["QQQJA", 483, 4],
        ],
        cardVals,
      ),
    ).toStrictEqual([
      ["32T3K", 765, 2],
      ["KTJJT", 220, 3],
      ["KK677", 28, 3],
      ["T55J5", 684, 4],
      ["QQQJA", 483, 4],
    ]);
  });
});

describe("compareHands tests", () => {
  it("returns 1 if the first argument of the equivalent hands is stronger based on card ordering ", () => {
    expect(compareHands("KK677", "KTJJT", cardVals)).toStrictEqual(1);
  });

  it("returns -1 if the second argument of the equivalent hands is stronger based on card ordering ", () => {
    expect(compareHands("KTJJT", "KK677", cardVals)).toStrictEqual(-1);
  });
});

describe("answerPart1 tests", () => {
  it("passes test data", () => {
    expect(
      answerPart1(`32T3K 765
    T55J5 684
    KK677 28
    KTJJT 220
    QQQJA 483`),
    ).toStrictEqual(6440);
  });
});

describe("handStrengthPart2 tests", () => {
  it("returns 7 for five of a kind", () => {
    expect(handStrengthPart2("AAAAA")).toStrictEqual(7);
  });

  it("returns 6 for four of a kind with jokers", () => {
    expect(handStrengthPart2("T55J5")).toStrictEqual(6);
  });

  it("returns 6 for four of a kind with jokers", () => {
    expect(handStrengthPart2("KTJJT")).toStrictEqual(6);
  });

  it("returns 6 for four of a kind with jokers", () => {
    expect(handStrengthPart2("QQQJA")).toStrictEqual(6);
  });

  it("returns 5 for full house", () => {
    expect(handStrengthPart2("23332")).toStrictEqual(5);
  });

  it("returns 4 for 3 of a kind", () => {
    expect(handStrengthPart2("TTT98")).toStrictEqual(4);
  });

  it("returns 3 for 2 pairs", () => {
    expect(handStrengthPart2("23432")).toStrictEqual(3);
  });

  it("returns 2 for 1 pair", () => {
    expect(handStrengthPart2("A23A4")).toStrictEqual(2);
  });

  it("returns 1 for 0 pairs", () => {
    expect(handStrengthPart2("23456")).toStrictEqual(1);
  });
});

describe("answerPart2 tests", () => {
  it("passes test data", () => {
    expect(
      answerPart2(`32T3K 765
    T55J5 684
    KK677 28
    KTJJT 220
    QQQJA 483`),
    ).toStrictEqual(5905);
  });
});
