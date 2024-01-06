// import { readTxtFile } from "../util/readTxtFile";

export const isInRange = (
  sourceNumber: number,
  sourceStart: number,
  rangeLength: number,
) => sourceStart <= sourceNumber && sourceStart + rangeLength >= sourceNumber;

export const destinationToSourceRange = (
  sourceNumber: number,
  map: number[],
): number => {
  if (!map) return sourceNumber;
  const [destinationStart, sourceStart, rangeLength] = map;
  if (!isInRange(sourceNumber, sourceStart, rangeLength)) {
    return sourceNumber;
  }
  return sourceNumber - (sourceStart - destinationStart);
};

export const filterToMapsWithinRange = (
  sourceNumber: number,
  maps: number[][],
) => maps.filter((map) => isInRange(sourceNumber, map[1], map[0]));

// const input = readTxtFile('src/adventOfCode2023/day5/input.txt')

export const returnAnswerPart1 = (input: string) => {
  const maps = input.split("\n\n").map((almanac) =>
    almanac
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .filter((line) => !line.includes("-to-"))
      .map((lineString) =>
        lineString
          .trim()
          .split(" ")
          .filter((item) => !isNaN(Number(item)))
          .map((item) => Number(item)),
      ),
  );
  const seeds = maps[0][0];
  const seedSoilMap = maps[1];
  const soilFertMap = maps[2];
  const fertWaterMap = maps[3];
  const waterLightMap = maps[4];
  const lightTempMap = maps[5];
  const tempHumidMap = maps[6];
  const humidLocalMap = maps[7];

  return seeds
    .map((seed) =>
      destinationToSourceRange(
        seed,
        filterToMapsWithinRange(seed, seedSoilMap)[0],
      ),
    )
    .map((soil) =>
      destinationToSourceRange(
        soil,
        filterToMapsWithinRange(soil, soilFertMap)[0],
      ),
    )
    .map((soil) =>
      destinationToSourceRange(
        soil,
        fertWaterMap.filter((map) => isInRange(soil, map[1], map[2]))[0] ?? [
          0, 0, 0,
        ],
      ),
    )
    .map((soil) =>
      destinationToSourceRange(
        soil,
        waterLightMap.filter((map) => isInRange(soil, map[1], map[2]))[0] ?? [
          0, 0, 0,
        ],
      ),
    )
    .map((soil) =>
      destinationToSourceRange(
        soil,
        lightTempMap.filter((map) => isInRange(soil, map[1], map[2]))[0] ?? [
          0, 0, 0,
        ],
      ),
    )
    .map((soil) =>
      destinationToSourceRange(
        soil,
        tempHumidMap.filter((map) => isInRange(soil, map[1], map[2]))[0] ?? [
          0, 0, 0,
        ],
      ),
    )
    .map((soil) =>
      destinationToSourceRange(
        soil,
        humidLocalMap.filter((map) => isInRange(soil, map[1], map[2]))[0] ?? [
          0, 0, 0,
        ],
      ),
    )
    .reduce(
      (min, location) => (min = location < min ? location : min),
      Infinity,
    );
};

export const createRange = (startVal: number, rangeLength: number) =>
  Array(rangeLength)
    .fill(startVal)
    .map((val, index) => val + index);

export const skipRangeCheck = (
  sourceNumber: number,
  map: number[],
): boolean => {
  const [destinationStart, sourceStart, rangeLength] = map;
  const inRange = isInRange(sourceNumber, sourceStart, rangeLength);
  if (inRange === true && destinationStart < sourceNumber) {
    return false;
  } else return true;
};

export const returnMinMapping = (
  sourceNumber: number,
  maps: number[][],
): number =>
  maps.reduce((minVal, map) => {
    if (skipRangeCheck(sourceNumber, map)) {
      return minVal;
    } else {
      const mappedValue = destinationToSourceRange(sourceNumber, map);
      minVal = mappedValue < minVal ? mappedValue : minVal;
      return minVal;
    }
  }, sourceNumber);
