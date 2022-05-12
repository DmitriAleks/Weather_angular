import { Component, OnInit } from '@angular/core';
import { HttpModule } from '../services/httpt.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  searchCityName = ''
  lon = ''
  lan =''

  constructor(private httpRequest: HttpModule ) { }

  ngOnInit(): void {
  }
  onSeacrh(){
    this.httpRequest.getCoordinatesByLocationName(this.searchCityName).subscribe(response =>{
      // this.lan=response.lan
      // this.lon = response.lon
      console.log(response);


      
    })
  
  }

}
