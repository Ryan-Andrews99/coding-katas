import { readFileSync } from "fs";

export const readTxtFile = (filePath: string): string => {
  return readFileSync(filePath, "utf-8").toString();
};
