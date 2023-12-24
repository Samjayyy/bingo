import { Injectable } from "@angular/core";
import { StoreService } from "./stores";
import { BingoCard } from "src/app/shared/models/bingo-card.model";

@Injectable({ providedIn: "root" })
export class CardStore extends StoreService<BingoCard> {
  constructor() {
    super();
  }

  public createNew(playerid: string, numberOfBalls: number, rowCount: number, columnCount: number): void {
    const bingoCard = new BingoCard(playerid, numberOfBalls, rowCount, columnCount);
    this.next(bingoCard);
  }
}
