import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { CrewService } from '@Services/crew/crew.service';

import { CrewMember } from '@Interfaces/crew-member.interface';

@Component({
  selector: 'app-crew',
  imports: [CommonModule, RouterModule],
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss'
})
export class CrewComponent implements OnInit {
  crewDataList = signal<CrewMember[] | null>(null);

  constructor(
    private crewService: CrewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeCrewList();
  }

  private initializeCrewList(): void {
    this.crewService.getCrewData().subscribe((crew: CrewMember[]) => {
      this.crewDataList.set(crew);
    });
  }

  selectCrewMember(member: CrewMember): void {
    this.router.navigate([`profile/${member.id}`]);
  }
}
