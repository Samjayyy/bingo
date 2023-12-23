import { Injectable } from "@angular/core";
import { StoreService } from "./stores";
import { BingoDrawer } from "src/app/shared/models/bingo-drawer.model";

@Injectable({ providedIn: "root" })
export class BingoStore extends StoreService<BingoDrawer> {
  constructor() {
    super();
  }

  public createNew(gameId: string, numberOfBalls: number): void {
    const bingoDrawer = new BingoDrawer(gameId, numberOfBalls)
    this.next(bingoDrawer);
  }
}
