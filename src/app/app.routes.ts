import { Routes } from '@angular/router';
import { NotFoundPage, QuestsOverview, ShopOverview, StandingsOverview } from './features';

export const routes: Routes = [
  { path: '', redirectTo: 'standings', pathMatch: 'full' },
  { path: 'standings', component: StandingsOverview },
  { path: 'quests', component: QuestsOverview },
  { path: 'shop', component: ShopOverview },
  { path: '**', component: NotFoundPage },
];
