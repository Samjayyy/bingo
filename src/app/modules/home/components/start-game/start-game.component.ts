import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { GaService } from "src/app/core/services/ext/ga.service";
import { BingoStore } from "src/app/core/services/store/bingo.store";

@Component({
  selector: "app-start-game",
  templateUrl: "./start-game.component.html",
  styleUrls: ["./start-game.component.scss"],
})
export class StartGameComponent implements OnInit {
  gameid = "";
  cardSize = 5;
  numberOfBalls = 75;
  typeSecret = false;
  startRandom = false;

  constructor(
    private bingoStore: BingoStore,
    private router: Router,
    private gaService: GaService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() { }

  startBingo(): void {
    this.bingoStore.createNew(this.gameid, this.numberOfBalls);
    this.gaService.emitEvent(
      "bingo",
      "start",
      this.gameid,
      1,
    );
    this.router.navigate(["/drawer"]);
  }

  public get link(): string {
    return this.document.location.toString();
  }

  public takeRandom(): void {
    this.gameid = this.generateRandomString(5);
  }

  private generateRandomString(length: number): string {
    const charSet = "abcdefghijklmnopqrstuvwxyz0123456789";
    let res = "";
    for (let i = 0; i < length; i++) {
      res += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return res;
  }
}
