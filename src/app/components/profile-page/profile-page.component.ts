import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CrewService } from '../../core/services/crew/crew.service';

import { CrewMember } from '@Core/interfaces/crew-member.interface';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  selectedCrewMember = signal<CrewMember | null>(null);

  private destroy$ = new Subject<void>();

  constructor(
    private crewService: CrewService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCrewMemberDetails();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCrewMemberDetails(): void {
    const crewMemberId = this.activatedRoute.snapshot.params['id'];

    this.crewService
      .getCrewData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((crewMembers) => {
        const foundCrewMember = crewMembers.find(
          (member) => member.id === crewMemberId
        );
        if (foundCrewMember) {
          this.selectedCrewMember.set(foundCrewMember);
        } else {
          console.error(`Crew member with ID ${crewMemberId} not found.`);
        }
      });
  }
}
