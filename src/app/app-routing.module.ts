import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './authguard.guard';
import { AdvancebookComponent } from './common-ui/advancebook/advancebook.component';
import { DashboardComponent } from './common-ui/dashboard/dashboard.component';
import { EnquirylistComponent } from './common-ui/enquiry/enquirylist/enquirylist.component';
import { EnquirylistaddComponent } from './common-ui/enquiry/enquirylistadd/enquirylistadd.component';
import { FinanceComponent } from './common-ui/Finance/finance.component';
import { HomeComponent } from './common-ui/home/home.component';
import { AddvehiclesalesComponent } from './common-ui/vehiclesales/addvehiclesales/addvehiclesales.component';
import { BikemodelComponent } from './common-ui/vehiclesales/bikemodel/bikemodel.component';
import { ColorComponent } from './common-ui/vehiclesales/color/color.component';
import { InvoiceComponent } from './common-ui/vehiclesales/invoice/invoice.component';
import { VariantComponent } from './common-ui/vehiclesales/variant/variant.component';
import { VehiclepurchaseComponent } from './common-ui/vehiclesales/vehiclepurchase/vehiclepurchase.component';
import { VehiclepurchaselistComponent } from './common-ui/vehiclesales/vehiclepurchaselist/vehiclepurchaselist.component';
import { VehiclesaleslistComponent } from './common-ui/vehiclesales/vehiclesaleslist/vehiclesaleslist.component';
import { ShowroomComponent } from './transit/showroom/showroom.component';
import { TransitlistComponent } from './transit/transitlist/transitlist.component';
import { TranslistComponent } from './transit/translist/translist.component';
import { YardComponent } from './transit/yard/yard.component';
import { RegisterComponent } from './users/register/register.component';
import { UserdetailsComponent } from './users/userdetails/userdetails.component';
import { ShowroomtoyardComponent } from './vehicleManage/showroomtoyard/showroomtoyard.component';
import { StocktransferComponent } from './vehicleManage/stocktransfer/stocktransfer.component';
import { VehiclestockComponent } from './vehicleManage/vehiclestock/vehiclestock.component';
import { YardtoyardComponent } from './vehicleManage/yardtoyard/yardtoyard.component';
import { VendorComponent } from './common-ui/vehiclesales/vendor/vendor.component';
import { ListshowroomtransferComponent } from './vehicleManage/listshowroomtransfer/listshowroomtransfer.component';
import { ListyardtransferComponent } from './vehicleManage/listyardtransfer/listyardtransfer.component';

const routes: Routes = [
{
  path: 'auth',
  loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
},
{path:'invoice',component:InvoiceComponent},
{path:'dashboard',component:DashboardComponent, canActivate :[AuthguardGuard],
children:[
{path:'',component:HomeComponent},
{path:'color', component:ColorComponent},
{path:'bikemodel',component:BikemodelComponent},
{path:'transitadd',component:TransitlistComponent},
{path:'transitlist',component:TranslistComponent},
{path:'addvehiclesale',component:AddvehiclesalesComponent},
{path:'vehiclesalelist',component:VehiclesaleslistComponent},
{path:'enquirylist',component:EnquirylistComponent},
{path:'enquiryadd',component:EnquirylistaddComponent},
{path:'advancebook',component:AdvancebookComponent},
{path:'showroom',component:ShowroomComponent},
{path:'vehiclepurchase',component:VehiclepurchaselistComponent},
{path:'vehiclepurchaseadd',component:VehiclepurchaseComponent},
{path:'variant',component:VariantComponent},
{path:'user',component:UserdetailsComponent},
{path:'register',component:RegisterComponent},
{path:'vehiclestock',component:VehiclestockComponent},
{path:'stocktype',component:StocktransferComponent},
{path:'yard',component:YardComponent},
{path:'finance',component:FinanceComponent},
{path:'showroomtoyard',component:ShowroomtoyardComponent},
{path:'yardtoyard',component:YardtoyardComponent},
{path:'vendor',component:VendorComponent},
{path:'listshowroomtransfer',component:ListshowroomtransferComponent},
{path:'listyardtransfer',component:ListyardtransferComponent}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
