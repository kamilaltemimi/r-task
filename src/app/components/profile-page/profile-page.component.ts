import { Component, computed } from '@angular/core';

import { CrewService } from '@Services/crew/crew.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  selectedCrewMember = computed(() => this.crewService.crewMemberData());

  constructor(private crewService: CrewService) {}
}
