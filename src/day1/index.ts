import * as fs from 'fs';
import * as path from 'path';

const filePath: string = path.join(__dirname, 'input.txt');
const fileContent: string = fs.readFileSync(filePath, 'utf-8');

const day1 = () => {
  const split = fileContent.split('\n');
  let pos = 50;
  let count = 0;
  for (const line of split) {
    // console.log(pos);
    const dir = line.slice(0, 1);
    const num = parseInt(line.slice(1));

    if (dir === 'L') {
      pos -= num;
    } else if (dir === 'R') {
      pos += num;
    }
    if (pos === 0 || pos === 100) {
      count++;
      pos = 0;
      continue;
    }
    const mod = Math.abs(pos) % 100;
    if (mod === 0) {
      count++;
      continue;
    }
    if (pos < 0) {
      pos = 100 - mod;
    } else if (pos > 100) {
      pos = mod;
    }
  }
  console.log(count);
};

day1();
