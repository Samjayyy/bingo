import { Injectable } from "@angular/core";
import { StoreService } from "./stores";
import { BingoCard } from "src/app/shared/models/bingo-card.model";
import { BingoDrawer } from "src/app/shared/models/bingo-drawer.model";

@Injectable({ providedIn: "root" })
export class CardStore extends StoreService<BingoCard> {
  constructor() {
    super();
  }

  public createNew(playerid: string, numberOfBalls: number, rowCount: number, columnCount: number, syncFromDrawer?: BingoDrawer): void {
    const bingoCard = new BingoCard(playerid, numberOfBalls, rowCount, columnCount);
    syncFromDrawer?.allDrawnNumbers.forEach(n => bingoCard.flipDrawn(n));
    this.next(bingoCard);
  }
}
