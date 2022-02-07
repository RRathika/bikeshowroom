import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { AdvancebookComponent } from './common-ui/advancebook/advancebook.component';
import { DashboardComponent } from './common-ui/dashboard/dashboard.component';
import { EnquirylistComponent } from './common-ui/enquiry/enquirylist/enquirylist.component';
import { EnquirylistaddComponent } from './common-ui/enquiry/enquirylistadd/enquirylistadd.component';
import { HomeComponent } from './common-ui/home/home.component';
import { AddvehiclesalesComponent } from './common-ui/vehiclesales/addvehiclesales/addvehiclesales.component';
import { BikemodelComponent } from './common-ui/vehiclesales/bikemodel/bikemodel.component';
import { ColorComponent } from './common-ui/vehiclesales/color/color.component';
import { VariantComponent } from './common-ui/vehiclesales/variant/variant.component';
import { VehiclepurchaseComponent } from './common-ui/vehiclesales/vehiclepurchase/vehiclepurchase.component';
import { VehiclepurchaselistComponent } from './common-ui/vehiclesales/vehiclepurchaselist/vehiclepurchaselist.component';
import { VendoraddComponent } from './common-ui/vehiclesales/vendoradd/vendoradd.component';
import { VendorsComponent } from './common-ui/vehiclesales/vendors/vendors.component';
import { RolemasterComponent } from './rolemaster/rolemaster.component';
import { ShowroomComponent } from './transit/showroom/showroom.component';
import { TransitlistComponent } from './transit/transitlist/transitlist.component';
import { TranslistComponent } from './transit/translist/translist.component';
import { StocktransferComponent } from './vehicleManage/stocktransfer/stocktransfer.component';
import { VehiclestockComponent } from './vehicleManage/vehiclestock/vehiclestock.component';


const routes: Routes = [
  // {path: '', redirectTo:'',pathMatch:'full'},
  {
  path: 'auth',
  loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
},

{path:'dashboard',component:DashboardComponent,
children:[
{path:'',component:HomeComponent},
{path:'color', component:ColorComponent},
{path:'bikemodel',component:BikemodelComponent},
{path:'vendor',component:VendorsComponent},
{path:'vendoradd',component:VendoraddComponent},
{path:'transitadd',component:TransitlistComponent},
{path:'transitlist',component:TranslistComponent},
{path:'addvehiclesale',component:AddvehiclesalesComponent},
{path:'enquirylist',component:EnquirylistComponent},
{path:'enquiryadd',component:EnquirylistaddComponent},
{path:'advancebook',component:AdvancebookComponent},
{path:'rolemaster',component:RolemasterComponent},
{path:'showroom',component:ShowroomComponent},
{path:'vehiclepurchase',component:VehiclepurchaselistComponent},
{path:'variant',component:VariantComponent},
{path:'register',component:RegisterComponent},
{path:'vehiclestock',component:VehiclestockComponent},
{path:'stocktype',component:StocktransferComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
