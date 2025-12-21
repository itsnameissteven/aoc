import * as fs from 'fs';
import * as path from 'path';

const filePath: string = path.join(__dirname, 'input.txt');
const fileContent: string = fs.readFileSync(filePath, 'utf-8');
/* 
Find the invalid numbers in a string sequence
The numbers are comma separated, and contain two ids, id1-id2
An invalid number is one that repeats successively 11 or 99 or 1212 123123
Split the string by comma and then by dash to get the id1 and id2
create a function that takes in the string and evaluates the validity.

EvaluateId - 
  input: string
  length: number

  starting with the length of 1 check the string index of the first and second char, if they match return invalid if not continue on to position 2 and 3 and so on until the end of the string
  if still valid continue checking with the length of 2 characters, check chars 12 vs 34 then 23 vs 45
  Continue adding length matches until the first have is greater than the second half

*/
const part1 = () => {
  const ids = fileContent.split(',');
  let count = 0;
  for (const content of ids) {
    const [id1, id2] = content.split('-');
    for (let i = parseInt(id1!); i <= parseInt(id2!); i++) {
      count += evalId(i.toString());
    }
  }
  console.log(count);
};

const evalId = (input: string) => {
  if (input.length % 2 !== 0) {
    return 0;
  }
  const firstHalf = input.slice(0, input.length / 2);
  const secondHalf = input.slice(input.length / 2, input.length);
  if (firstHalf === secondHalf) {
    return parseInt(input);
  }
  return 0;
};

part1();
