import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { StarlinkCategoryViewModel } from '@Interfaces/starlink-category-view-model.interface';
import { StarlinkResponse } from '@Interfaces/starlink-response.interface';
import { StarlinkViewModel } from '@Interfaces/starlink-view-model.interface';
import { Starlink } from '@Interfaces/starlink.interface';
import { Launch } from '@Interfaces/launch.interface';
import { Payload } from '@Interfaces/payload.interface';

@Injectable({
  providedIn: 'root'
})
export class StarlinkService {
  private URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStarlinkData(): Observable<StarlinkCategoryViewModel> {
    return this.http
      .get<StarlinkResponse[]>(`${this.URL}/starlink`)
      .pipe(map((starlinks) => this.transformData(starlinks)));
  }

  private transformData(
    starlinks: StarlinkResponse[]
  ): StarlinkCategoryViewModel {
    return starlinks.reduce(
      (acc, starlink) => {
        if (starlink.height_km === null) return acc;

        const height = Math.round(starlink.height_km);
        const isDivBy3 = height % 3 === 0;
        const isDivBy5 = height % 5 === 0;

        const transformedStarlink: StarlinkViewModel = {
          id: starlink.id,
          creationDate: starlink.spaceTrack.CREATION_DATE,
          objectName: starlink.spaceTrack.OBJECT_NAME,
          countryCode: starlink.spaceTrack.COUNTRY_CODE,
          heightKm: height
        };

        if (isDivBy3 && isDivBy5) {
          acc.isDivisibleBy3and5.push(transformedStarlink);
        } else if (isDivBy3) {
          acc.divisibleBy3.push(transformedStarlink);
        } else if (isDivBy5) {
          acc.divisibleBy5.push(transformedStarlink);
        } else {
          acc.notDivisibleBy3And5.push(transformedStarlink);
        }

        return acc;
      },
      {
        divisibleBy3: [],
        divisibleBy5: [],
        isDivisibleBy3and5: [],
        notDivisibleBy3And5: []
      } as StarlinkCategoryViewModel
    );
  }

  private formatDate(date: string): string {
    const launchDate = date.split('T')[0];
    const reverseDate = launchDate.split('-').reverse();
    return reverseDate.join('-');
  }

  private getLaunchDetails(launchId: string): Observable<Launch> {
    return this.http.get<Launch>(`${this.URL}/launches/${launchId}`).pipe(
      map((launch: Launch) => {
        return { ...launch, date_local: this.formatDate(launch.date_local) };
      })
    );
  }

  getDetails(starlinkId: string): Observable<Launch> {
    return this.http.get<Starlink>(`${this.URL}/starlink/${starlinkId}`).pipe(
      switchMap((starlinkData: Starlink) => {
        const launchId = starlinkData.launch;
        return this.getLaunchDetails(launchId!);
      })
    );
  }

  getPayloadMassByLaunchId(launchId: string): Observable<number | null> {
    return this.http.get<Payload[]>(`${this.URL}/payloads`).pipe(
      map((payloads: Payload[]) => {
        const payload = payloads.find((payload) => payload.launch === launchId);
        return payload ? payload.mass_kg : null;
      })
    );
  }
}
