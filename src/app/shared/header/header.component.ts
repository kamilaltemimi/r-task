import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { CrewMember } from '@Core/interfaces/crew-member.interface';

import { CrewService } from '@Services/crew/crew.service';

import { filter, switchMap, map, EMPTY, merge, of } from 'rxjs';

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
    const initialId$ = of(
      this.activatedRoute.firstChild?.snapshot.paramMap
    ).pipe(map((params) => params?.get('id') || null));

    const navigation$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.activatedRoute.firstChild?.paramMap || EMPTY),
      switchMap((paramMap) => paramMap),
      map((params) => params.get('id'))
    );

    merge(initialId$, navigation$)
      .pipe(
        filter((id): id is string => !!id),
        switchMap((id) =>
          this.crewService
            .getCrewData()
            .pipe(map((members) => members.find((member) => member.id === id)))
        )
      )
      .subscribe((member) => {
        this.selectedCrewMember.set(member || null);
      });
  }

  goToMainPage(): void {
    this.router.navigate(['']);
  }
}
