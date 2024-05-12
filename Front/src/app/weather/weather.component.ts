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
  weatherData$: Observable<any> | undefined; // Initialize weatherData$ as Observable<any> | undefined

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getWeatherData('London'); // Replace 'London' with the desired city
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
        map((result: any) => { // Use 'any' type for result to handle 'unknown' data type
          return result.data.getWeatherByCityName;
        })
      );
  }
}
