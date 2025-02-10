import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarlinkService } from '@Services/starlink/starlink.service';

import { Launch } from '@Interfaces/launch.interface';

import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-starlink-stats',
  imports: [CommonModule],
  templateUrl: './starlink-stats.component.html',
  styleUrl: './starlink-stats.component.scss'
})
export class StarlinkStatsComponent implements OnInit, OnDestroy {
  launchDetails = signal<Launch | null>(null);
  totalPayloadMass = signal<number | null>(null);

  private destroy$ = new Subject<void>();

  constructor(private starlinkService: StarlinkService) {}

  ngOnInit(): void {
    this.getLaunchData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getLaunchData(): void {
    this.starlinkService
      .getDetails()
      .pipe(
        switchMap((launchData) => {
          this.launchDetails.set(launchData);
          return this.starlinkService.getPayloadMassByLaunchId(launchData.id);
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((mass: number | null) => {
        this.totalPayloadMass.set(mass);
      });
  }
}
