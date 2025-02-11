import { Routes } from '@angular/router';

import { MainLayoutComponent } from '@Components/main.layout.component';
import { CrewComponent } from '@Components/crew/crew.component';
import { ProfilePageComponent } from '@Components/profile-page/profile-page.component';
import { StarlinkStatsComponent } from '@Components/starlink-stats/starlink-stats.component';
import { StarlinkComponent } from '@Components/starlink/starlink.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: CrewComponent },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'starlink-stats', component: StarlinkComponent },
      { path: 'starlink-stats/:id', component: StarlinkStatsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
