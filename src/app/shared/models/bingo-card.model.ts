import * as seedrandom from "seedrandom";
import { shuffleArray } from "src/app/core/util/arrays";
import { ValueConverter } from "src/app/core/util/value-converter";

export class BingoCard {
    grid: BingoCardCell[][];
    byIndex: Map<number, BingoCardCell>;


    constructor(
        public readonly seed: string
        , public readonly numberOfBalls: number
        , public readonly rowCount: number
        , public readonly colCount: number
    ) {
        seedrandom("card-" + seed, { global: true });
        let rndIndexes = [...Array(numberOfBalls).keys()]; // [0,1,..,N-1]
        shuffleArray(rndIndexes);
        rndIndexes = rndIndexes.slice(0, rowCount * colCount).sort((a, b) => a - b);

        this.grid = [];
        for (let r = 0; r < rowCount; r++) {
            this.grid[r] = [];
        }
        this.byIndex = new Map();
        for (let c = 0, x = 0; c < colCount; c++) {
            let rowOrder = [...Array(rowCount).keys()];
            shuffleArray(rowOrder);

            for (let r = 0; r < rowCount; r++, x++) {
                const cell: BingoCardCell = {
                    row: rowOrder[r],
                    col: c,
                    val: rndIndexes[x],
                    drawn: false,
                };
                this.grid[cell.row][cell.col] = cell;
                this.byIndex.set(cell.val, cell);
            }
        }
    }


    public get totalDrawn(): number {
        return [...this.byIndex.values()].filter(v => v.drawn).length;
    }

    public get totalNumbers(): number {
        return this.byIndex.size;
    }

    public flipDrawn(index: number): void {
        const cell = this.byIndex.get(index);
        if (!cell) {
            return;
        }
        cell.drawn = !cell.drawn;
    }
}

export interface BingoCardCell {
    row: number;
    col: number;
    val: number;
    drawn: boolean;
}
