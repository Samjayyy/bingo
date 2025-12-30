import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { GaService } from "src/app/core/services/ext/ga.service";
import { BingoStore } from "src/app/core/services/store/bingo.store";
import { generateRandomString } from "src/app/core/util/rand";

@Component({
  selector: "app-start-game",
  templateUrl: "./start-game.component.html",
  styleUrls: ["./start-game.component.scss"],
})
export class StartGameComponent implements OnInit {
  gameid = "";
  cardSize = 5;
  numberOfBalls = 75;
  isFixedNumberOfBalls: boolean = false;
  typeSecret = false;
  startRandom = false;

  constructor(
    private bingoStore: BingoStore,
    private router: Router,
    private gaService: GaService,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (bingoStore.converter.getFixedValueCount() !== undefined) {
      this.numberOfBalls = bingoStore.converter.getFixedValueCount();
      this.isFixedNumberOfBalls = true;
    }
   }

  ngOnInit() { }

  startBingo(): void {
    this.bingoStore.createNew(this.gameid, this.numberOfBalls);
    this.gaService.emitEvent(
      "bingo",
      "drawer",
      this.gameid,
      1,
    );
    this.router.navigate(["/drawer"]);
  }

  public get link(): string {
    return this.document.location.toString();
  }

  public takeRandom(): void {
    this.gameid = generateRandomString(5);
  }
}
