import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import { catchError, EMPTY, Observable } from 'rxjs';

import { CrewMember } from '@Interfaces/crew-member.interface';

@Injectable({ providedIn: 'root' })
export class CrewService {
  private URL = environment.apiUrl;

  crewMemberData = signal<CrewMember | null>(null);

  constructor(private http: HttpClient) {}

  getCrewData(): Observable<CrewMember[]> {
    return this.http.get<CrewMember[]>(`${this.URL}/crew`).pipe(
      catchError((error) => {
        console.error(error);
        return EMPTY;
      })
    );
  }

  setCrewMemberData(member: CrewMember): void {
    this.crewMemberData.set(member);
  }
}
