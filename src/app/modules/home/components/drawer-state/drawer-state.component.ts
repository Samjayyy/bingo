import { Component, OnInit, OnDestroy } from '@angular/core';
import { BingoDrawer } from 'src/app/shared/models/bingo-drawer.model';
import { BingoStore } from 'src/app/core/services/store/bingo.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardStore } from 'src/app/core/services/store/card.store';
import { BingoCard } from 'src/app/shared/models/bingo-card.model';

@Component({
  selector: 'app-drawer-state',
  templateUrl: './drawer-state.component.html',
  styleUrls: ['./drawer-state.component.scss']
})
export class GameScoreComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  public drawer: BingoDrawer = null;
  public cards: BingoCard[] = null;

  constructor(
    private bingoStore: BingoStore,
    private cardStore: CardStore
  ) { }

  ngOnInit() {
    this.bingoStore.store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(store => this.drawer = store.data);
    this.cardStore.store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(store => this.cards = store.data);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}