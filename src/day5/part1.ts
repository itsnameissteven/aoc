import * as fs from "fs";
import * as path from "path";

const filePath: string = path.join(__dirname, "input.txt");
const fileContent: string = fs.readFileSync(filePath, "utf-8");

const part1 = () => {
  const [ranges, ids] = fileContent.split("\n\n");
  let count = 0;
  for (const i of ids.split("\n")) {
    const id = Number(i);
    for (const range of ranges.split("\n")) {
      const [l, h] = range.split("-");
      const low = Number(l);
      const high = Number(h);
      if (id >= low && id <= high) {
        console.log(id, l, h);
        count++;
        break;
      }
    }
  }
  console.log(count);
};

part1();
