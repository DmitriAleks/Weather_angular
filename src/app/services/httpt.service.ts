import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";


interface CoordinatesResponse {
  country: string
  lat: number
  local_names: any
  lon: number
  name: string
  state: string
}

interface WeatherResponse {
  base: string
  clouds: {all: number}
  cod: number
  coord: {lon: number, lat: number}
  dt: number
  id: number
  main: {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_max: number
    temp_min: number
    name: string
  }
  name: "Minsk City"
  sys: {type: number, id: number, country: string, sunrise: number, sunset: number}
  timezone: number
  visibility: number
  weather: [{id: number, main: string, description: string, icon: string}]
  wind: {speed: number, deg: number, gust: number}
}

@Injectable({providedIn: 'root'})


export class HttpModule {


  constructor(private http: HttpClient) {
  }

  getCoordinatesByLocationName(localName: string): Observable<CoordinatesResponse[]> {
    return this.http.get<CoordinatesResponse[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${localName}&appid=6512c45d086c4a87938f4eb18dda0056`)
  }

  getWeatherByCoordinate(lat: number, lon: number):Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6512c45d086c4a87938f4eb18dda0056&units=metric&lang=ru`)
  }
}
