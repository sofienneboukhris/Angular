import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/hotel.model';
import { Ville } from '../../ville.model';
import { Arrangemnt } from '../../arrangement.model';
import { Price } from '../../price.model';
import { Scraping } from '../../scraping.model';
import { Hotelunique } from '../../hotunique.model';
import { ChartData } from '../../dataChart.model';
import { DataService } from '../../services/data.service';
import {Chart} from 'chart.js';
import { HttpClient,HttpParams } from '@angular/common/http';
import { JarwisService } from '../../services/jarwis.service';
import 'rxjs/add/operator/map';
import { IDataOptions, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { DataManager, WebApiAdaptor  } from '@syncfusion/ej2-data';


import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPivotGridModule, DxCheckBoxModule } from 'devextreme-angular';

import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';


@Component({
  selector: 'app-content-user',
  templateUrl: './content-user.component.html',
  styleUrls: ['./content-user.component.css']
})
export class ContentUserComponent implements OnInit {
//  pivotGridDataSource: any;
//     showDataFields: boolean = true;
//     showRowFields: boolean = true;
//     showColumnFields: boolean = true;
//     showFilterFields: boolean = true;

   dataa: DataManager;
public dataSource: IDataOptions;
public width: string;
  
    hotels : Hotel[]= [] ;
    arrangemnt : Arrangemnt[]= [] ;
    ville : Ville[]= [] ;
    price : Price[]= [] ;
    scraping : Scraping[]= [] ;
    libelle_hotU : Hotelunique[]= [] ;
    ChartData : ChartData[]=[] ;

    public select = {
      selectedOption: null,
      date1 :null ,
      date2 :null
    };
    public modelDeb = {
      day :null ,
      month : null ,
      year : null
    };
    public modelFin = {
      day :null ,
      month : null ,
      year : null
    };
    date_dep: any[] =[];
    prices: number []=[] ;
    // id =[] ;
    constructor(private dataService : DataService ,
                private Jarwis: JarwisService,
                private http: HttpClient)
           {  
              // this.pivotGridDataSource = new PivotGridDataSource({
          //  fields: [{
          //       caption: "id",
          //       width: 120,
          //       dataField: "id",
          //       area: "row"
          //   }],
            //  {
            //     caption: "City",
            //     dataField: "city",
            //     width: 150,
            //     area: "row",
            //     selector: function(data: Sale) {
            //         return  data.city + " (" + data.country + ")";
            //     }
            // }, {
            //     dataField: "date",
            //     dataType: "date",
            //     area: "column"
            // }, {
            //     dataField: "sales",
            //     dataType: "number",
            //     summaryType: "sum",
            //     format: "currency",
            //     area: "data"
            // }],
        //     store:  this.dataService.getunique() 
        // });
      }
            
    LineChart=[];
    public error = null ;
   
    ngOnInit() {
      return this.getProfile() ,
      this.getAllhotels() ,
      this.getChartData(),
      this.getTable()
    }
    getTable(){
      this.dataa = new DataManager({
        url:  'https://bi.syncfusion.com/northwindservice/api/orders',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
  
  // this.dataSource = {
  //         data: this.dataa,
  //     expandAll: false,
  //     rows: [{ name: 'ProductName', caption: 'Product Name' }],
  //     columns: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
  //     formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
  //     values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }],
  //     filters: []    
  // };
    }
    onSelect(){
      this.Jarwis.select(this.select).subscribe(
        (select) => this.select.selectedOption,
        error => this.handleError(error),
      );
      this.select.date1 = String(this.modelDeb.year) + '-'+ String(this.modelDeb.month) + '-' + String(this.modelDeb.day)  ;
      this.Jarwis.select(this.select).subscribe(
        (select) => this.select,
      );
      this.select.date2 = String(this.modelFin.year) + '-'+ String(this.modelFin.month) + '-' + String(this.modelFin.day)  ;
      this.Jarwis.select(this.select).subscribe(
        (select) => this.select,
      );
      
      

      let hotel =this.select.selectedOption;
      let dateDeb =this.select.date1;
      let datefin =this.select.date2;

    var data = {'selectedOption': hotel ,'date1' : dateDeb ,'date2':datefin} ;
      // this.Jarwis.select(data).subscribe( data => {
      //   this.ChartData= data ;
      //   });
        this.Jarwis.select(data).subscribe(res => {
            console.log(res)
            let date = res['chart'].map(res => res.date_dep);
            let price = res['chart'].map(res => res.price);
            let hotel = res['chart'].map(res => res.hotel);

           
          console.log(data);
// date.forEach((res) => {

//   date_dep.push(date)
// })
      this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
       labels:date,
       datasets: [{
           label: 'Number of Items Sold in Months',
           borderColor: '#3cba9f',
           data: price,
           fill:false,

       }]
      },
      options: {
        legend: {
          display: false
        },
      //  title:{
      //      text:"Line Chart",
      //      display:true
      //  },
       scales: {
      //      yAxes: [{
      //          ticks: {
      //              beginAtZero:true
      //          }
      //      }]
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: true
      }],
       }

      }
      });
    });
    }
    getProfile(){
      this.dataService.getunique()
      .subscribe(
        data =>
        {
          this.libelle_hotU= data ;

        }
      );
    }
    getChartData(){
      this.Jarwis.select(this.select)
      .subscribe(
        data =>
        {
          this.ChartData= data ;
         
        }
      );
      console.log(this.ChartData);
    }
    getAllhotels(){
      this.dataService.getHotels().subscribe((all)=>{
        this.hotels=all ;
      });

    }


    getAllville(){
      this.dataService.getVille().subscribe((all)=>{
        this.ville=all ;

      });
    }
    getAllarrangemnt(){
      this.dataService.getArrangemnt().subscribe((all)=>{
        this.arrangemnt=all ;
      });
    }
    getAllPrice(){
      this.dataService.getPrice().subscribe((all)=>{
        this.price=all ;

      });
    }
    getAllscraping(){
      this.dataService.getScraping().subscribe((all)=>{
        this.scraping=all ;

      });

    }
  //   getChartData(){
  //     this.dataService.getVille().subscribe((res: Ville[]) => {
  //         res.forEach(y => {
  //           this.id.push(y.id);

  //         });
  //   this.LineChart = new Chart('lineChart', {
  //     type: 'line',
  //   data: {
  //    labels: this.id,
  //    datasets: [{
  //        label: 'Number of Items Sold in Months',
  //        data: this.id ,
  //        fill:false,
  //        lineTension:0.2,
  //        borderColor:"red",
  //        borderWidth: 5
  //    }]
  //   },
  //   options: {
  //    title:{
  //        text:"Line Chart",
  //        display:true
  //    },
  //    scales: {
  //        yAxes: [{
  //            ticks: {
  //                beginAtZero:true
  //            }
  //        }]
  //    }
  //   }
  //   });
  // });
  // }
  handleError(error) {
    this.error = error.error ;
    console.log(this.error) ;
  }
  }

