import { Injectable } from '@angular/core';
import { ChartData } from '../dataChart.model';
import { Observable , of } from 'rxjs';
import { HttpParams , HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JarwisService {
  private baseUrl = 'http://api.scrapi.test';
  private baseChart = 'http://api.scrapi.test/post';

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data)
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }

  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }

  select(select):Observable<ChartData[]>
  {
      let params = new HttpParams(); 
    Object.keys(select).forEach(function(item) {
    
      if(select[item] ) 
      params = params.set(item, select[item]);
    });
    return this.http.get<ChartData[]>(this.baseChart,{params : params}).map(result => result);
  }
 


}
