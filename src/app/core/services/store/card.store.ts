import { Injectable } from "@angular/core";
import { StoreService } from "./stores";
import { BingoCard } from "src/app/shared/models/bingo-card.model";
import { BingoDrawer } from "src/app/shared/models/bingo-drawer.model";
import { generateRandomString } from "../../util/rand";

@Injectable({ providedIn: "root" })
export class CardStore extends StoreService<BingoCard[]> {
  constructor() {
    super();
  }

  public createNew(playerid: string, numberOfBalls: number, rowCount: number, columnCount: number, cardCount: number, syncFromDrawer?: BingoDrawer): void {
    if (playerid === "") {
      playerid = generateRandomString(5);
    }
    const bingoCards: BingoCard[] = [];
    for (let i = 1; i <= cardCount; i++) {
      const bingoCard = new BingoCard(cardCount > 1 ? playerid + "-" + i : playerid, numberOfBalls, rowCount, columnCount);
      syncFromDrawer?.allDrawnNumbers.forEach(n => bingoCard.flipDrawn(n));
      bingoCards.push(bingoCard);
    }
    this.next(bingoCards);
  }
}
