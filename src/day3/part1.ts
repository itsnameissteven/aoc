import * as fs from "fs";
import * as path from "path";

const filePath: string = path.join(__dirname, "input.txt");
const fileContent: string = fs.readFileSync(filePath, "utf-8");

const part1 = () => {
  const lines = fileContent.split("\n");
  let total = 0;
  for (const line of lines) {
    total += getJolt(line);
  }
  console.log(total);
};

const getJolt = (input: string) => {
  let a = "";
  let b = "";

  const initial = getHighestNum(input.slice(0, input.length - 1));
  const second = getHighestNum(input.slice(initial.index + 1, input.length));

  a = initial.number.toString();
  b = second.number.toString();
  const result = Number(a + b);
  console.log(result);
  return result;
};

const getHighestNum = (input: string) => {
  return input.split("").reduce(
    (acc: { number: number; index: number }, str, i) => {
      const num = Number(str);
      if (num > acc.number) {
        acc.number = num;
        acc.index = i;
      }
      return acc;
    },
    {
      number: 0,
      index: 0,
    }
  );
};

part1();
