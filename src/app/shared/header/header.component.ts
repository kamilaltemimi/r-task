import { Component, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CrewMember } from '@Core/interfaces/crew-member.interface';
import { CrewService } from '@Core/services/crew/crew.service';

import { CrewStore } from '@Core/store/crew-store';

import {
  map,
  filter,
  EMPTY,
  switchMap,
  takeUntil,
  Subject,
  catchError
} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  selectedCrewMember!: Signal<CrewMember | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private crewStore: CrewStore,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crewService: CrewService
  ) {}

  ngOnInit() {
    this.setCrewMemberData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setCrewMemberData(): void {
    this.selectedCrewMember = this.crewStore.selectedMember;

    this.activatedRoute.firstChild?.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((id): id is string => !!id),
        switchMap((id) =>
          this.crewService.getCrewData().pipe(
            map((members) => members.find((member) => member.id === id)),
            catchError((error) => {
              console.error(error);
              return EMPTY;
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((member) => {
        if (member) {
          this.crewStore.updateSelectedCrewMember = member;
        }
      });
  }

  goToMainPage(): void {
    this.router.navigate(['']);
  }
}
