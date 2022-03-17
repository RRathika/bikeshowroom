import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
@Component({
  selector: 'app-addvehiclesales',
  templateUrl: './addvehiclesales.component.html',
  styleUrls: ['./addvehiclesales.component.css'],
  providers: [DatePipe]
})
export class AddvehiclesalesComponent implements OnInit {
  // permanentaddressForm:any;
  isShownHome: boolean = true ;
  isShownProfile: boolean = false;
  isShownContact: boolean = false;
  iscredit: boolean = false;
  isFinance: boolean = false;
  isCashinhand: boolean = false;
  iscard: boolean = false;
  ischeque: boolean = false;
  isUPI: boolean = false;
  isDD: boolean = false;
  isShownCash: boolean = false;
  isdisable = false;
  isdisableClearBtn = false;
  myDate: any;
  bookdata: any;
  username: any;
  modelname: any;
  districtname: any;
  taluk1: any;
  qualification: any;
  occupation: any;
  year: any;
  show: any;
  role: any;
  showroomname: any;
  yardname: any;
  varientcode: any;
  colorcode: any;
  modelcode: any;
  selectedObject: any;
  totaldata: any;
  finalamount: any;
  patchdata: any;
  colordetails: any;
  finance:any;
  invoicevalue:any;
  now: any = Date.now();
  format: string = "medium";
  disableTextbox:boolean=false;
  advanceamount=0;
  cash:number=0;
  card:number=0;
  cheque:number=0;
  dd:number=0;upi:number=0;
  showdata:any;
  selectedAdvanceModelName:any ='';
  selectedAdvanceName:any ='';
  selectedAdvanceDate:any ='';
  selectedGender = 0;
  submitted: boolean = false;
  selectedPresentDistrict = 0;
  selectedPresentTaluk:any;

  constructor(private service: YamahaserviceService, private route: Router, private formBuilder: FormBuilder, public datePipe: DatePipe, public toastService: ToastServiceService) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
 
  presentaddressForm: FormGroup = this.formBuilder.group({
    doorNo: new FormControl('', [Validators.required]),
    areaName: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    taluk: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [Validators.required])
  });
  permanentaddressForm: FormGroup = this.formBuilder.group({
    doorNo: new FormControl('', [Validators.required]),
    areaName: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    taluk: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [Validators.required])
  });
  customerDetailForm: FormGroup = this.formBuilder.group({
    invoiceNo: new FormControl('', []),
    invoiceDate: new FormControl('', []),
    receiptType: new FormControl(0, []),
    receiptNos: new FormControl('', []),
    date: new FormControl('', []),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', []),
    gender: new FormControl('', []),
    dob: new FormControl('', []),
    fatherName: new FormControl('', []),
    gstNo: new FormControl('', []),
    presentAddress: new FormControl(),
    permanentAddress: new FormControl(),
    phoneOff: new FormControl('', []),
    residence: new FormControl('', []),
    mobileNo: new FormControl('', []),
    eMail: new FormControl('', []),
    addressProof: new FormControl('', []),
    aadharNo: new FormControl('', []),
    qualification: new FormControl('', []),
    occupation: new FormControl('', []),
    maritalStatus: new FormControl('', []),
    nomineeName: new FormControl('', []),
    nomineeAge: new FormControl('', []),
    nomineeGender: new FormControl('', []),
    relation: new FormControl('', [])
  })
  vehicleDetailsForm: FormGroup = this.formBuilder.group({
    showRoomId: new FormControl('', []),
    yardId: new FormControl('', []),
    modelId: new FormControl('', []),
    chassisNo: new FormControl('', []),
    engineNo: new FormControl('', []),
    colorId: new FormControl('', []),
    keyNo: new FormControl('', []),
    month: new FormControl('', []),
    year: new FormControl('', []),
    vehicleSaleType: new FormControl('', []),
    invoiceAmount: new FormControl('', []),
    vehicleCost: new FormControl('', []),
    discountAmount: 0,
    tax: new FormControl('', []),
    rounded: new FormControl('', []),
    registerAt: new FormControl('', []),
    finaltotal: new FormControl('', []),
    total: new FormControl('', []),
    igst: new FormControl('', []),
    cgst: new FormControl('', []),
    sgst: new FormControl('', []),
    lifetax: new FormControl('', []),
    insurance: new FormControl('', []),
    taxtotal: new FormControl('', [])
  })
  payDetails: FormGroup = this.formBuilder.group({   
      transactionTypeId: 0,
      vehicleCost: 0,
      otherAmount: 0,
      totalAmount: 0,
      bookrecamt:0,
      financeamt:0,
      creditamt:0,
      cashbank:0,
      excessamt:0,
      balanceamt: 0,
      createVehicleSalePaymentDetailDTO: new FormControl(),
      createVehicleSaleCreditDetailDTO:new FormControl(),
      createVehicleSaleFinanceDetailDTO: new FormControl()
    })
   
    transtypecash:FormGroup=this.formBuilder.group({
        handAmount: 0,
        currentDate: new FormControl('', []),
        cardAmount: 0,
        cardDetails: new FormControl('', []),
        chequeAmount: 0,
        chequeDetails: new FormControl('', []),
        chequeDate: new FormControl('', []),
        chequeNo: new FormControl('', []),
        ddAmount: 0,
        ddDetails: new FormControl('', []),
        ddDate: new FormControl('', []),
        ddNo: new FormControl('', []),
        upiAmount: 0,
        upiNo: new FormControl('', []),
        status: 0
    })
    creditForm:FormGroup=this.formBuilder.group({
      creditAmount: 0,
      name: new FormControl('', []),
      mobileNo: new FormControl('', []),
      address: new FormControl('', []),
      status: 0
    })
    financeForm:FormGroup=this.formBuilder.group({
      financeId: 0,
      downPayment: 0,
      status: 0
    })
    finalform:FormGroup=this.formBuilder.group({
      createVehicleCustomerDetailsDTO:new FormControl(),
      createVehicleSalesDetailDTO:new FormControl(),
      createVehicleSaleTransactionDetailDTO:new FormControl()
    })
  ngOnInit(): void {
    this.disable();   
    // this.loadadvancebook();
    // this.loadname();
    // this.loadmodelname();
    this.district();
    this.loadqualification();
    this.loadoccupation(); 
    this.showroomdata();
    this.show = localStorage.getItem('ShowRoomId');
    this.role = localStorage.getItem('RoleId');
    if(this.show > 0)
    {   
    this.loadinvoice(); 
    }   
    this.customerDetailForm.controls['receiptNos'].disable();
    this.customerDetailForm.controls['date'].disable();
   // this.isdisableClearBtn=true;
  }
  disable(){
    this.customerDetailForm.controls['receiptNos'].disable();
    this.customerDetailForm.controls['date'].disable();
    this.customerDetailForm.controls['invoiceNo'].disable();
    this.permanentaddressForm.controls['taluk'].disable();
    this.isdisable=true;
    let role = localStorage.getItem('RoleId');

    this.isdisableClearBtn=true;
    
    if(role != '1')
    {
      this.myDate=this.datePipe.transform(this.now, 'yyyy-MM-dd');
      this.customerDetailForm.controls['invoiceDate'].disable();
      this.customerDetailForm.patchValue({
        invoiceDate:this.myDate
      })
    }
  }
  changesale(e:any){
    console.log(this.showdata);
    
    console.log(e.target.value);
    if(e.target.value == 'Within State Sales'){
      this.showdata='CGST + SGST';
      console.log(this.showdata);
    }
    if(e.target.value == 'outside State Sales')
    {
      this.showdata='IGST';
      console.log(this.showdata);
    }
  }
  showroomdata(){
    this.service.getshowroom().subscribe(data=>{
      this.showdata=data;
    })
  }
  selectshowroom(e:any)
  {
    let data=e.target.value;
    console.log(data);
    this.service.getinvoice(data).subscribe((data:any)=>{
      this.invoicevalue=data;
      console.log(this.invoicevalue);
      this.customerDetailForm.patchValue({
        invoiceNo:this.invoicevalue
      })
    })
  }

  loadinvoice(){   
   let da=localStorage.getItem('ShowRoomId');
   console.log(da);   
    this.service.getinvoice(da).subscribe((data:any)=>{
      this.invoicevalue=data;
      console.log(this.invoicevalue);
      this.customerDetailForm.patchValue({
        invoiceNo:this.invoicevalue
      })
    })
  }
  loadfinance(){
    this.service.getfinance().subscribe(data=>{
      this.finance=data;      
    })
  }
  color() {
    this.service.getcolor().subscribe(data => {
      this.colordetails = data;
    })
  }
  model() {
    this.service.getbikemodel().subscribe(data => {
      this.modelcode = data;
    })
  }
  showroom() {
    this.service.getshowroom().subscribe(data => {
      this.showroomname = data;
    })
  }
  yard() {
    this.service.getyard().subscribe(data => {
      this.yardname = data;
    })
  }
  selectyard(e: any) {
    let name = e.target.value;
    this.service.showroombyyard(name).subscribe(data => {
      this.yardname = data;
    })
  }
  checkboxvalues: any = [
    {
      value: "CashInhand",
      check: 1
    },
    {
      value: "Card",
      check: 2
    },
    {
      value: "Cheque",
      check: 3
    },
    {
      value: "UPI",
      check: 4
    },
    {
      value: "DD",
      check: 5
    }
  ];
  loadqualification() {
    this.service.getqualification().subscribe(data => {
      this.qualification = data;
    })
  }
  modelnamechange(e: any) {
    
    let model = e.target.value;
    this.vehicleDetailsForm.patchValue({
      modelId: model
    })
    this.service.selectmodel(model).subscribe(data => {
      if (data.statusCode == 200) {
        this.colorcode = [];
        this.varientcode = [];
        this.toastService.show('Dont have related color', { classname: 'bg-danger text-light', delay: 3000 });
      }
      else {
        this.colorcode = data;
      }
    })
  }
  colornamechange(e: any) {
    let model = e.target.value;
    this.vehicleDetailsForm.patchValue({
      colorId: model
    })
    this.service.selectcolor(model).subscribe(data => {
      if (data.statusCode == 200) {
        this.varientcode = [];
        this.toastService.show('Dont have related variant', { classname: 'bg-danger text-light', delay: 3000 });
      }
      else {
        this.varientcode = data;
      }
    })
  }
  variantnamechange(e: any) {
    debugger
    let variant = e.target.value;
    let show = localStorage.getItem('ShowRoomId');
    let role = localStorage.getItem('RoleId');
    this.service.vartantbydata(variant, show, role).subscribe(data => {
      this.totaldata = data;
      for (let i = 0; i <= this.totaldata.length; i++) {
        this.finalamount = Math.round(this.totaldata[i].total);
        this.totaldata[i].netamount = this.finalamount;
        console.log(this.totaldata);
      }

    })
  }
  gstcalculation(e: any) {
    
    let data = e.target.value;
    let invoice = (data / 100) * (this.vehicleDetailsForm.value['vehicleCost']);
    let invoiceamount = this.vehicleDetailsForm.value['vehicleCost'] + invoice;
    let final = invoiceamount + this.vehicleDetailsForm.value['taxtotal']
    this.vehicleDetailsForm.patchValue({
      tax: invoice,
      invoiceAmount: invoiceamount,
      total: final,
      finaltotal: final
    })

  }
  applyvehicle(chass: any, cg: any, sg: any, ig: any, engine: any, ins: any, invoice: any, key: any, life: any, net: any, total: any) {
    let totalfortable = life + ins;
    //  this.patchdata=this.totaldata; 
    //  console.log(this.patchdata);
    this.vehicleDetailsForm.patchValue({
      chassisNo: chass,
      engineNo: engine,
      keyNo: key,
      vehicleCost: invoice,
      taxtotal: totalfortable,
      rounded: net,
      cgst: cg,
      sgst: sg,
      igst: ig,
      insurance: ins,
      lifetax: life
    })

  }
  loadoccupation() {
    this.service.getoccupation().subscribe(data => {
      this.occupation = data;
    })
  }
  getyear() {
    this.service.getyear().subscribe(data => {
      this.year = data;
    })
  }
  district() {
    this.service.getdistrict().subscribe(data => {
      this.districtname = data;
    })
  }
  districttaluk(e: any) {
    let name = e.target.value;
    this.service.gettaluk(name).subscribe((data: any) => {
      console.log(data)
      if(data.message == 'No Data Found'){
        this.taluk1 = '';
      }
      else{
        this.taluk1 = data;
        this.selectedPresentTaluk=0;
      }
  
    })
  }
  loadadvancebook() {
    let bookid = localStorage.getItem('ShowRoomId')
    this.service.getadvancebook(bookid).subscribe(data => {
      this.bookdata = data;
    })
  }
  loadname() {
    this.service.getadvancename().subscribe(data => {
      this.username = data;
      console.log( this.username);
      
    })
  }
  loadmodelname() {
    this.service.getmodelname().subscribe(data => {
      this.modelname = data;
    })
  }
  apply(id: any, date1: any,advance:any) {
    this.isdisableClearBtn=false;
    let date2 = date1.split('T');
    this.advanceamount=advance;
    console.log(date2[0]);
    this.customerDetailForm.patchValue({ receiptNos: id, date: date2[0] });
  }
  shift() {
    this.permanentaddressForm.patchValue(this.presentaddressForm.value);
  }
  onChange(e: any) {

    if (e.value == 2) {
        // this.customerDetailForm.controls['receiptNos'].enable();
        // this.customerDetailForm.controls['date'].enable();

      this.isdisable = false;
    }
    else {
     this.clearBtn();
     this.isdisableClearBtn=true;
      this.isdisable = true;
    }
  }
  onKeyUp(x: any) { // appending the updated value to the variable
    let data = x.target.value;
    let final = data.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter((s: string | any[]) => s.length > 0).join("-");
    //  console.log(final);
    this.customerDetailForm.patchValue({ aadharNo: final });
  }
  submit() {
    this.customerDetailForm.patchValue({ presentAddress: this.presentaddressForm.value, permanentAddress: this.permanentaddressForm.value })
    // console.log(this.customerDetailForm.value);
    
    this.isShownProfile = ! this.isShownProfile;
    this.isShownHome = false;
    this.isShownContact = false;
    this.showroom();
    this.yard();
    this.model();
    this.color();
    this.loadfinance();
    this.getyear();
  }
  vehicleform() {
    // console.log(this.vehicleDetailsForm.value);
    this.isShownHome =false;
    this.isShownProfile = false;
    this.isShownContact =  ! this.isShownHome;
  }
  toggleShowProfile(){
    this.isShownProfile = ! this.isShownProfile;
    this.isShownHome = false;
    this.isShownContact = false;
  }
  toggleShowHome(){
    this.isShownHome = ! this.isShownHome;
    this.isShownProfile = false;
    this.isShownContact = false;
  }
  loadfield(){
    let vehiclecost1=this.vehicleDetailsForm.value['vehicleCost'];
    let otheramount1=this.vehicleDetailsForm.value['taxtotal'];
    let net=this.vehicleDetailsForm.value['total'];
    let bookamount=this.advanceamount;
    this.payDetails.patchValue({
      vehicleCost:vehiclecost1,
      otherAmount:otheramount1,
      totalAmount:net,
      bookrecamt:bookamount
    })
  }
  toggleShowCash(value: any) {
    console.log(value.target.value);
    this.loadfield();
    switch (value.target.value) {
      case '1':
        this.isShownCash = !this.isShownCash;
        this.isFinance = false;
        this.iscredit = false;
        break;

      case "2":
        this.iscredit = !this.iscredit;
        this.isShownCash = false;
        this.isCashinhand = false;
        this.iscard = false;
        this.ischeque = false;
        this.isUPI = false;
        this.isDD = false;
        this.isFinance = false;
        break;
      default:
        console.log("No such day exists!");
        break;
      case "3":
        this.isFinance = !this.isFinance;
        this.isShownCash = false;
        this.isCashinhand = false;
        this.iscard = false;
        this.ischeque = false;
        this.isUPI = false;
        this.isDD = false;
        this.iscredit = false;
        break;
    }
  }

  showchecked(checked: any) {
    console.log(checked.target.value);
    let me = checked.target.value

    var x = me;
    var y: number = +x;
    console.log(y);

    switch (y) {
      case 1:
        this.isCashinhand = !this.isCashinhand;
        break;
      case 2:
        this.iscard = !this.iscard;
        break;
      case 3:
        this.ischeque = !this.ischeque;
        break;
      case 4:
        this.isUPI = !this.isUPI;
        break;
      case 5:
        this.isDD = !this.isDD;
        break; default:
        console.log("No such day exists!");
        break;
    }
    
    
  }
  cashinhand(e:any){    
    
    let bookamount=this.advanceamount;
    let net=this.vehicleDetailsForm.value['total'];
    let cash=this.transtypecash.value['handAmount'];
    let card=this.transtypecash.value['cardAmount'];
    let cheque=this.transtypecash.value['chequeAmount'];
    let dd=this.transtypecash.value['ddAmount'];
    let upi=this.transtypecash.value['upiAmount'];
    let amount=parseInt(cash) + parseInt(card) + parseInt(cheque) + parseInt(dd) + parseInt(upi);
    let balance=net-(bookamount+amount);
    this.payDetails.patchValue({
      cashbank:amount,
      balanceamt:balance,
      financeamt:0,
      creditamt:0
    })
  }
  creditamount(e:any)
  {
    let bookamount=this.advanceamount;
    let net=this.vehicleDetailsForm.value['total'];    
    let amount=this.creditForm.value['creditAmount'];
    let balance=net-(bookamount+amount)
    this.payDetails.patchValue({
      creditamt:amount,
      balanceamt:balance,
      financeamt:0,
      cashbank:0
    })
  }
  financeamount(e:any)
  {
    let bookamount=this.advanceamount;
    let net=this.vehicleDetailsForm.value['total'];    
    let amount=this.financeForm.value['downPayment'];
    let balance=net-(bookamount+amount)
    this.payDetails.patchValue({
      financeamt:amount,
      balanceamt:balance,
      creditamt:0,
      cashbank:0
    })
  }
  finalsubmit() {   
    console.log(this.finalform.value)
    this.myDate=this.datePipe.transform(this.now, 'yyyy-MM-dd');
    this.transtypecash.patchValue({
      currentDate:this.myDate,
      chequeDate:this.myDate,
      ddDate:this.myDate
    })  
    this.payDetails.patchValue({
      createVehicleSalePaymentDetailDTO:this.transtypecash.value,createVehicleSaleCreditDetailDTO:this.creditForm.value,createVehicleSaleFinanceDetailDTO:this.financeForm.value
    })
    // console.log(this.payDetails.value);
    this.finalform.patchValue({
      createVehicleCustomerDetailsDTO:this.customerDetailForm.value,createVehicleSalesDetailDTO:this.vehicleDetailsForm.value,createVehicleSaleTransactionDetailDTO:this.payDetails.value
    })
     
   
    this.service.salessave(this.finalform.value).subscribe((data:any)=>{
      if(data)
      {
        this.service.printvalue.next(this.finalform.value);
        this.toastService.show(data.message,{classname:'bg-success text-light', delay: 3000});  
        this.print();         
      }
      else{
        this.toastService.show(data.message,{classname:'bg-danger text-light', delay: 3000})
      }
    })
    
  }
  print(){    
    this.route.navigateByUrl('/invoice');
  }

  customerNext(){
    this.submitted = true;

  }

  bookingBtn(){
  //  this.advanceDate = new Date().toISOString().split('T')[0];

    this.loadadvancebook();
    this.loadname();
    this.loadmodelname();
  }

  getAdvanceBookingsByFilter(){
    console.log( this.selectedAdvanceName)
    console.log( this.selectedAdvanceDate )
    console.log( this.selectedAdvanceModelName)
    this.service.getAdvanceBookingsByFilter(this.selectedAdvanceName,this.selectedAdvanceDate,this.selectedAdvanceModelName).subscribe(data=>{
     // this.showdata=data;
     this.bookdata=data;
     console.log(data)
    })
  }

  onChangeselectedAdvanceName(getName:any){
    console.log(getName);
    console.log( this.selectedAdvanceName)
    this.selectedAdvanceName=getName.target.value;
 console.log(getName.target.value);


  }

  onChangeselectedAdvanceModelName(getName:any){
    console.log(getName);
    console.log( this.selectedAdvanceModelName)
    this.selectedAdvanceModelName=getName.target.value;
 console.log(getName.target.value);

  }

  clearBtn(){
    this.customerDetailForm.patchValue({'receiptNos':''});
    this.customerDetailForm.patchValue({'date':''});
  }


}
