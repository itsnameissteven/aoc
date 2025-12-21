import * as fs from 'fs';
import * as path from 'path';

const filePath: string = path.join(__dirname, 'input.txt');
const fileContent: string = fs.readFileSync(filePath, 'utf-8');

const part2 = () => {
  const split = fileContent.split('\n');
  let pos = 50;
  let count = 0;
  console.log('The dial starts by pointing at 50');
  for (const line of split) {
    const dir = line.slice(0, 1);
    const num = parseInt(line.slice(1));
    const curr = pos;
    let rotations = curr + num;

    if (dir === 'L') {
      pos -= num;
      rotations = curr - num;
    } else {
      rotations = curr + num;
      pos += num;
    }
    if (curr === 0 && Math.abs(Math.floor(rotations / 100)) > 0) {
      rotations = Math.abs(Math.floor(rotations / 100)) - 1;
    } else if (curr === 0) {
      rotations = 0;
    } else {
      rotations = Math.abs(Math.floor(rotations / 100));
    }

    if (pos === 0 || pos === 100) {
      console.log(
        `the dial is rotated ${line} to point at ${0}`,
        `rotations ${0}`
      );
      count++;
      pos = 0;
      continue;
    }
    let ticker = curr;
    let rotCount = 0;
    for (let i = num; i > 1; i--) {
      if (dir === 'L') {
        ticker--;
      } else {
        ticker++;
      }
      if (ticker === 0 || ticker === 100 || ticker === -100) {
        ticker = 0;
        rotCount++;
      }
    }
    console.log({ rotation: rotCount });
    count += rotCount;

    const mod = Math.abs(pos) % 100;

    if (mod === 0) {
      count++;
      // count += rotations;
      console.log(
        `the dial is rotated ${line} to point at ${0}`,
        `rotations ${rotations}`
      );
      pos = 0;
      continue;
    }
    if (pos < 0) {
      pos = 100 - mod;
      console.log(
        `the dial is rotated ${line} to point at ${pos}`,
        `rotations ${rotations}`
      );
    } else if (pos > 100) {
      pos = mod;
      console.log(
        `the dial is rotated ${line} to point at ${pos}`,
        `rotations ${rotations}`
      );
    } else {
      console.log(
        `the dial is rotated ${line} to point at ${pos}`,
        `rotations ${rotations}`
      );
    }
    // count += rotations;
  }
  console.log(count);
};

part2();
