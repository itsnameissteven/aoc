import * as fs from "fs";
import * as path from "path";

const filePath: string = path.join(__dirname, "input.txt");
const fileContent: string = fs.readFileSync(filePath, "utf-8");

const part2 = () => {
  const [ranges] = fileContent.split("\n\n");
  const validIds = [];
  const sortedRanges = ranges.split("\n").sort((a, b) => {
    const [lowA] = formatRange(a);
    const [lowb] = formatRange(b);
    return lowA - lowb;
  });

  let count = 0;

  for (const range of sortedRanges) {
    const [low, high] = formatRange(range);
    let nextLow: number = 0;

    let next = "";
    if (!validIds.length) {
      validIds.push(range);
      continue;
    }
    const [_, lastHigh] = formatRange(validIds[validIds.length - 1]);
    if (low <= lastHigh && high <= lastHigh) {
      continue;
    }
    if (low <= lastHigh) {
      nextLow = lastHigh + 1;
    } else {
      nextLow = low;
    }
    next = nextLow + "-" + high;
    validIds.push(next);
  }

  const tally = validIds.reduce((acc, el) => {
    const [low, high] = formatRange(el);

    const count = high - low;
    if (count === 0) {
      acc += 1;
    } else {
      acc += count + 1;
    }
    return acc;
  }, 0);

  console.log(sortedRanges, validIds, tally);
};

const formatRange = (str: string) => {
  const [low, high] = str.split("-");

  return [Number(low), Number(high)];
};

part2();
