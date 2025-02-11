import { Component, OnInit, Signal } from '@angular/core';

import { CrewMember } from '@Core/interfaces/crew-member.interface';

import { CrewStore } from '@Core/store/crew-store';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  selectedCrewMember!: Signal<CrewMember | null>;

  constructor(private crewStore: CrewStore) {}

  ngOnInit(): void {
    this.getCrewMemberDetails();
  }

  getCrewMemberDetails(): void {
    this.selectedCrewMember = this.crewStore.selectedMember;
  }
}
