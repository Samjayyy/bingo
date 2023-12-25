import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { GaService } from "src/app/core/services/ext/ga.service";
import { BingoStore } from "src/app/core/services/store/bingo.store";
import { CardStore } from "src/app/core/services/store/card.store";
import { generateRandomString } from "src/app/core/util/rand";
import { BingoCard, BingoCardCell } from "src/app/shared/models/bingo-card.model";
import { BingoDrawer } from "src/app/shared/models/bingo-drawer.model";

@Component({
  selector: "app-bingo-card",
  templateUrl: "./bingo-card.component.html",
  styleUrls: ["./bingo-card.component.scss"],
})
export class BingoCardComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  public drawer: BingoDrawer = null;
  public cards: BingoCard[] = null;

  playerid = "";
  columnCount = 5;
  rowCount = 5;
  numberOfBalls = 75;
  configuring = true;
  syncFromDrawer = false;
  cardCount = 3;

  constructor(
    private bingoStore: BingoStore,
    private bingoCardStore: CardStore,
    private gaService: GaService,
  ) {
    this.bingoStore.store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(store => this.drawer = store.data);

    this.bingoCardStore.store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(store => {
        if (this.cards !== store.data) {
          this.configuring = false;
        }
        this.cards = store.data;
      });
  }

  ngOnInit() { }

  showCard(): void {
    this.bingoCardStore.createNew(this.playerid, this.numberOfBalls, this.rowCount, this.columnCount, this.cardCount, this.syncFromDrawer ? this.drawer : undefined);
    // this.gaService.emitEvent( // TODO SAM
    //   "bingo",
    //   "card",
    //   this.playerid,
    //   this.numberOfBalls,
    // );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
