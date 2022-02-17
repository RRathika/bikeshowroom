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
  isdisable= false;
  myDate :any;
  bookdata:any;
  username:any;
  modelname:any;
  districtname:any;
  taluk1:any;
  qualification:any;
  occupation:any;
  year:any;
  constructor(private service:YamahaserviceService,private route:Router,private formBuilder:FormBuilder,private datePipe: DatePipe,public toastService: ToastServiceService) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
   }
  presentaddressForm: FormGroup = this.formBuilder.group({
    doorNo:new FormControl('',[Validators.required]),
    areaName:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    district:new FormControl('',[Validators.required]),
    taluk:new FormControl('',[Validators.required]),
    pinCode:new FormControl('',[Validators.required])
  });
  permanentaddressForm: FormGroup = this.formBuilder.group({
    doorNo:new FormControl('',[Validators.required]),
    areaName:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    district:new FormControl('',[Validators.required]),
    taluk:new FormControl('',[Validators.required]),
    pinCode:new FormControl('',[Validators.required])
  });
  customerDetailForm:FormGroup= this.formBuilder.group({
    invoiceNo:new FormControl('',[]),
    invoiceDate: new FormControl('',[]),
    receiptType: new FormControl('',[]),
    receiptNos: new FormControl('',[]),
    date: new FormControl('',[]),
    firstName: new FormControl('',[]), 
    lastName: new FormControl('',[]), 
    gender: new FormControl('',[]),
    dob: new FormControl('',[]),
    fatherName:new FormControl('',[]),
    gstNo: new FormControl('',[]), 
    presentAddress: new FormControl(),
    permanentAddress: new FormControl(),
    phoneOff: new FormControl('',[]), 
    residence: new FormControl('',[]), 
    mobileNo: new FormControl('',[]),
    eMail: new FormControl('',[]),
    addressProof: new FormControl('',[]), 
    aadharNo: new FormControl('',[]),
    qualification: new FormControl('',[]), 
    occupation: new FormControl('',[]),
    maritalStatus: new FormControl('',[]), 
    nomineeName: new FormControl('',[]),
    nomineeAge: new FormControl('',[]),
    nomineeGender: new FormControl('',[]), 
    relation: new FormControl('',[])  
  })
  
  ngOnInit(): void {
    this.customerDetailForm.controls['receiptNos'].disable();
    this.customerDetailForm.controls['date'].disable();
    this.isdisable=true;
    this.loadadvancebook();
    this.loadname();
    this.loadmodelname();
    this.district();
    this.loadqualification();
    this.loadoccupation();
    this.getyear();
  }
  loadqualification(){
    this.service.getqualification().subscribe(data=>{
      this.qualification=data;
    })
  }
  loadoccupation(){
    this.service.getoccupation().subscribe(data=>{
      this.occupation=data;
    })
  }
  getyear(){
    this.service.getyear().subscribe(data=>{
      this.year=data;
    })
  }
  district(){
    this.service.getdistrict().subscribe(data=>{
      this.districtname=data;
    })
  }
  districttaluk(e:any)
  {
    let name=e.target.value;
    this.service.gettaluk(name).subscribe((data:any)=>{
      this.taluk1=data
    })
  }
  loadadvancebook(){
    let bookid=localStorage.getItem('ShowRoomId')
    this.service.getadvancebook(bookid).subscribe(data=>{
     this.bookdata=data;   
    })
  }
  loadname(){
    this.service.getadvancename().subscribe(data=>{
      this.username=data;
    })
  }
  loadmodelname(){
    this.service.getmodelname().subscribe(data=>{
      this.modelname=data;
    })
  }
  apply(id:any,date1:any){
    let date2=date1.split('T');
    console.log(date2[0]);
    
    this.customerDetailForm.patchValue({receiptNos:id,date:date2[0]});
  }
  shift(){
    this.permanentaddressForm.patchValue(this.presentaddressForm.value);
  }
  onChange(e:any){
  
  if(e.value==1)
  {
    this.customerDetailForm.controls['receiptNos'].enable();
    this.customerDetailForm.controls['date'].enable();
    this.isdisable=false;
  }
  else
  {
    this.customerDetailForm.controls['receiptNos'].disable();
    this.customerDetailForm.controls['date'].disable();
    this.isdisable=true;
  }  
  }
  onKeyUp(x:any) { // appending the updated value to the variable
    let data=x.target.value;    
   let final = data.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter((s: string | any[]) => s.length > 0).join("-");
  //  console.log(final);
   this.customerDetailForm.patchValue({aadharNo:final});
  }
  submit(){
    this.customerDetailForm.patchValue({presentAddress:this.presentaddressForm.value,permanentAddress:this.permanentaddressForm.value})
  if(this.customerDetailForm.valid){
    this.service.savecustomerDetails(this.customerDetailForm.value).subscribe((data:any)=>{
    if(data.statusCode==200){      
      this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 });
      //this.route.navigateByUrl('/dashboard/enquirylist');
      }
      else{
        this.toastService.show(data.message,{classname: 'bg-danger text-light', delay: 15000});
      } 
   })    
  }
  }
}
