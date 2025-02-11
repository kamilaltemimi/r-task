import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { StarlinkCategoryViewModel } from '@Interfaces/starlink-category-view-model.interface';

import { StarlinkService } from '@Services/starlink/starlink.service';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-starlink',
  imports: [CommonModule],
  templateUrl: './starlink.component.html',
  styleUrls: ['./starlink.component.scss']
})
export class StarlinkComponent implements OnInit, OnDestroy {
  starlinkData = signal<StarlinkCategoryViewModel>({
    divisibleBy3: [],
    divisibleBy5: [],
    isDivisibleBy3and5: [],
    notDivisibleBy3And5: []
  });

  private destroy$ = new Subject<void>();

  constructor(
    private starlinkService: StarlinkService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStarlinkData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getStarlinkData(): void {
    this.starlinkService
      .getStarlinkData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.starlinkData.set(data);
      });
  }

  selectStarlink(id: string): void {
    this.router.navigate([`starlink-stats/${id}`]);
  }
}
