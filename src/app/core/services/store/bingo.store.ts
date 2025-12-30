import { Injectable } from "@angular/core";
import { StoreService } from "./stores";
import { BingoDrawer } from "src/app/shared/models/bingo-drawer.model";
import { ValueConverter, getValueOutputter } from "../../util/value-converter";

@Injectable({ providedIn: "root" })
export class BingoStore extends StoreService<BingoDrawer> {
  public readonly converter: ValueConverter = getValueOutputter("nye26"); // TODO maybe somehow from local storage?

  constructor() {
    super();
  }

  public createNew(gameId: string, numberOfBalls: number): void {
    const bingoDrawer = new BingoDrawer(
      gameId,
      this.converter.getFixedValueCount() ?? numberOfBalls,
      this.converter
    );
    this.next(bingoDrawer);
  }
}
