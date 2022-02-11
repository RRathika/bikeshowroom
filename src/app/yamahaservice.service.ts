import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class YamahaserviceService {
  url=environment.apiurl;
  constructor(private httpclient: HttpClient) { }
  public bikemodel = new BehaviorSubject<any>('');
  public color = new BehaviorSubject<any>('');
  public vendor = new BehaviorSubject<any>('');
  public enquirydetails = new BehaviorSubject<any>('');
  public rolemaster = new BehaviorSubject<any>('');
  public variant = new BehaviorSubject<any>('');
  public purchasedata=new BehaviorSubject<any>('');
  public user=new BehaviorSubject<any>('');
  getbikemodel():Observable<any>{return this.httpclient.get(this.url+'BikeModel/GetBikeModels');}
  savebikemodel(data:any):Observable<any>{return this.httpclient.post(this.url+'BikeModel/SaveBikeModel',data);}
  updatebikemodel(data:any):Observable<any>{return this.httpclient.put(this.url+'BikeModel/UpdateBikeModel',data);}
  deletebikemodel(id:any):Observable<any>{return this.httpclient.delete(this.url+`BikeModel/DeleteBikeModel?ModelId=${id}`);}
  getcolor():Observable<any>{return this.httpclient.get(this.url+'BikeColor/GetBikeColors');}
  savecolor(data:any):Observable<any>{ return this.httpclient.post(this.url+'BikeColor/SaveBikeColor',data);}
  updatecolor(data:any):Observable<any>{return this.httpclient.put(this.url+'BikeColor/UpdateBikeColor',data);}
  deletecolor(id:any):Observable<any>{ return this.httpclient.delete(this.url+`BikeColor/DeleteBikeColor?ColorId=${id}`);}
  getvendor():Observable<any>{ return this.httpclient.get(this.url+'BikeVendorDetails/GetBikeVendorDetails');}
  savevendor(data:any):Observable<any>{return this.httpclient.post(this.url+'BikeVendorDetails/SaveBikeVendorDetails',data);}
  updatevendor(data:any):Observable<any>{return this.httpclient.put(this.url+'BikeVendorDetails/UpdateBikeVendorDetails',data);}
  deletevendor(id:any):Observable<any>{return this.httpclient.delete(this.url+`BikeVendorDetails/DeleteBikeVendorDetails?VendorId=${id}`);}
  getbyidmodel(id:any):Observable<any>{return this.httpclient.get(this.url+`BikeModel/GetBikeModelById?ModelId=${id}`);}
  getbyidcolor(id:any):Observable<any>{return this.httpclient.get(this.url+`BikeColor/GetBikeColorById?ColorId=${id}`);}
  getbyidvendor(id:any):Observable<any>{return this.httpclient.get(this.url+`BikeVendorDetails/GetBikeVendorDetailsById?VendorId=${id}`);}
  getenquiry():Observable<any>{return this.httpclient.get(this.url+'EnquiryForm/GetEnquiryList');}
  saveenquiry(data:any):Observable<any>{return this.httpclient.post(this.url+'EnquiryForm/SaveEnquiryForm',data)}
  saveenquirydetails(data:any):Observable<any>{return this.httpclient.post(this.url+'EnquiryForm/SaveEnquiryDetails',data);}
  updateenquirydetails(data:any):Observable<any>{return this.httpclient.put(this.url+'EnquiryForm/UpdateEnquiryDetails',data)}
  getpaymentmode():Observable<any>{return this.httpclient.get(this.url+'PaymentMode/GetPaymentMode');}
  saveadvancebokk(data:any):Observable<any>{return this.httpclient.post(this.url+'AdvanceBooking/SaveAdvanceBooking',data);}
  getenquirydetailbyidall(id:any){return this.httpclient.get(this.url+`EnquiryForm/GetAllEnquiryDetailsById?EnquiryId=${id}`);}
  getenquirydetailbyid(id:any):Observable<any>{return this.httpclient.get(this.url+`EnquiryForm/GetEnquiryDetailsById?EnquiryDetailsId=${id}`);}
  savecustomerDetails(data:any):Observable<any>{return this.httpclient.post(this.url+`VehicleCustomerDetails/SaveVehicleCustomerDetails`,data)}
  getrolemaster():Observable<any>{return this.httpclient.get(this.url+'RoleMaster/GetRoleName');}
  saverolemaster(data:any):Observable<any>{return this.httpclient.post(this.url+'RoleMaster/SaveRoleName',data);}
  rolegetbyId(id:any):Observable<any>{return this.httpclient.get(this.url+`RoleMaster/GetRoleNameById?RoleId=${id}`);}
  updaterolemaster(data:any):Observable<any>{return this.httpclient.put(this.url+'RoleMaster/UpdateRoleName',data);}
  deleterolemaster(id:any):Observable<any>{return this.httpclient.delete(this.url+`RoleMaster/DeleteRoleName?RoleId=${id}`);}
  savetransit(data:any):Observable<any>{return this.httpclient.post(this.url+'Transit/SaveTransit',data);}
  gettransit():Observable<any>{return this.httpclient.get(this.url+'Transit/GetTransit'); }
  getbyidtransit(id:any):Observable<any>{return this.httpclient.get(this.url+`Transit/GetTransitDetailsById?TransitId=${id}`);}
  saveshowroom(data:any):Observable<any>{return this.httpclient.post(this.url+'ShowRoom/SaveShowRoom',data);}
  getshowroom():Observable<any>{return this.httpclient.get(this.url+'ShowRoom/GetShowRoom');}
  updateenquiryclose(data:any):Observable<any>{return this.httpclient.put(this.url+'EnquiryForm/UpdateEnquiries',data);}
  getadvancebook():Observable<any>{return this.httpclient.get(this.url+'AdvanceBooking/GetAdvanceBookings');}
  getvariant():Observable<any>{return this.httpclient.get(this.url+'BikeVariant/GetBikeVariants');}
  savevariant(data:any):Observable<any>{return this.httpclient.post(this.url+'BikeVariant/SaveBikeVariant',data);}
  updatevariant(data:any):Observable<any>{return this.httpclient.put(this.url+'BikeVariant/UpdateBikeVariant',data);}
  getbyidvariant(id:any):Observable<any>{return this.httpclient.get(this.url+`BikeVariant/GetBikeVariantById?VariantId=${id}`);  }
  deletevariant(id:any):Observable<any>{return this.httpclient.delete(this.url+`BikeVariant/DeleteBikeVariant?VariantId=${id}`); }
  getadvancename():Observable<any>{return this.httpclient.get(this.url+'AdvanceBooking/GetAdvanceBookingsByName'); }
  getmodelname():Observable<any>{return this.httpclient.get(this.url+'AdvanceBooking/GetAdvanceBookingsByModelName');  }
  getusercode():Observable<any>{return this.httpclient.get(this.url+'UserRegistration/GetUserCode',{responseType:'text'});}
  getmacaddress():Observable<any>{return this.httpclient.get(this.url+ 'UserRegistration/GetMacAddress',{responseType:'text'});}
  saveregister(data:any):Observable<any>{return this.httpclient.post(this.url+'UserRegistration/SaveUserRegistration',data);}
  getbikemodelname(name:any):Observable<any>{return this.httpclient.get(this.url+`BikeModel/GetBikeModelNameByModelCode?ModelCode=${name}`,{responseType:'text'});}
  getcolorname(name:any):Observable<any>{ return this.httpclient.get(this.url+ `BikeColor/GetBikeColorNameByColorCode?ModelCode=${name}`,{responseType:'text'});}
  movetopurchase(id:any):Observable<any>{return this.httpclient.get(this.url+`Transit/GetTransitandTransitDetailsByTransitId?TransitId=${id}`);}
  savepurchase(data:any):Observable<any>{return this.httpclient.post(this.url+`VehiclePurchase/SaveVehiclePurchase`,data);}
  getvehiclepurchase():Observable<any>{return this.httpclient.get(this.url+`VehiclePurchase/GetVehiclePurchase`);} 
  getvehiclepurchasebyid(id:any):Observable<any>{return this.httpclient.get(this.url+`VehiclePurchase/GetVehiclePurchaseDetailsByVehiclePurchaseId?VehiclePurchaseId=${id}`);}
  listvehiclestock(showroom:any,modelname:any):Observable<any>{ return this.httpclient.get(this.url+`VehicleStock/GetVehicleStock?ShowRoomId=${showroom}&VehicleModelId=${modelname}`);}
  savestocktransfer(data:any):Observable<any>{return this.httpclient.post(this.url+'StockTransfer/SaveStockTransfer',data);}
  getuserdetails():Observable<any>{return this.httpclient.get(this.url+`UserRegistration/GetUserDetails`);}
  getuserbyid(id:any):Observable<any>{return this.httpclient.get(this.url+`UserRegistration/GetUserDetailsById?UserCode=${id}`);}
  deleteuserdata(id:any):Observable<any>{return this.httpclient.delete(this.url+`UserRegistration/DeleteUserDetails?UserCode=${id}`);}
  updateuserdetail(data:any):Observable<any>{return this.httpclient.put(this.url+'UserRegistration/UpdateUserDetails',data);}
  getchassisno():Observable<any>{return this.httpclient.get(this.url+'VehicleStock/GetChassisNo');}
  getengineno():Observable<any>{return this.httpclient.get(this.url+'VehicleStock/GetEngineNo');}
  selectchassisno(name:any):Observable<any>{return this.httpclient.get(this.url+ `VehicleStock/GetVehicleStockByChassisNo?ChassisNo=${name}`);}
  selectengineno(id:any):Observable<any>{return this.httpclient.get(this.url+`VehicleStock/GetVehicleStockByEngineNo?EngineNo=${id}`);}
  selectmodel(id:any):Observable<any>{return this.httpclient.get(this.url+`BikeColor/GetBikeColorDetailsByModelId?ModelId=${id}`);}
  selectcolor(id:any):Observable<any>{return this.httpclient.get(this.url+`BikeVariant/GetBikeVariantDetailsByColorId?ColorId=${id}`);}
  savelogin(data:any):Observable<any>{return this.httpclient.post(this.url+`Login/CheckLoginDetails`,data);}
  getdistrict():Observable<any>{return this.httpclient.get(this.url+'Master/GetDistrict');}
  gettaluk(id:any):Observable<any>{return this.httpclient.get(this.url+`Master/GetTalukByDistrictId?DistrictId=${id}`);}
  getqualification():Observable<any>{return this.httpclient.get(this.url+'Master/GetQualification');}
  getoccupation():Observable<any>{return this.httpclient.get(this.url+'Master/GetOccupation');}
  getyear():Observable<any>{return this.httpclient.get(this.url+'Master/GetYear');}
}
