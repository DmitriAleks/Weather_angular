import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


interface Weather {
    country: string
lat: 51.5073219
local_names: any
lon: string
name: string
state:string
}

@Injectable({providedIn: 'root'})


export class HttpModule {
    

    constructor(private http: HttpClient){}

    getCoordinatesByLocationName(localName: string){
        return this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${localName}&appid=6512c45d086c4a87938f4eb18dda0056`)
    }

    getWeater(lat:string,lon:string,){
        return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=6512c45d086c4a87938f4eb18dda0056`)
    }
}