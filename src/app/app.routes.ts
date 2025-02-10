import { Routes } from '@angular/router';

import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { CrewComponent } from './components/crew/crew.component';
import { StarlinkComponent } from './components/starlink/starlink.component';
import { StarlinkStatsComponent } from './components/starlink-stats/starlink-stats.component';

export const routes: Routes = [
  { path: '', component: CrewComponent },
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: 'starlink-stats', component: StarlinkComponent },
  { path: 'starlink-stats/:id', component: StarlinkStatsComponent },
  { path: '**', redirectTo: '' }
];
