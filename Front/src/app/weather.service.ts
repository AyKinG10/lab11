// src/app/weather.component.ts

import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  weatherData$: Observable<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getWeatherData('London'); // Замените на нужный город
  }

  getWeatherData(city: string): void {
    this.weatherData$ = this.apollo
      .query({
        query: gql`
          query GetWeatherByCity($city: String!) {
            getWeatherByCityName(city: $city) {
              temperature
              description
              cityName
              minTemp
              maxTemp
            }
          }
        `,
        variables: {
          city,
        },
      })
      .pipe(
        map((result) => {
          return result.data.getWeatherByCityName;
        })
      );
  }
}
