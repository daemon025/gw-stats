import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

import { PlayerListComponent } from './components/player-list/player-list.component';
import { GwHistoryComponent } from './components/gw-history/gw-history.component';
import { PlayerTopListComponent } from './components/player-top-list/player-top-list.component';
import { TeamTopListComponent } from './components/team-top-list/team-top-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    GwHistoryComponent,
    PlayerTopListComponent,
    TeamTopListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
