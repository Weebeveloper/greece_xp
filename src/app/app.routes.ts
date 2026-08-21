import { Routes } from '@angular/router';
import { NotFoundPage, QuestsOverview, ShopOverview, StandingsOverview } from './features';
import { StandingsApiService } from './features/standings-page/api.service';

export const routes: Routes = [
  { path: '', redirectTo: 'standings', pathMatch: 'full' },
  { path: 'standings', component: StandingsOverview, providers: [StandingsApiService] },
  { path: 'quests', component: QuestsOverview },
  { path: 'shop', component: ShopOverview },
  { path: '**', component: NotFoundPage },
];
