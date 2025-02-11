import { Component, OnInit, signal } from '@angular/core';

import { CrewService } from '../../core/services/crew/crew.service';
import { ActivatedRoute } from '@angular/router';
import { CrewMember } from '@Core/interfaces/crew-member.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  selectedCrewMember = signal<CrewMember | null>(null);

  constructor(
    private crewService: CrewService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCrewMemberDetails();
  }

  getCrewMemberDetails(): void {
    const crewMemberId = this.activatedRoute.snapshot.params['id'];

    this.crewService.getCrewData().subscribe((crewMembers) => {
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
