import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { FooterComponent } from './common-ui/footer/footer.component';
import { MainLeftNavMenuComponent } from './common-ui/main-left-nav-menu/main-left-nav-menu.component';
import { TopBarMenuComponent } from './common-ui/top-bar-menu/top-bar-menu.component';
import { DashboardComponent } from './common-ui/dashboard/dashboard.component';
import { HomeComponent } from './common-ui/home/home.component';
import { ColorComponent } from './common-ui/vehiclesales/color/color.component';
import { BikemodelComponent } from './common-ui/vehiclesales/bikemodel/bikemodel.component';
import { VendorsComponent } from './common-ui/vehiclesales/vendors/vendors.component';
import { VendoraddComponent } from './common-ui/vehiclesales/vendoradd/vendoradd.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AddvehiclesalesComponent } from './common-ui/vehiclesales/addvehiclesales/addvehiclesales.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { EnquirylistComponent } from './common-ui/enquiry/enquirylist/enquirylist.component';
import { EnquirylistaddComponent } from './common-ui/enquiry/enquirylistadd/enquirylistadd.component';
import { AdvancebookComponent } from './common-ui/advancebook/advancebook.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastsContainer } from './toasts-container.component';
import { RolemasterComponent } from './rolemaster/rolemaster.component';
import { TransitlistComponent } from './transit/transitlist/transitlist.component';
import { TranslistComponent } from './transit/translist/translist.component';
import { ShowroomComponent } from './transit/showroom/showroom.component';
import { VehiclepurchaseComponent } from './common-ui/vehiclesales/vehiclepurchase/vehiclepurchase.component';
import { VariantComponent } from './common-ui/vehiclesales/variant/variant.component';
import { VehiclepurchaselistComponent } from './common-ui/vehiclesales/vehiclepurchaselist/vehiclepurchaselist.component';
import { VehiclestockComponent } from './vehicleManage/vehiclestock/vehiclestock.component';
import { StocktransferComponent } from './vehicleManage/stocktransfer/stocktransfer.component';
import { RegisterComponent } from './users/register/register.component';
import { UserdetailsComponent } from './users/userdetails/userdetails.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainLeftNavMenuComponent,
    TopBarMenuComponent,
    DashboardComponent,
    HomeComponent,
    ColorComponent,
    BikemodelComponent,
    VendorsComponent,
    VendoraddComponent,
    TransitlistComponent,
    AddvehiclesalesComponent,
    EnquirylistComponent,
    EnquirylistaddComponent,
    AdvancebookComponent,
    ToastsContainer,
    RolemasterComponent,
    TranslistComponent,
    ShowroomComponent,
    VehiclepurchaseComponent,
    VariantComponent,
    VehiclepurchaselistComponent,
    VehiclestockComponent,
    StocktransferComponent,
    RegisterComponent,
    UserdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
