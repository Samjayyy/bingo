import { Component, OnInit, OnDestroy } from "@angular/core";
import { BingoStore } from "src/app/core/services/store/bingo.store";
import { BingoDrawer } from "src/app/shared/models/bingo-drawer.model";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Router, NavigationEnd } from "@angular/router";
import { GaService } from "src/app/core/services/ext/ga.service";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"],
})
export class RootComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  lastGame: BingoDrawer = null;

  constructor(
    private gameStore: BingoStore,
    private gaService: GaService,
    private router: Router
  ) {}

  ngOnInit() {
    if (environment.enableAnalytics) {
      if (this.gaService.isEnabled()) {
        this.gaService.create();
        // subscribe to router events and send page views to Google Analytics
        this.router.events
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((event) => {
            if (!(event instanceof NavigationEnd)) {
              return;
            }
            this.gaService.pageVisited(event.urlAfterRedirects);
          });
      }
    }

    this.gameStore.store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((store) => {
        if (!store.isFetching && !store.error) {
          this.lastGame = store.data;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
