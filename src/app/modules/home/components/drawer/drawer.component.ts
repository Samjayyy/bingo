import { Component, OnInit, OnDestroy } from "@angular/core";
import { BingoDrawer } from "src/app/shared/models/bingo-drawer.model";
import { Subject, fromEvent, map, takeUntil } from "rxjs";
import { BingoStore } from "src/app/core/services/store/bingo.store";
@Component({
  selector: "app-bingo-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
})
export class BingoDrawerComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  public drawer: BingoDrawer = null;
  public spinning = false;

  constructor(
    private bingoStore: BingoStore
  ) { }

  ngOnInit() {
    this.bingoStore.store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(store => this.drawer = store.data);

    fromEvent(document.body, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe),
        map((e: KeyboardEvent) => typeof (e.key) !== 'undefined' ? e.key : String.fromCharCode(e.keyCode)),
        map((text: string) => text.toUpperCase()),
      )
      .subscribe((code: string) => {
        switch (code) {
          case 'BACKSPACE':
          case 'ARROWLEFT':
            this.prev();
            break;
          case ' ':
          case 'ENTER':
          case 'ARROWRIGHT':
            this.next();
            break;
        }
      });
  }

  prev(): void {
    if (this.spinning) {
      this.spinning = false;
    }
    if(this.drawer.drawnNumbers==0){
      return;
    }
    this.drawer.previous();
  }

  next(): void {
    if (this.spinning) {
      this.spinning = false;
      return;
    }
    if (!this.drawer.hasNext()) {
      return;
    }
    this.spinning = true;
    this.drawer.next();
  }

  trackByFn(n: number): number {
    return n;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
