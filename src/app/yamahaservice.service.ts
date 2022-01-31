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
  // public advanceid=new BehaviorSubject<any>('');
  getbikemodel():Observable<any>{
    return this.httpclient.get(this.url+'BikeModel/GetBikeModels');
  }
  savebikemodel(data:any):Observable<any>{
    return this.httpclient.post(this.url+'BikeModel/SaveBikeModel',data);
  }
  updatebikemodel(data:any):Observable<any>{
    return this.httpclient.put(this.url+'BikeModel/UpdateBikeModel',data);
  }
  deletebikemodel(id:any):Observable<any>{
    return this.httpclient.delete(this.url+`BikeModel/DeleteBikeModel?ModelId=${id}`);
  }
  getcolor():Observable<any>{
    return this.httpclient.get(this.url+'BikeColor/GetBikeColors');
  }
  savecolor(data:any):Observable<any>{    
    return this.httpclient.post(this.url+'BikeColor/SaveBikeColor',data);
  }
  updatecolor(data:any):Observable<any>{
    return this.httpclient.put(this.url+'BikeColor/UpdateBikeColor',data);
  }
  deletecolor(id:any):Observable<any>{
    return this.httpclient.delete(this.url+`BikeColor/DeleteBikeColor?ColorId=${id}`);
  }
  getvendor():Observable<any>{
    return this.httpclient.get(this.url+'BikeVendorDetails/GetBikeVendorDetails');
  }
  savevendor(data:any):Observable<any>{    
    return this.httpclient.post(this.url+'BikeVendorDetails/SaveBikeVendorDetails',data);
  }
  updatevendor(data:any):Observable<any>{
    return this.httpclient.put(this.url+'BikeVendorDetails/UpdateBikeVendorDetails',data);
  }
  deletevendor(id:any):Observable<any>{
    return this.httpclient.delete(this.url+`BikeVendorDetails/DeleteBikeVendorDetails?VendorId=${id}`);
  }
  getbyidmodel(id:any):Observable<any>{
    return this.httpclient.get(this.url+`BikeModel/GetBikeModelById?ModelId=${id}`);
  }
  getbyidcolor(id:any):Observable<any>{
    return this.httpclient.get(this.url+`BikeColor/GetBikeColorById?ColorId=${id}`);
  }
  getbyidvendor(id:any):Observable<any>{
    return this.httpclient.get(this.url+`BikeVendorDetails/GetBikeVendorDetailsById?VendorId=${id}`);
  }
  getenquiry(){
    return this.httpclient.get(this.url+'EnquiryForm/GetEnquiryList');
  }
  saveenquiry(data:any){    
    return this.httpclient.post(this.url+'EnquiryForm/SaveEnquiryForm',data)
  }
  saveenquirydetails(data:any){
    return this.httpclient.post(this.url+'EnquiryForm/SaveEnquiryDetails',data);
  }
  updateenquirydetails(data:any){
    return this.httpclient.put(this.url+'EnquiryForm/UpdateEnquiryDetails',data)
  }
  getpaymentmode(){
    return this.httpclient.get(this.url+'PaymentMode/GetPaymentMode');
  }
  saveadvancebokk(data:any){
    return this.httpclient.post(this.url+'AdvanceBooking/SaveAdvanceBooking',data);
  }
  getenquirydetailbyidall(id:any){
    return this.httpclient.get(this.url+`EnquiryForm/GetAllEnquiryDetailsById?EnquiryId=${id}`);
  }
  getenquirydetailbyid(id:any){
    return this.httpclient.get(this.url+`EnquiryForm/GetEnquiryDetailsById?EnquiryDetailsId=${id}`);
  }
  savecustomerDetails(data:any){
    return this.httpclient.post(this.url+`VehicleCustomerDetails/SaveVehicleCustomerDetails`,data)
  }
  getrolemaster(){
    return this.httpclient.get(this.url+'RoleMaster/GetRoleName');
  }
  saverolemaster(data:any){
    return this.httpclient.post(this.url+'RoleMaster/SaveRoleName',data);
  }
  rolegetbyId(id:any){
    return this.httpclient.get(this.url+`RoleMaster/GetRoleNameById?RoleId=${id}`);
  }
  updaterolemaster(data:any){
    return this.httpclient.put(this.url+'RoleMaster/UpdateRoleName',data);
  }
  deleterolemaster(id:any){
    return this.httpclient.delete(this.url+`RoleMaster/DeleteRoleName?RoleId=${id}`);
  }
  savetransit(data:any){
    return this.httpclient.post(this.url+'Transit/SaveTransit',data);
  }
  gettransit(){
    return this.httpclient.get(this.url+'Transit/GetTransit');
  }
  getbyidtransit(id:any){
    return this.httpclient.get(this.url+`Transit/GetTransitDetailsById?TransitId=${id}`);
  }
  saveshowroom(data:any){
    return this.httpclient.post(this.url+'ShowRoom/SaveShowRoom',data);
  }
  getshowroom(){
    return this.httpclient.get(this.url+'ShowRoom/GetShowRoom');
  }
  updateenquiryclose(data:any)
  { 
    return this.httpclient.put(this.url+'EnquiryForm/UpdateEnquiries',data);
  }
  getadvancebook(){
    return this.httpclient.get(this.url+'AdvanceBooking/GetAdvanceBookings')
  }
  getvariant(){
    return this.httpclient.get(this.url+'BikeVariant/GetBikeVariants')
  }
  savevariant(data:any){
    return this.httpclient.post(this.url+'BikeVariant/SaveBikeVariant',data);
  }
  updatevariant(data:any){
    return this.httpclient.put(this.url+'BikeVariant/UpdateBikeVariant',data);
  }
  getbyidvariant(id:any){
    return this.httpclient.get(this.url+`BikeVariant/GetBikeVariantById?VariantId=${id}`);
  }
  deletevariant(id:any){
    return this.httpclient.delete(this.url+`BikeVariant/DeleteBikeVariant?VariantId=${id}`);
  }
  getadvancename(){
    return this.httpclient.get(this.url+'AdvanceBooking/GetAdvanceBookingsByName');
  }
  getmodelname(){
    return this.httpclient.get(this.url+'AdvanceBooking/GetAdvanceBookingsByModelName');
  }
  getusercode(){
    return this.httpclient.get(this.url+'UserRegistration/GetUserCode',{responseType:'text'});
  }
  getmacaddress(){
    return this.httpclient.get(this.url+ 'UserRegistration/GetMacAddress',{responseType:'text'});
  }
  saveregister(data:any){
    return this.httpclient.post(this.url+'UserRegistration/SaveUserRegistration',data);
  } 
}
