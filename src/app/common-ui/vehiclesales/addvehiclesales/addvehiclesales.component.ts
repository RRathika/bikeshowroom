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
  isShownHome: boolean = true;
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
  taluk2: any;
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
  // selectedObject: any;
  totaldata: any;
  finalamount: any;
  patchdata: any;
  colordetails: any;
  finance: any;
  invoicevalue: any;
  now: any = Date.now();
  format: string = "medium";
  disableTextbox: boolean = false;
  advanceamount = 0;
  cash: number = 0;
  card: number = 0;
  cheque: number = 0;
  dd: number = 0; upi: number = 0;
  // showdata: any;
  selectedAdvanceModelName: any = '';
  selectedAdvanceName: any = '';
  selectedAdvanceDate: any = '';
  // disableTextbox:boolean=false;
  // advanceamount=0;
  // cash:number=0;
  // card:number=0;
  // cheque:number=0;
  // dd:number=0;upi:number=0;
  showdata: any = '';
  // selectedAdvanceModelName:any ='';
  // selectedAdvanceName:any ='';
  // selectedAdvanceDate:any ='';
  selectedGender = 0;
  submitted: boolean = false;
  selectedPresentDistrict = 0;
  selectedPermanentDistrict = 0;
  selectedPresentTaluk: any;
  selectedPermanentTaluk: any;
  selectedAddressProof = 'Aadhar Proof';
  Selectedqualification = 0;
  SelectedOccupation = 0;
  selectedMaritalStatus = 0;
  selectedNomineeGender = 0;
  selectedRelation = 0;
  selectedShowroom = 0;
  selectedYard = 0;
  selectedModelName: any;
  selectedColor: any;
  selectedVariant: any;
  selectedMonth: any;
  selectedYear: any;
  selectedvehicleSaleType: any;
  selectedtransactionTypeId: any;
  selectedfinanceId: any;

  // selectedPresentTaluk:any;
  // selectedPermanentTaluk:any;
  labeldata: any = '';
  taxper: any;
  submittedVehicle: boolean = false;
  submittedFinal: boolean = false;
  constructor(private service: YamahaserviceService, private route: Router, private formBuilder: FormBuilder, public datePipe: DatePipe, public toastService: ToastServiceService) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  presentaddressForm: FormGroup = this.formBuilder.group({
    doorNo: new FormControl('', [Validators.required]),
    areaName: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    taluk: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")])
  });
  permanentaddressForm: FormGroup = this.formBuilder.group({
    doorNo: new FormControl('', [Validators.required]),
    areaName: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    taluk: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")])
  });
  customerDetailForm: FormGroup = this.formBuilder.group({
    invoiceNo: new FormControl('', []),
    invoiceDate: new FormControl(),
    receiptType: new FormControl(0, []),
    receiptNos: new FormControl('', []),
    date: new FormControl('', []),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', []),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', []),
    fatherName: new FormControl('', [Validators.required]),
    // gstNo: new FormControl('', []),
    presentAddress: new FormControl(),
    permanentAddress: new FormControl(),
    phoneOff: new FormControl('', []),
    residence: new FormControl('', []),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    eMail: new FormControl('', []),
    addressProof: new FormControl('', []),
    aadharNo: new FormControl('', [Validators.required]),
    qualification: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required]),
    maritalStatus: new FormControl('', [Validators.required]),
    nomineeName: new FormControl('', [Validators.required]),
    nomineeAge: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{2}$")]),
    nomineeGender: new FormControl('', [Validators.required]),
    relation: new FormControl('', [Validators.required])
  })
  vehicleDetailsForm: FormGroup = this.formBuilder.group({
    showRoomId: new FormControl('', [Validators.required]),
    yardId: new FormControl('', []),
    modelId: new FormControl('', []),
    chassisNo: new FormControl('', [Validators.required]),
    engineNo: new FormControl('', []),
    colorId: new FormControl('', []),
    keyNo: new FormControl('', []),
    month: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    vehicleSaleType: new FormControl('', [Validators.required]),
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
    lifetax: 0,
    insurance: 0,
    taxtotal: new FormControl('', []),
    taxpercentage: new FormControl('', []),
    extraacc: 0,
    otheracc: 0,
    warrentyacc: 0,
    acclifetax: 0,
    accinsurance: 0,
    acctaxtotal: new FormControl(),
    accextraacc: 0,
    accotheracc: 0,
    accwarrentyacc: 0,
  })
  payDetails: FormGroup = this.formBuilder.group({
    transactionTypeId: 0,
    vehicleCost: 0,
    otherAmount: 0,
    totalAmount: 0,
    bookrecamt: 0,
    financeamt: 0,
    creditamt: 0,
    cashbank: 0,
    excessamt: 0,
    balanceamt: 0,
    vehicleTax: 0,
    createVehicleSalePaymentDetailDTO: new FormControl(),
    createVehicleSaleCreditDetailDTO: new FormControl(),
    createVehicleSaleFinanceDetailDTO: new FormControl()
  })

  transtypecash: FormGroup = this.formBuilder.group({
    // handAmount: 0,
    // handAmount: new FormControl(0, []),
    handAmount: new FormControl('', []),
    currentDate: new FormControl(),
    cardAmount: new FormControl('', []),
    cardDetails: new FormControl('', []),
    chequeAmount: new FormControl('', []),
    chequeDetails: new FormControl('', []),
    chequeDate: new FormControl('', []),
    chequeNo: new FormControl('', []),
    ddAmount: new FormControl('', []),
    ddDetails: new FormControl('', []),
    ddDate: new FormControl('', []),
    ddNo: new FormControl('', []),
    upiAmount: new FormControl('', []),
    upiNo: new FormControl('', []),
    status: 0
  })
  creditForm: FormGroup = this.formBuilder.group({
    creditAmount: new FormControl('', []),
    name: new FormControl('', []),
    mobileNo: new FormControl('', []),
    address: new FormControl('', []),
    status: 0
  })
  financeForm: FormGroup = this.formBuilder.group({
    financeId: new FormControl('', []),
    downPayment: new FormControl('', []),
    status: 0
  })
  finalform: FormGroup = this.formBuilder.group({
    createVehicleCustomerDetailsDTO: new FormControl(),
    createVehicleSalesDetailDTO: new FormControl(),
    createVehicleSaleTransactionDetailDTO: new FormControl()
  })
  ModalFilterform: FormGroup = this.formBuilder.group({
    modelId: new FormControl('', []),
    colorId: new FormControl('', []),
    variantId: new FormControl('', [])
  })

  ngOnInit(): void {
    this.disable();
    this.color();
    // this.loadadvancebook();
    // this.loadname();
    // this.loadmodelname();
    this.district();
    this.loadqualification();
    this.loadoccupation();
    // this.showroomdata();
    this.show = localStorage.getItem('ShowRoomId');
    this.role = localStorage.getItem('RoleId');
    if (this.show > 0) {
      this.loadinvoice();
    }
    this.customerDetailForm.controls['receiptNos'].disable();
    this.customerDetailForm.controls['date'].disable();
    // this.isdisableClearBtn=true;
  }
  disable() {
    this.customerDetailForm.controls['receiptNos'].disable();
    this.customerDetailForm.controls['date'].disable();
    this.customerDetailForm.controls['invoiceNo'].disable();
    this.presentaddressForm.controls['taluk'].disable();
    this.permanentaddressForm.controls['taluk'].disable();
    this.vehicleDetailsForm.controls['yardId'].disable();
    this.selectedMonth = 0;
    this.selectedYear = 0
    this.selectedvehicleSaleType = 0;
    this.selectedtransactionTypeId = 0;
    this.selectedfinanceId = 0;

    this.isdisable = true;
    let role = localStorage.getItem('RoleId');

    this.isdisableClearBtn = true;

    if (role != '1') {
      this.myDate = this.datePipe.transform(this.now, 'yyyy-MM-dd');
      this.customerDetailForm.controls['invoiceDate'].disable();
      this.customerDetailForm.patchValue({
        invoiceDate: this.myDate
      })
    }
  }
  // showroomdata() {
  //   this.service.getshowroom().subscribe(data => {
  //     this.showdata = data;
  //   })
  // }
  // selectshowroom(e: any) {
  //   let data = e.target.value;
  //   console.log(data);
  //   this.service.getinvoice(data).subscribe((data: any) => {
  //     this.invoicevalue = data;
  //     console.log(this.invoicevalue);
  //     this.customerDetailForm.patchValue({
  //       invoiceNo: this.invoicevalue
  //     })
  //   })
  // }
  changesale(e: any) {
    // console.log(this.showdata);    
    // debugger
    console.log(e.target.value);
    if (e.target.value == 'Within State Sales') {
      this.labeldata = 'TAX % (CGST + SGST)';
      console.log(this.labeldata);
      let a = this.vehicleDetailsForm.value['cgst'];
      let b = this.vehicleDetailsForm.value['sgst'];
      this.taxper = a + b;
      console.log(this.vehicleDetailsForm.value);
      this.vehicleDetailsForm.patchValue({
        taxpercentage: this.taxper
      })
      this.gstcalculation(this.taxper);
      console.log(this.vehicleDetailsForm.value);

    }
    if (e.target.value == 'outside State Sales') {
      this.labeldata = 'TAX % (IGST)';
      console.log(this.labeldata);
      this.taxper = this.vehicleDetailsForm.value['igst'];
      this.vehicleDetailsForm.patchValue({
        taxpercentage: this.taxper
      })
      this.gstcalculation(this.taxper);
    }
  }
  showroomdata() {
    this.service.getshowroom().subscribe(data => {
      this.showdata = data;
    })
  }
  selectshowroom(e: any) {
    let data = e.target.value;
    console.log(data);
    this.service.getinvoice(data).subscribe((data: any) => {
      this.invoicevalue = data;
      console.log(this.invoicevalue);
      this.customerDetailForm.patchValue({
        invoiceNo: this.invoicevalue
      })
    })
  }

  loadinvoice() {
    let da = localStorage.getItem('ShowRoomId');
    console.log(da);
    this.service.getinvoice(da).subscribe((data: any) => {
      this.invoicevalue = data;
      console.log(this.invoicevalue);
      this.customerDetailForm.patchValue({
        invoiceNo: this.invoicevalue
      })
    })
  }
  loadfinance() {
    this.service.getfinance().subscribe(data => {
      this.finance = data;
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
      this.selectedModelName = 0;
      console.log(data);

      //  this.selectedModelName=0;
    })
  }
  showroom() {
    this.service.getshowroom().subscribe(data => {
      this.showroomname = data;
    })
  }
  // yard() {
  //   this.service.getyard().subscribe(data => {
  //     this.yardname = data;
  //   })
  // }
  selectyard(e: any) {
    let name = e.target.value;
    this.service.showroombyyard(name).subscribe(data => {
      this.yardname = data;
      if (data.message == 'No Data Found') {
        this.vehicleDetailsForm.controls['yardId'].disable();
        this.selectedYard = 0;
        this.yardname = [];
        this.toastService.show('No Yard for this Showroom', { classname: 'bg-danger text-light', delay: 2000 });
      }
      else {
        this.vehicleDetailsForm.controls['yardId'].enable();
        this.yardname = data;
        this.selectedYard = 0;
      }
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
    this.totaldata = [];
    this.varientcode = [];
    this.selectedVariant = 0;
    let model = e.target.value;
    this.vehicleDetailsForm.patchValue({
      modelId: model
    })
    this.service.selectmodel(model).subscribe(data => {
      if (data.statusCode == 200) {
        this.colorcode = [];
        this.selectedColor = 0;
        this.ModalFilterform.controls['colorId'].disable();
        this.ModalFilterform.controls['variantId'].disable();
        this.toastService.show('Dont have related color', { classname: 'bg-danger text-light', delay: 3000 });
      }
      else {
        this.ModalFilterform.controls['colorId'].enable();
        this.colorcode = data;
        this.selectedColor = 0;
      }
    })
  }
  colornamechange(e: any) {
    this.totaldata = [];
    this.selectedVariant = 0;
    let model = e.target.value;
    this.vehicleDetailsForm.patchValue({
      colorId: model
    })
    this.service.selectcolor(model).subscribe(data => {
      if (data.statusCode == 200) {
        this.varientcode = [];
        this.ModalFilterform.controls['variantId'].disable();
        this.toastService.show('Dont have related variant', { classname: 'bg-danger text-light', delay: 3000 });
      }
      else {
        this.varientcode = data;
        this.ModalFilterform.controls['variantId'].enable();
      }
    })
  }
  variantnamechange(e: any) {
    // debugger
    let variant = e.target.value;
    let show = localStorage.getItem('ShowRoomId');
    let role = localStorage.getItem('RoleId');
    this.service.vartantbydata(variant, show, role).subscribe(data => {
      console.log(data)

      if (data.message == 'No Data Found') {
        this.totaldata = [];
        this.toastService.show('No stock available', { classname: 'bg-danger text-light', delay: 2000 });
      }
      else {
        this.totaldata = data;
        for (let i = 0; i <= this.totaldata.length; i++) {
          this.finalamount = Math.round(this.totaldata[i].total);
          this.totaldata[i].netamount = this.finalamount;
          console.log(this.totaldata);
        }
      }



    })
  }
  gstcalculation(e: any) {

    // let data = e.target.value;

    let data = e;
    let invoice = (data / 100) * (this.vehicleDetailsForm.value['vehicleCost']);
    let invoiceamount = this.vehicleDetailsForm.value['vehicleCost'] + Math.round(invoice);
    let final = invoiceamount + Math.round(this.vehicleDetailsForm.value['taxtotal']);
    this.vehicleDetailsForm.patchValue({
      tax: invoice,
      invoiceAmount: invoiceamount,
      total: final,
      finaltotal: final
    })

  }
  applyvehicle(chass: any, cg: any, sg: any, ig: any, engine: any, ins: any, invoice: any, key: any, life: any, net: any, total: any) {
    let acctaxtotal = life + ins;
    this.vehicleDetailsForm.patchValue({
      chassisNo: chass,
      engineNo: engine,
      keyNo: key,
      vehicleCost: invoice,
      rounded: net,
      cgst: cg,
      sgst: sg,
      igst: ig,
      insurance: ins,
      lifetax: life,
      acclifetax: life,
      accinsurance: ins,
      acctaxtotal: acctaxtotal,
      taxtotal: acctaxtotal
    })
    if (this.vehicleDetailsForm.get('chassisNo')?.value != '') {
      this.vehicleDetailsForm.controls['vehicleSaleType'].enable();
      this.vehicleDetailsForm.controls['lifetax'].enable();
      this.vehicleDetailsForm.controls['insurance'].enable();
      this.vehicleDetailsForm.controls['extraacc'].enable();
      this.vehicleDetailsForm.controls['otheracc'].enable();
      this.vehicleDetailsForm.controls['warrentyacc'].enable();
    }
    else {
      this.vehicleDetailsForm.controls['vehicleSaleType'].disable();
      this.vehicleDetailsForm.controls['lifetax'].disable();
      this.vehicleDetailsForm.controls['insurance'].disable();
      this.vehicleDetailsForm.controls['extraacc'].disable();
      this.vehicleDetailsForm.controls['otheracc'].disable();
      this.vehicleDetailsForm.controls['warrentyacc'].disable();
    }
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
      if (data.message == 'No Data Found') {
        this.taluk1 = '';
        this.selectedPresentTaluk = 0;
        this.presentaddressForm.controls['taluk'].disable();
        // this.toastService.show("No Taluk under "+name,{classname:'bg-danger text-light', delay: 3000})
      }
      else {
        this.presentaddressForm.controls['taluk'].enable();
        this.taluk1 = data;
        this.selectedPresentTaluk = 0;
      }

    })
  }

  districttalukPermanent(e: any) {
    let name = e.target.value;
    this.service.gettaluk(name).subscribe((data: any) => {
      console.log(data)
      if (data.message == 'No Data Found') {
        this.taluk2 = '';
        this.selectedPermanentTaluk = 0;
        this.permanentaddressForm.controls['taluk'].disable();
      }
      else {
        this.permanentaddressForm.controls['taluk'].enable();
        this.taluk2 = data;
        this.selectedPermanentTaluk = 0;
      }

    })
  }

  districttalukPermanentLoad(name: any, taluk: any) {
    // let name = e.target.value;
    this.service.gettaluk(name).subscribe((data: any) => {
      console.log(data)
      if (data.message == 'No Data Found') {
        //this.taluk2 = '';
        //  this.selectedPermanentTaluk=0;
        // this.permanentaddressForm.controls['taluk'].disable();
      }
      else {
        // this.permanentaddressForm.controls['taluk'].enable();
        this.taluk2 = data;
        console.log(this.taluk2)
        this.selectedPermanentTaluk = taluk;
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
      console.log(this.username);

    })
  }
  loadmodelname() {
    this.service.getmodelname().subscribe(data => {
      this.modelname = data;
    })
  }
  apply(id: any, date1: any, advance: any) {
    this.isdisableClearBtn = false;
    let date2 = date1.split('T');
    this.advanceamount = advance;
    console.log(date2[0]);
    this.customerDetailForm.patchValue({ receiptNos: id, date: date2[0] });
  }

  shift() {
    // console.log(this.presentaddressForm.value)
    // console.log( this.permanentaddressForm.value)
    this.permanentaddressForm.controls['taluk'].enable();
    this.permanentaddressForm.patchValue({ 'district': this.presentaddressForm.get('district')?.value })
    this.permanentaddressForm.patchValue({ 'taluk': this.presentaddressForm.get('taluk')?.value })
    this.districttalukPermanentLoad(this.presentaddressForm.get('district')?.value, this.presentaddressForm.get('taluk')?.value);

    this.permanentaddressForm.patchValue(this.presentaddressForm.value);

    // console.log(this.presentaddressForm.value)
    // console.log( this.permanentaddressForm.value)
    //this.permanentaddressForm.patchValue(this.presentaddressForm.value);
    // console.log(this.presentaddressForm.value)
    // console.log( this.permanentaddressForm.value)
  }
  // shift() {
  //   console.log(this.presentaddressForm.get('district')?.value);
  //   console.log(this.permanentaddressForm.get('district')?.value);
  //   console.log(this.presentaddressForm.value)
  //   console.log( this.permanentaddressForm.value)
  //   // this.permanentaddressForm.controls['taluk'].enable();
  //   console.log(this.presentaddressForm.get('taluk')?.value);
  //   this.permanentaddressForm.addControl('taluk', this.formBuilder.control('', Validators.required));
  //   this.permanentaddressForm.patchValue({'taluk' : this.presentaddressForm.get('taluk')?.value})
  // //  this.permanentaddressForm.patchValue({'district' : this.presentaddressForm.get('district')?.value})
  //   this.permanentaddressForm.controls['taluk'].enable();
  //   console.log(this.presentaddressForm.value)
  //   console.log( this.permanentaddressForm.value)
  //   this.districttalukPermanentLoad(this.presentaddressForm.get('district')?.value);
  //   // console.log(this.presentaddressForm.value)
  //   // console.log(this.permanentaddressForm.value)
  //   // console.log(this.presentaddressForm.get('taluk')?.value);
  //   // // this.permanentaddressForm.controls['taluk'].enable();
  //   // // this.presentaddressForm.controls['taluk'].enable();
  //   // if(this.presentaddressForm.value!=''){
  //   //   this.permanentaddressForm.controls['taluk'].enable(); 
  //   //   // this.permanentaddressForm.addControl('taluk', []);
  //      this.permanentaddressForm.patchValue(this.presentaddressForm.value);
  //      console.log(this.presentaddressForm.value)
  //      console.log( this.permanentaddressForm.value)
  //   //    this.permanentaddressForm.patchValue({'taluk' : '2'})
  //   //}
  // }

  onChange(e: any) {

    if (e.value == 2) {
      // this.customerDetailForm.controls['receiptNos'].enable();
      // this.customerDetailForm.controls['date'].enable();

      this.isdisable = false;
    }
    else {
      this.clearBtn();
      this.isdisableClearBtn = true;
      this.isdisable = true;
    }
  }
  onKeyUp(x: any) { // appending the updated value to the variable
    let data = x.target.value;
    let final = data.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter((s: string | any[]) => s.length > 0).join(" ");
    //  console.log(final);
    this.customerDetailForm.patchValue({ aadharNo: final });
  }
  submit() {
    this.submitted = true;
    if (this.vehicleDetailsForm.get('chassisNo')?.value != '') {
      this.vehicleDetailsForm.controls['vehicleSaleType'].enable();
      this.vehicleDetailsForm.controls['lifetax'].enable();
      this.vehicleDetailsForm.controls['insurance'].enable();
      this.vehicleDetailsForm.controls['extraacc'].enable();
      this.vehicleDetailsForm.controls['otheracc'].enable();
      this.vehicleDetailsForm.controls['warrentyacc'].enable();
    }
    else {
      this.vehicleDetailsForm.controls['vehicleSaleType'].disable();
      this.vehicleDetailsForm.controls['lifetax'].disable();
      this.vehicleDetailsForm.controls['insurance'].disable();
      this.vehicleDetailsForm.controls['extraacc'].disable();
      this.vehicleDetailsForm.controls['otheracc'].disable();
      this.vehicleDetailsForm.controls['warrentyacc'].disable();
    }

    // if (this.customerDetailForm.valid && this.presentaddressForm.valid && this.permanentaddressForm.valid
    // && this.customerDetailForm.value['gender'] != 0
    // && this.customerDetailForm.value['qualification'] != 0 && this.customerDetailForm.value['occupation'] != 0
    // && this.customerDetailForm.value['maritalStatus'] != 0 && this.customerDetailForm.value['nomineeGender'] != 0
    // && this.customerDetailForm.value['relation'] != 0
    // && this.presentaddressForm.value['district'] != 0 && this.presentaddressForm.value['taluk'] != 0) {
    this.customerDetailForm.patchValue({ presentAddress: this.presentaddressForm.value, permanentAddress: this.permanentaddressForm.value })
    this.isShownProfile = !this.isShownProfile;
    this.isShownHome = false;
    this.isShownContact = false;
    this.showroom();
    // this.yard();
    //  this.color();
    this.loadfinance();
    this.getyear();
    // }
  }

  btnVehicleModel() {
    this.totaldata = [];
    this.ModalFilterform.controls['colorId'].disable();
    this.ModalFilterform.controls['variantId'].disable();
    this.model();
    this.selectedColor = 0;
    this.selectedVariant = 0;
  }

  vehicleform() {
    // this.submittedVehicle = true;
    // if (this.vehicleDetailsForm.get('chassisNo')?.value == '') {
    //   this.toastService.show('Choose Vehicle Model', { classname: 'bg-danger text-light', delay: 3000 });
    // }
    // else{

    //   if (this.vehicleDetailsForm.valid && this.vehicleDetailsForm.value['showRoomId'] != 0
    //     && this.vehicleDetailsForm.value['month'] != 0 && this.vehicleDetailsForm.value['year'] != 0
    //     && this.vehicleDetailsForm.value['vehicleSaleType'] != 0) {
    this.isShownHome = false;
    this.isShownProfile = false;
    this.isShownContact = !this.isShownHome;
    this.loadfield();
    //   }
    // }
  }

  toggleShowProfile() {

    if (this.vehicleDetailsForm.get('chassisNo')?.value != '') {
      this.vehicleDetailsForm.controls['vehicleSaleType'].enable();
      this.vehicleDetailsForm.controls['lifetax'].enable();
      this.vehicleDetailsForm.controls['insurance'].enable();
      this.vehicleDetailsForm.controls['extraacc'].enable();
      this.vehicleDetailsForm.controls['otheracc'].enable();
      this.vehicleDetailsForm.controls['warrentyacc'].enable();
    }
    else {
      this.vehicleDetailsForm.controls['vehicleSaleType'].disable();
      this.vehicleDetailsForm.controls['lifetax'].disable();
      this.vehicleDetailsForm.controls['insurance'].disable();
      this.vehicleDetailsForm.controls['extraacc'].disable();
      this.vehicleDetailsForm.controls['otheracc'].disable();
      this.vehicleDetailsForm.controls['warrentyacc'].disable();
    }

    this.isShownProfile = !this.isShownProfile;
    this.isShownHome = false;
    this.isShownContact = false;
  }
  toggleShowHome() {
    this.isShownHome = !this.isShownHome;
    this.isShownProfile = false;
    this.isShownContact = false;
  }
  loadfield() {
    let vehiclecost1 = this.vehicleDetailsForm.value['vehicleCost'];
    let otheramount1 = this.vehicleDetailsForm.value['taxtotal'];
    let net = this.vehicleDetailsForm.value['finaltotal'];
    let bookamount = this.advanceamount;
    let tax = this.vehicleDetailsForm.value['tax'];
    this.payDetails.patchValue({
      vehicleCost: vehiclecost1,
      otherAmount: otheramount1,
      totalAmount: net,
      bookrecamt: bookamount,
      vehicleTax: tax
    })
  }
  toggleShowCash(value: any) {
    console.log(value.target.value);
    switch (value.target.value) {
      case '1':
        this.isShownCash = !this.isShownCash;
        this.isFinance = false;
        this.iscredit = false;

        this.creditForm.reset();
        this.financeForm.reset();
        break;

      case "2":
        this.iscredit = !this.iscredit;
        if (this.iscredit == true) {
          this.creditForm.controls['creditAmount'].setValidators([Validators.required]);
          this.creditForm.controls['creditAmount'].updateValueAndValidity();
          this.creditForm.controls['name'].setValidators([Validators.required]);
          this.creditForm.controls['name'].updateValueAndValidity();
          this.creditForm.controls['mobileNo'].setValidators([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
          this.creditForm.controls['mobileNo'].updateValueAndValidity();
          this.creditForm.controls['address'].setValidators([Validators.required]);
          this.creditForm.controls['address'].updateValueAndValidity();
        }
        else {
          this.creditForm.controls['creditAmount'].setValidators(null);
          this.creditForm.controls['creditAmount'].updateValueAndValidity();
          this.creditForm.controls['name'].setValidators(null);
          this.creditForm.controls['name'].updateValueAndValidity();
          this.creditForm.controls['mobileNo'].setValidators(null);
          this.creditForm.controls['mobileNo'].updateValueAndValidity();
          this.creditForm.controls['address'].setValidators(null);
          this.creditForm.controls['address'].updateValueAndValidity();
          // this.creditForm.patchValue({handAmount: ''})
        }
        this.isShownCash = false;
        this.isCashinhand = false;
        this.iscard = false;
        this.ischeque = false;
        this.isUPI = false;
        this.isDD = false;
        this.isFinance = false;

        this.transtypecash.reset();
        this.financeForm.reset();

        break;
      default:
        console.log("No such day exists!");
        break;
      case "3":
        this.isFinance = !this.isFinance;
        if (this.isFinance == true) {
          this.financeForm.controls['financeId'].setValidators([Validators.required]);
          this.financeForm.controls['financeId'].updateValueAndValidity();
          this.financeForm.controls['downPayment'].setValidators([Validators.required]);
          this.financeForm.controls['downPayment'].updateValueAndValidity();
        }
        else {
          this.financeForm.controls['financeId'].setValidators(null);
          this.financeForm.controls['financeId'].updateValueAndValidity();
          this.financeForm.controls['downPayment'].setValidators(null);
          this.financeForm.controls['downPayment'].updateValueAndValidity();
          // this.creditForm.patchValue({handAmount: ''})
        }
        this.selectedfinanceId = 0;
        this.isShownCash = false;
        this.isCashinhand = false;
        this.iscard = false;
        this.ischeque = false;
        this.isUPI = false;
        this.isDD = false;
        this.iscredit = false;

        this.transtypecash.reset();
        this.creditForm.reset();


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
        if (this.isCashinhand == true) {
          this.transtypecash.controls['handAmount'].setValidators([Validators.required]);
          this.transtypecash.controls['handAmount'].updateValueAndValidity();
        }
        else {
          this.transtypecash.controls['handAmount'].setValidators(null);
          this.transtypecash.controls['handAmount'].updateValueAndValidity();
          this.transtypecash.patchValue({ handAmount: '' })
        }
        break;
      case 2:
        this.iscard = !this.iscard;
        if (this.iscard == true) {
          this.transtypecash.controls['cardAmount'].setValidators([Validators.required]);
          this.transtypecash.controls['cardAmount'].updateValueAndValidity();
          this.transtypecash.controls['cardDetails'].setValidators([Validators.required]);
          this.transtypecash.controls['cardDetails'].updateValueAndValidity();
        }
        else {
          this.transtypecash.controls['cardAmount'].setValidators(null);
          this.transtypecash.controls['cardAmount'].updateValueAndValidity();
          this.transtypecash.controls['cardDetails'].setValidators(null);
          this.transtypecash.controls['cardDetails'].updateValueAndValidity();
          this.transtypecash.patchValue({ cardAmount: '' })
          this.transtypecash.patchValue({ cardDetails: '' })
        }
        break;
      case 3:
        this.ischeque = !this.ischeque;
        if (this.ischeque == true) {
          this.transtypecash.controls['chequeAmount'].setValidators([Validators.required]);
          this.transtypecash.controls['chequeAmount'].updateValueAndValidity();
          this.transtypecash.controls['chequeNo'].setValidators([Validators.required]);
          this.transtypecash.controls['chequeNo'].updateValueAndValidity();
          this.transtypecash.controls['chequeDate'].setValidators([Validators.required]);
          this.transtypecash.controls['chequeDate'].updateValueAndValidity();
          this.transtypecash.controls['chequeDetails'].setValidators([Validators.required]);
          this.transtypecash.controls['chequeDetails'].updateValueAndValidity();
        }
        else {
          this.transtypecash.controls['chequeAmount'].setValidators(null);
          this.transtypecash.controls['chequeAmount'].updateValueAndValidity();
          this.transtypecash.controls['chequeNo'].setValidators(null);
          this.transtypecash.controls['chequeNo'].updateValueAndValidity();
          this.transtypecash.controls['chequeDate'].setValidators(null);
          this.transtypecash.controls['chequeDate'].updateValueAndValidity();
          this.transtypecash.controls['chequeDetails'].setValidators(null);
          this.transtypecash.controls['chequeDetails'].updateValueAndValidity();
          this.transtypecash.patchValue({ chequeAmount: '' })
          this.transtypecash.patchValue({ chequeNo: '' })
          this.transtypecash.patchValue({ chequeDate: '' })
          this.transtypecash.patchValue({ chequeDetails: '' })
        }
        break;
      case 4:
        this.isUPI = !this.isUPI;
        if (this.isUPI == true) {
          this.transtypecash.controls['upiAmount'].setValidators([Validators.required]);
          this.transtypecash.controls['upiAmount'].updateValueAndValidity();
          this.transtypecash.controls['upiNo'].setValidators([Validators.required]);
          this.transtypecash.controls['upiNo'].updateValueAndValidity();
        }
        else {
          this.transtypecash.controls['upiAmount'].setValidators(null);
          this.transtypecash.controls['upiAmount'].updateValueAndValidity();
          this.transtypecash.controls['upiNo'].setValidators(null);
          this.transtypecash.controls['upiNo'].updateValueAndValidity();
          this.transtypecash.patchValue({ upiAmount: '' })
          this.transtypecash.patchValue({ upiNo: '' })
        }
        break;
      case 5:
        this.isDD = !this.isDD;
        if (this.isDD == true) {
          this.transtypecash.controls['ddAmount'].setValidators([Validators.required]);
          this.transtypecash.controls['ddAmount'].updateValueAndValidity();
          this.transtypecash.controls['ddDetails'].setValidators([Validators.required]);
          this.transtypecash.controls['ddDetails'].updateValueAndValidity();
          this.transtypecash.controls['ddDate'].setValidators([Validators.required]);
          this.transtypecash.controls['ddDate'].updateValueAndValidity();
          this.transtypecash.controls['ddNo'].setValidators([Validators.required]);
          this.transtypecash.controls['ddNo'].updateValueAndValidity();
        }
        else {
          this.transtypecash.controls['ddAmount'].setValidators(null);
          this.transtypecash.controls['ddAmount'].updateValueAndValidity();
          this.transtypecash.controls['ddDetails'].setValidators(null);
          this.transtypecash.controls['ddDetails'].updateValueAndValidity();
          this.transtypecash.controls['ddDate'].setValidators(null);
          this.transtypecash.controls['ddDate'].updateValueAndValidity();
          this.transtypecash.controls['ddNo'].setValidators(null);
          this.transtypecash.controls['ddNo'].updateValueAndValidity();
          this.transtypecash.patchValue({ ddAmount: '' })
          this.transtypecash.patchValue({ ddDetails: '' })
          this.transtypecash.patchValue({ ddDate: '' })
          this.transtypecash.patchValue({ ddNo: '' })
        }
        break; default:
        console.log("No such day exists!");
        break;
    }


  }
  cashinhand(e: any) {

    let bookamount = this.advanceamount;
    let net = this.vehicleDetailsForm.value['finaltotal'];
    let cash = this.transtypecash.value['handAmount'];
    let card = this.transtypecash.value['cardAmount'];
    let cheque = this.transtypecash.value['chequeAmount'];
    let dd = this.transtypecash.value['ddAmount'];
    let upi = this.transtypecash.value['upiAmount'];
    let amount = parseInt(cash) + parseInt(card) + parseInt(cheque) + parseInt(dd) + parseInt(upi);
    let balance = Math.round(net) - (bookamount + amount);
    this.payDetails.patchValue({
      cashbank: amount,
      balanceamt: balance,
      financeamt: 0,
      creditamt: 0
    })
  }
  creditamount(e: any) {
    let bookamount = this.advanceamount;
    let net = this.vehicleDetailsForm.value['total'];
    let amount = this.creditForm.value['creditAmount'];
    let balance = net - (bookamount + amount)
    this.payDetails.patchValue({
      creditamt: amount,
      balanceamt: balance,
      financeamt: 0,
      cashbank: 0
    })
  }
  financeamount(e: any) {
    let bookamount = this.advanceamount;
    let net = this.vehicleDetailsForm.value['total'];
    let amount = this.financeForm.value['downPayment'];
    let balance = net - (bookamount + amount)
    this.payDetails.patchValue({
      financeamt: amount,
      balanceamt: balance,
      creditamt: 0,
      cashbank: 0
    })
  }
  finalsubmit() {

    this.submittedFinal = true;
    if (this.selectedtransactionTypeId == 1) {
      if (this.isCashinhand == true || this.iscard == true || this.ischeque == true
        || this.isUPI == true || this.isDD == true) {
        if (this.transtypecash.valid && this.financeForm.value['financeId'] != 0
          && this.creditForm.valid && this.financeForm.valid) {
          alert("valid")
        }
        else {
          alert("not valid")
          
        }
      }
      else {
        this.toastService.show('Select Payment Mode', { classname: 'bg-danger text-light', delay: 3000 });
      }
    }
    else {
    }


    // this.submittedFinal = true;
    // if (this.transtypecash.valid && this.financeForm.value['financeId'] != 0
    //   && this.creditForm.valid && this.financeForm.valid) {
    //   alert("valid")

    //   if (this.selectedtransactionTypeId == 1) {
    //     if (this.isCashinhand == true || this.iscard == true || this.ischeque == true
    //       || this.isUPI == true || this.isDD == true) {

    //     }
    //     else {
    //       this.toastService.show('Select Payment Mode', { classname: 'bg-danger text-light', delay: 3000 });
    //     }
    //   }

    // }
    // else {
    //   alert("not valid")
    // }






    // alert(this.transtypecash.value['handAmount'])

    console.log(this.finalform.value)
    // this.myDate = this.datePipe.transform(this.now, 'yyyy-MM-dd');
    // this.transtypecash.patchValue({
    //   currentDate: this.myDate,
    //   chequeDate: this.myDate,
    //   ddDate: this.myDate
    // })
    this.payDetails.patchValue({
      createVehicleSalePaymentDetailDTO: this.transtypecash.value, createVehicleSaleCreditDetailDTO: this.creditForm.value, createVehicleSaleFinanceDetailDTO: this.financeForm.value
    })
    // console.log(this.payDetails.value);
    this.finalform.patchValue({
      createVehicleCustomerDetailsDTO: this.customerDetailForm.value, createVehicleSalesDetailDTO: this.vehicleDetailsForm.value, createVehicleSaleTransactionDetailDTO: this.payDetails.value
    })


    this.service.salessave(this.finalform.value).subscribe((data: any) => {
      if (data) {
        this.service.printvalue.next(this.finalform.value);
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 3000 });
        this.print();
      }
      else {
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 3000 })
      }
    })

  }
  print() {
    this.route.navigateByUrl('/invoice');
  }

  // customerNext(){
  //   this.submitted = true;

  // }

  bookingBtn() {
    //  this.advanceDate = new Date().toISOString().split('T')[0];

    this.loadadvancebook();
    this.loadname();
    this.loadmodelname();
  }

  getAdvanceBookingsByFilter() {
    console.log(this.selectedAdvanceName)
    console.log(this.selectedAdvanceDate)
    console.log(this.selectedAdvanceModelName)
    this.service.getAdvanceBookingsByFilter(this.selectedAdvanceName, this.selectedAdvanceDate, this.selectedAdvanceModelName).subscribe(data => {
      // this.showdata=data;
      this.bookdata = data;
      console.log(data)
    })
  }

  onChangeselectedAdvanceName(getName: any) {
    console.log(getName);
    console.log(this.selectedAdvanceName)
    this.selectedAdvanceName = getName.target.value;
    console.log(getName.target.value);


  }

  onChangeselectedAdvanceModelName(getName: any) {
    console.log(getName);
    console.log(this.selectedAdvanceModelName)
    this.selectedAdvanceModelName = getName.target.value;
    console.log(getName.target.value);

  }

  clearBtn() {
    this.customerDetailForm.patchValue({ 'receiptNos': '' });
    this.customerDetailForm.patchValue({ 'date': '' });
  }
  warrent(e: any) {
    let value = e.target.value;
    let sum = parseInt(value) + parseInt(this.vehicleDetailsForm.value['lifetax']) + parseInt(this.vehicleDetailsForm.value['insurance']) + parseInt(this.vehicleDetailsForm.value['extraacc']) + parseInt(this.vehicleDetailsForm.value['otheracc']);
    console.log(sum);
    let final = this.vehicleDetailsForm.value['invoiceAmount'] + sum;
    this.vehicleDetailsForm.patchValue({
      taxtotal: sum,
      finaltotal: final
    })

  }
  othercharge(e: any) {
    let value = e.target.value;
    let sum = parseInt(value) + parseInt(this.vehicleDetailsForm.value['lifetax']) + parseInt(this.vehicleDetailsForm.value['insurance']) + parseInt(this.vehicleDetailsForm.value['extraacc']) + parseInt(this.vehicleDetailsForm.value['warrentyacc']);
    console.log(sum);
    let final = this.vehicleDetailsForm.value['invoiceAmount'] + sum;
    this.vehicleDetailsForm.patchValue({
      taxtotal: sum,
      finaltotal: final
    })
  }
  excharge(e: any) {
    let value = e.target.value;
    let sum = parseInt(value) + parseInt(this.vehicleDetailsForm.value['lifetax']) + parseInt(this.vehicleDetailsForm.value['insurance']) + parseInt(this.vehicleDetailsForm.value['otheracc']) + parseInt(this.vehicleDetailsForm.value['warrentyacc']);
    console.log(sum);
    let final = this.vehicleDetailsForm.value['invoiceAmount'] + sum;
    this.vehicleDetailsForm.patchValue({
      taxtotal: sum,
      finaltotal: final
    })
  }
  ins(e: any) {
    let value = e.target.value;
    let sum = parseInt(value) + parseInt(this.vehicleDetailsForm.value['lifetax']) + parseInt(this.vehicleDetailsForm.value['extraacc']) + parseInt(this.vehicleDetailsForm.value['otheracc']) + parseInt(this.vehicleDetailsForm.value['warrentyacc']);
    console.log(sum);
    let final = this.vehicleDetailsForm.value['invoiceAmount'] + sum;
    this.vehicleDetailsForm.patchValue({
      taxtotal: sum,
      finaltotal: final
    })
  }
  life(e: any) {
    let value = e.target.value;
    let sum = parseInt(value) + parseInt(this.vehicleDetailsForm.value['insurance']) + parseInt(this.vehicleDetailsForm.value['extraacc']) + parseInt(this.vehicleDetailsForm.value['otheracc']) + parseInt(this.vehicleDetailsForm.value['warrentyacc']);
    console.log(sum);
    let final = this.vehicleDetailsForm.value['invoiceAmount'] + sum;
    this.vehicleDetailsForm.patchValue({
      taxtotal: sum,
      finaltotal: final
    })
  }
}
