import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpModule} from '../services/httpt.service';
import {catchError, mergeMap, Subject, Subscription, takeUntil, throwError} from "rxjs";

type StatusType = 'intro' | 'loader' | 'success' | 'error'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  showLoader = false
  searchCityName = ''
  longitude = 1
  latitude = 1
  currentTemp!: number
  status: StatusType = 'intro'
  city!: string

  // private destroy$ = new Subject<void>();
  private subscription = new Subscription();

  constructor(private httpRequest: HttpModule) {
  }


  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.destroy$.next();
    // this.destroy$.complete();
  }

  onSearch() {
    this.showLoader = true
    this.status = 'loader'
    this.subscription.add(this.httpRequest.getCoordinatesByLocationName(this.searchCityName)
      .pipe(
        mergeMap((response) => {
            if (!response?.length) {
              return throwError(response);
            }

            this.latitude = response[0].lat
            this.longitude = response[0].lon
            return this.httpRequest.getWeatherByCoordinate(response[0].lat, response[0].lon)
          }
        ),
        catchError((err) => {
            console.log(err);
            this.status = 'error'
            return throwError(err);
          },
        ),
        ).subscribe(
      response => {

        console.log(response)
        console.log('latitude', this.latitude)
        this.showLoader = false
        this.currentTemp = response.main.temp
        this.searchCityName = ''
        this.city = response.name
        this.status = 'success'
      }))
  }

}
