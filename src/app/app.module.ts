import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JarwisService } from './services/jarwis.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { UserFooterComponent } from './components/user-footer/user-footer.component';
import { ContentUserComponent } from './components/content-user/content-user.component';
import { DataService } from './services/data.service';
import { ReactiveFormsModule} from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PivotViewAllModule, PivotFieldListAllModule } from '@syncfusion/ej2-angular-pivotview';
import { DxPivotGridModule, DxCheckBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,

    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    UserNavComponent,
    UserMenuComponent,
    UserFooterComponent,
    ContentUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule ,
    NgbModule ,
    ReactiveFormsModule ,
    DatePickerModule ,
    NgbPaginationModule, 
    NgbAlertModule ,
    GridModule,
    PivotViewAllModule,
    PivotFieldListAllModule   ,
    DxPivotGridModule,
    DxCheckBoxModule 
  ],
 

  providers: [JarwisService, TokenService,AuthService , AfterLoginService, BeforeLoginService, DataService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);