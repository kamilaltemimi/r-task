import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { CrewService } from '@Services/crew/crew.service';
import { StorageService } from '@Services/storage/storage.service';

import { CrewMember } from '@Interfaces/crew-member.interface';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-crew',
  imports: [CommonModule, RouterModule],
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss'
})
export class CrewComponent implements OnInit {
  crewData$!: Observable<CrewMember[]>;

  constructor(
    private crewService: CrewService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initializeCrewList();
  }

  private initializeCrewList(): void {
    this.crewData$ = this.crewService.getCrewData();
  }

  selectCrewMember(member: CrewMember): void {
    this.storageService.saveMemberToSessionStorage(member);
    this.crewService.setCrewMemberData(member);
    this.router.navigate([`profile/${member.id}`]);
  }
}
