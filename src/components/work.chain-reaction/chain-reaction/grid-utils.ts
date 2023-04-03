import type { Grid, GridPosition, Neighbourhood } from "./types";

export function getGridPositionId(
  grid: Grid,
  { row, col }: { row: number; col: number }
) {
  return row * grid.rows + col;
}

/**
 * For Grid position [rowpos x colpos] is:
 * gridId = rowpos * number of rows + colpos.
 */
export function getGridPositionXY(grid: Grid, gridPos: number): GridPosition {
  const col = gridPos % grid.cols;
  const row = (gridPos - col) / grid.rows;

  return { row, col };
}

export function getGridPosType(
  grid: Grid,
  posId: number
): "corner" | "side" | "other" {
  const { row, col } = getGridPositionXY(grid, posId);

  // Check corners.
  if (utils.isCorner(grid, row, col)) {
    return "corner";
  } else if (utils.isSide(grid, row, col)) {
    return "side";
  }
  return "other";
}

export function getBurstCount(grid: Grid, posId: number) {
  const posType = getGridPosType(grid, posId);

  switch (posType) {
    case "corner":
      return 2;
    case "side":
      return 3;
    case "other":
      return 4;
  }
}

export function getGridNeighbours(
  grid: Grid,
  posId: number
): { neighbourhood: Neighbourhood; posId: number }[] {
  const { row, col } = getGridPositionXY(grid, posId);

  const potentialNeighbours = [
    { neighbourhood: "up" as Neighbourhood, row: row - 1, col },
    { neighbourhood: "right" as Neighbourhood, row, col: col + 1 },
    { neighbourhood: "bottom" as Neighbourhood, row: row + 1, col },
    { neighbourhood: "left" as Neighbourhood, row, col: col - 1 },
  ];

  return potentialNeighbours
    .filter((pos) => utils.isValidGridPosition(grid, pos))
    .map(({ neighbourhood, ...v }) => ({
      neighbourhood,
      posId: getGridPositionId(grid, v),
    }));
}

export const utils = {
  isValidGridPosition: (grid: Grid, { row, col }: GridPosition) => {
    return row >= 0 && row < grid.rows && col >= 0 && col < grid.cols;
  },
  isCorner: (grid: Grid, row: number, col: number) => {
    const corners = [
      [0, 0],
      [0, grid.cols - 1],
      [grid.rows - 1, 0],
      [grid.rows - 1, grid.cols - 1],
    ];
    return corners.some(([r, c]) => r === row && c === col);
  },
  isSide: (grid: Grid, row: number, col: number) => {
    const sides = [
      row === 0,
      col === 0,
      row === grid.rows - 1,
      col === grid.cols - 1,
    ];
    return sides.some((v) => v);
  },
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
