import * as fs from "fs";
import * as path from "path";

const filePath: string = path.join(__dirname, "input.txt");
const fileContent: string = fs.readFileSync(filePath, "utf-8");

const part2 = () => {
  const lines = fileContent.split("\n");
  let total = 0;
  for (const line of lines) {
    const val = getHighestNum(line, 11);
    total += Number(val);
  }
  console.log(total);
};

/*
  Create funtion that takes in the input, and amount of remaining spaces required for the total twelve spots
  Split the input and evaluate the highest number with alotted space
  once the highest is found add that to a string and reduce the amount of space required at the end of the string
  for example the first round will require at least 11 additional spaces, 
  after the highest number is found the required spaces are 10
  once the string index is found you can only look after that initial spot + 1
*/

const getHighestNum = (
  input: string,
  requiredSpace: number,
  jolt: string = ""
) => {
  if (jolt.length === 12) {
    return jolt;
  }
  const searchArea = input.slice(0, input.length - requiredSpace);

  const evaluation = searchArea.split("").reduce(
    (acc: { number: number | null; index: number }, str, i) => {
      const num = Number(str);

      if (acc.number === null || num > acc.number) {
        acc.number = num;
        acc.index = i;
      }
      return acc;
    },
    {
      number: null,
      index: 0,
    }
  );

  if (evaluation.number === null) {
    return jolt;
  }
  jolt += evaluation.number;
  return getHighestNum(
    input.slice(evaluation.index + 1),
    requiredSpace - 1,
    jolt
  );
};

part2();
