import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { CrewService } from '@Services/crew/crew.service';

import { CrewMember } from '@Interfaces/crew-member.interface';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-crew',
  imports: [CommonModule, RouterModule],
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss'
})
export class CrewComponent implements OnInit, OnDestroy {
  crewDataList = signal<CrewMember[] | null>(null);

  private destroy$ = new Subject<void>();

  constructor(
    private crewService: CrewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeCrewList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeCrewList(): void {
    this.crewService
      .getCrewData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((crew: CrewMember[]) => {
        this.crewDataList.set(crew);
      });
  }

  selectCrewMember(member: CrewMember): void {
    this.router.navigate([`profile/${member.id}`]);
  }
}
