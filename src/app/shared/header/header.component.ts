import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrewService } from '@Services/crew/crew.service';
import { StorageService } from '@Services/storage/storage.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  get crewMemberData() {
    return this.crewService.crewMemberData;
  }

  constructor(
    private crewService: CrewService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCrewMember();
  }

  private loadCrewMember(): void {
    const savedMember = this.storageService.getMemberFromSessionStorage();
    this.crewService.setCrewMemberData(savedMember);
  }

  goToMainPage(): void {
    this.router.navigate(['']);
  }
}
