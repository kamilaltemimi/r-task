import { Injectable, signal } from '@angular/core';

import { CrewMember } from '@Core/interfaces/crew-member.interface';

@Injectable({ providedIn: 'root' })
export class CrewStore {
  private selectedCrewMember = signal<CrewMember | null>(null);

  get selectedMember() {
    return this.selectedCrewMember;
  }

  set updateSelectedCrewMember(member: CrewMember) {
    this.selectedCrewMember.set(member);
  }
}
