import {
  getGridNeighbours,
  getGridPositionId,
  getGridPositionXY,
  getGridPosType,
} from "../chain-reaction/grid-utils";
import type { Grid } from "../chain-reaction/types";

describe("grid utils", () => {
  test("get gridXY position", () => {
    const grid: Grid = {
      rows: 10,
      cols: 5,
    };
    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        const posId = getGridPositionId(grid, { row, col });
        expect(getGridPositionXY(grid, posId)).toMatchObject({ row, col });
      }
    }
  });

  test("posType", () => {
    const grid: Grid = {
      rows: 10,
      cols: 5,
    };
    const getPos = (row: number, col: number) =>
      getGridPositionId(grid, { row, col });

    expect(getGridPosType(grid, getPos(0, 0))).toBe("corner");
    expect(getGridPosType(grid, getPos(0, 4))).toBe("corner");
    expect(getGridPosType(grid, getPos(9, 0))).toBe("corner");
    expect(getGridPosType(grid, getPos(9, 4))).toBe("corner");

    expect(getGridPosType(grid, getPos(0, 1))).toBe("side");
    expect(getGridPosType(grid, getPos(1, 0))).toBe("side");

    expect(getGridPosType(grid, getPos(1, 1))).toBe("other");
  });

  test("Neighbours", () => {
    const grid: Grid = {
      rows: 10,
      cols: 5,
    };

    expect(
      getGridNeighbours(grid, getGridPositionId(grid, { row: 0, col: 0 }))
    ).toEqual(
      expect.arrayContaining(
        [
          { pos: "right", row: 0, col: 1 },
          { pos: "bottom", row: 1, col: 0 },
        ].map(({ pos, ...v }) => ({
          neighbourhood: pos,
          posId: getGridPositionId(grid, v),
        }))
      )
    );
  });
});
