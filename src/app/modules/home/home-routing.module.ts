import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BingoDrawerComponent } from './components/drawer/drawer.component';
import { StartGameComponent } from './components/start-game/start-game.component';
import { BingoCardComponent } from './components/bingo-card/bingo-card.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    component: StartGameComponent
  },
  {
    path: 'drawer',
    component: BingoDrawerComponent,
  },
  {
    path: 'card',
    component: BingoCardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
