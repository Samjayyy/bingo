import { Component, OnInit, OnDestroy } from '@angular/core';
import { BingoDrawer } from 'src/app/shared/models/bingo-drawer.model';
import { BingoStore } from 'src/app/core/services/store/bingo.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-drawer-state',
  templateUrl: './drawer-state.component.html',
  styleUrls: ['./drawer-state.component.scss']
})
export class GameScoreComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  public drawer: BingoDrawer = null;

  constructor(
    private bingoStore: BingoStore
  ) { }

  ngOnInit() {
    this.bingoStore.store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(store => this.drawer = store.data);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}