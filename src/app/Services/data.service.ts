 import { Injectable } from '@angular/core';
 import { HttpParams , HttpClient } from '@angular/common/http';
 import { Hotel } from '../hotel.model';
 import { Ville } from '../ville.model';
 import { Arrangemnt } from '../arrangement.model';
 import { Scraping } from '../scraping.model';
 import { Hotelunique } from '../hotunique.model';
 import { Price } from '../price.model';
 import { ChartData } from '../dataChart.model';
 import {  ContentUserComponent } from '../components/content-user/content-user.component';
 import { Observable , of } from 'rxjs';


 @Injectable({
  providedIn: 'root'
})
 export class DataService {
    

  private baseUrl = 'http://api.scrapi.test/get';
  private baseu = 'http://api.scrapi.test/unique';
  private baseChart = 'http://api.scrapi.test/model';


  constructor(private http: HttpClient) { }
  
   
   getHotels():Observable<Hotel[]>
   {
    return this.http.get<Hotel[]>(this.baseUrl) ;
  }
  getVille():Observable<Ville[]>
   {
    return this.http.get<Ville[]>(this.baseUrl) ;
  }
  getPrice():Observable<Price[]>
   {
    return this.http.get<Price[]>(this.baseUrl) ;
  }
  getArrangemnt():Observable<Arrangemnt[]>
   {
    return this.http.get<Arrangemnt[]>(this.baseUrl) ;
  }
  getScraping():Observable<Scraping[]>
   {
    return this.http.get<Scraping[]>(this.baseUrl) ;
  }
  getunique():Observable<Hotelunique[]>
  {
   
   return this.http.get<Hotelunique[]>(this.baseu) ;
 }
//  getChartDatas():Observable<ChartData[]>
//  {
//   return this.http.get<ChartData[]>(this.baseChart) ;
// }

}
