import * as fs from "fs";
import * as path from "path";

const filePath: string = path.join(__dirname, "testInput.txt");
const fileContent: string = fs.readFileSync(filePath, "utf-8");

const part1 = () => {
  const grid = fileContent.split("\n").map((line) => line.split(""));
  let movedRolls = 0;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] !== undefined) {
      for (let j = 0; grid[i] && j < grid[i]!.length; j++) {
        const canBeMoved = evaluateSpot(grid, i, j);
        if (canBeMoved) {
          movedRolls++;
        }
      }
    }
  }
  console.log(movedRolls);
};
const evaluateSpot = (grid: string[][], row: number, col: number) => {
  const dirs: Record<string, [number, number]> = {
    n: [row - 1, col],
    ne: [row - 1, col + 1],
    e: [row, col + 1],
    se: [row + 1, col + 1],
    s: [row + 1, col],
    sw: [row + 1, col - 1],
    w: [row, col - 1],
    nw: [row - 1, col - 1],
  };
  const spot = grid[row]?.[col];
  let count = 0;

  if (spot === undefined || spot === ".") {
    return false;
  }

  for (const direction of Object.values(dirs)) {
    if (checkForRole(grid, ...direction)) {
      count++;
    }
    if (count === 4) break;
  }
  return count < 4;
};

const checkForRole = (grid: string[][], row: number, col: number) => {
  const spot = grid[row]?.[col];
  if (spot === undefined) {
    return false;
  }
  return spot === "@";
};

part1();
