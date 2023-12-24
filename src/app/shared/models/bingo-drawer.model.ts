import * as seedrandom from "seedrandom";
import { shuffleArray } from "src/app/core/util/arrays";

export class BingoDrawer {
    drawnNumbers: number;
    orderedNumbers: number[];
    numberOccurence: number[];

    constructor(
        public readonly seed: string
        , public readonly numberOfBalls: number
    ) {
        this.drawnNumbers = 0;
        this.orderedNumbers = [...Array(numberOfBalls).keys()];
        seedrandom(seed, { global: true });
        shuffleArray(this.orderedNumbers);

        this.numberOccurence = [];
        this.orderedNumbers.forEach((v, ix) => this.numberOccurence[v] = ix + 1);
    }
    public hasNext(): boolean {
        return this.drawnNumbers < this.numberOfBalls;
    }

    public previous(): void {
        if (this.drawnNumbers <= 0) {
            return;
        }
        this.drawnNumbers--;
    }
    public next(): void {
        if (!this.hasNext) {
            return;
        }
        this.drawnNumbers++;
    }

    public get allDrawnNumbers(): number[] {
        if (this.drawnNumbers <= 1) {
            return [];
        }
        return this.orderedNumbers.slice(0, this.drawnNumbers - 1).map(x => x + 1);
    }

    public getNumber(position: number): number {
        if (position < 0 || position >= this.numberOfBalls) {
            return -1;
        }
        return this.orderedNumbers[position] + 1;
    }

    public get lastDrawnNumber(): number {
        return this.getNumber(this.drawnNumbers - 1);
    }

}

