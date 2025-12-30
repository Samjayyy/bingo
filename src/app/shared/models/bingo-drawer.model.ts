import * as seedrandom from "seedrandom";
import { shuffleArray } from "src/app/core/util/arrays";
import { BingoValue, ValueConverter } from "src/app/core/util/value-converter";

export class BingoDrawer {
    drawnCount: number;
    orderedIndexes: number[];

    constructor(
        public readonly seed: string
        , public readonly numberOfBalls: number
        , public readonly valueConverter: ValueConverter
    ) {
        this.drawnCount = 0;
        this.orderedIndexes = [...Array(numberOfBalls).keys()]; // [0,1,...,N-1]
        seedrandom(seed, { global: true });
        shuffleArray(this.orderedIndexes);
    }
    public hasNext(): boolean {
        return this.drawnCount < this.numberOfBalls;
    }

    public previous(): void {
        if (this.drawnCount <= 0) {
            return;
        }
        this.drawnCount--;
    }
    public next(): void {
        if (!this.hasNext) {
            return;
        }
        this.drawnCount++;
    }

    public get allDrawnValues(): BingoValue[] {
        if (this.drawnCount <= 1) {
            return [];
        }
        return this.orderedIndexes.slice(0, this.drawnCount - 1).map(pos => this.valueConverter.getValue(pos));
    }

    public getBingoValue(position: number): BingoValue | undefined {
        if (position < 0 || position >= this.numberOfBalls) {
            return undefined;
        }
        return this.valueConverter.getValue(this.orderedIndexes[position]);
    }

    public get lastDrawn(): BingoValue | undefined {
        return this.getBingoValue(this.drawnCount - 1);
    }

}

