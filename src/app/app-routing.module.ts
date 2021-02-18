import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { GwHistoryComponent } from './components/gw-history/gw-history.component';
import { PlayerTopListComponent } from './components/player-top-list/player-top-list.component';
import { TeamTopListComponent } from './components/team-top-list/team-top-list.component';
import { PlayerComponent } from './components/player/player.component';

const routes: Routes = [
  { path: '', component: PlayerListComponent },
  { path: 'player', component: PlayerListComponent },
  { path: 'gw-history', component: GwHistoryComponent },
  { path: 'player-top', component: PlayerTopListComponent },
  { path: 'team-top', component: TeamTopListComponent },
  { path: 'player/:id', component: PlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
