import * as seedrandom from "seedrandom";
import { shuffleArray } from "src/app/core/util/arrays";

export class BingoCard {
    grid: BingoCardCell[][];
    byValue: Map<number, BingoCardCell>;


    constructor(
        public readonly seed: string
        , public readonly numberOfBalls: number
        , public readonly rowCount: number
        , public readonly colCount: number
    ) {
        seedrandom("card-" + seed, { global: true });
        let rndNumber = [...Array(numberOfBalls).keys()]
            .map(n => n + 1);
        shuffleArray(rndNumber);
        rndNumber = rndNumber.slice(0, rowCount * colCount).sort((a, b) => a - b);

        this.grid = [];
        for (let r = 0; r < rowCount; r++) {
            this.grid[r] = [];
        }
        this.byValue = new Map();
        for (let c = 0, x = 0; c < colCount; c++) {
            let rowOrder = [...Array(rowCount).keys()];
            shuffleArray(rowOrder);

            for (let r = 0; r < rowCount; r++, x++) {
                const cell: BingoCardCell = {
                    row: rowOrder[r],
                    col: c,
                    val: rndNumber[x],
                    drawn: false,
                };
                this.grid[cell.row][cell.col] = cell;
                this.byValue.set(cell.val, cell);
            }
        }
    }


    public get totalDrawn(): number {
        return [...this.byValue.values()].filter(v => v.drawn).length;
    }

    public get totalNumbers(): number {
        return this.byValue.size;
    }

    public flipDrawn(val: number): void {
        const cell = this.byValue.get(val);
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
