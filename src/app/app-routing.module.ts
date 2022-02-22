import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './authguard.guard';
import { AdvancebookComponent } from './common-ui/advancebook/advancebook.component';
import { DashboardComponent } from './common-ui/dashboard/dashboard.component';
import { EnquirylistComponent } from './common-ui/enquiry/enquirylist/enquirylist.component';
import { EnquirylistaddComponent } from './common-ui/enquiry/enquirylistadd/enquirylistadd.component';
import { HomeComponent } from './common-ui/home/home.component';
import { AddvehiclesalesComponent } from './common-ui/vehiclesales/addvehiclesales/addvehiclesales.component';
import { BikemodelComponent } from './common-ui/vehiclesales/bikemodel/bikemodel.component';
import { ColorComponent } from './common-ui/vehiclesales/color/color.component';
import { InvoiceComponent } from './common-ui/vehiclesales/invoice/invoice.component';
import { VariantComponent } from './common-ui/vehiclesales/variant/variant.component';
import { VehiclepurchaseComponent } from './common-ui/vehiclesales/vehiclepurchase/vehiclepurchase.component';
import { VehiclepurchaselistComponent } from './common-ui/vehiclesales/vehiclepurchaselist/vehiclepurchaselist.component';
import { VendoraddComponent } from './common-ui/vehiclesales/vendoradd/vendoradd.component';
import { VendorsComponent } from './common-ui/vehiclesales/vendors/vendors.component';
import { RolemasterComponent } from './rolemaster/rolemaster.component';
import { ShowroomComponent } from './transit/showroom/showroom.component';
import { TransitlistComponent } from './transit/transitlist/transitlist.component';
import { TranslistComponent } from './transit/translist/translist.component';
import { YardComponent } from './transit/yard/yard.component';
import { RegisterComponent } from './users/register/register.component';
import { UserdetailsComponent } from './users/userdetails/userdetails.component';
import { StocktransferComponent } from './vehicleManage/stocktransfer/stocktransfer.component';
import { VehiclestockComponent } from './vehicleManage/vehiclestock/vehiclestock.component';


const routes: Routes = [
{
  path: 'auth',
  loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
},

{path:'dashboard',component:DashboardComponent, canActivate :[AuthguardGuard],
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
{path:'vehiclepurchaseadd',component:VehiclepurchaseComponent},
{path:'variant',component:VariantComponent},
{path:'user',component:UserdetailsComponent},
{path:'register',component:RegisterComponent},
{path:'vehiclestock',component:VehiclestockComponent},
{path:'stocktype',component:StocktransferComponent},
{path:'yard',component:YardComponent},
{path:'invoice',component:InvoiceComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
