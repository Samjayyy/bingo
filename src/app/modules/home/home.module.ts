import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootComponent } from './components/root/root.component';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { BingoDrawerComponent } from './components/drawer/drawer.component';
import { StartGameComponent } from './components/start-game/start-game.component';
import { GameScoreComponent } from './components/drawer-state/drawer-state.component';
import { QRCodeModule } from 'angularx-qrcode';
import { GaService } from 'src/app/core/services/ext/ga.service';

@NgModule({
  declarations: [
    RootComponent,
    StartGameComponent,
    BingoDrawerComponent,
    GameScoreComponent,
  ],
  imports: [
    BrowserModule,
    HomeRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule,
  ],
  providers: [
    GaService
  ],
  bootstrap: [RootComponent],
  entryComponents: []
})
export class HomeModule {
}
