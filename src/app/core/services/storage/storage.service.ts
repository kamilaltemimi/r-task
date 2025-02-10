import { Injectable } from '@angular/core';

import { SESSION_STORAGE_CREW_MEMBER_DATA_KEY } from '../../constants/storage.constants';

import { CrewMember } from '@Interfaces/crew-member.interface';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() {}

  saveMemberToSessionStorage(member: CrewMember) {
    sessionStorage.setItem(
      SESSION_STORAGE_CREW_MEMBER_DATA_KEY,
      JSON.stringify(member)
    );
  }

  getMemberFromSessionStorage() {
    const savedData = sessionStorage.getItem(
      SESSION_STORAGE_CREW_MEMBER_DATA_KEY
    );
    if (!savedData) {
      return null;
    }
    const parsedData = JSON.parse(savedData);
    return parsedData;
  }
}
