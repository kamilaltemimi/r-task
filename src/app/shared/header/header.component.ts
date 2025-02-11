import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { CrewMember } from '@Core/interfaces/crew-member.interface';

import { CrewService } from '@Services/crew/crew.service';
import { filter, switchMap, map, EMPTY } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  selectedCrewMember = signal<CrewMember | null>(null);

  constructor(
    private crewService: CrewService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCrewMemberDetails();
  }

  getCrewMemberDetails(): void {
    const memberId =
      this.activatedRoute.firstChild?.snapshot.paramMap.get('id');
    if (memberId) {
      this.crewService.getCrewData().subscribe((members) => {
        const member = members.find((m) => m.id === memberId);
        this.selectedCrewMember.set(member || null);
      });
    }

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => {
          const childRoute = this.activatedRoute.firstChild;
          return childRoute?.paramMap || EMPTY;
        }),
        filter((params) => params.has('id')),
        switchMap((params) => {
          const id = params.get('id')!;
          return this.crewService
            .getCrewData()
            .pipe(map((members) => members.find((member) => member.id === id)));
        })
      )
      .subscribe((member) => {
        this.selectedCrewMember.set(member || null);
      });
  }

  goToMainPage(): void {
    this.router.navigate(['']);
  }
}
