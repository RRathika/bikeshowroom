import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    this.isdisable=true;
    this.loadadvancebook();
    this.loadname();
    this.loadmodelname();
  }
  loadadvancebook(){
    this.service.getadvancebook().subscribe(data=>{
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
  apply(id:any){
    // console.log(id);
    this.customerDetailForm.patchValue({receiptNos:id});
  }
  shift(){
    this.permanentaddressForm.patchValue(this.presentaddressForm.value);
  }
  onChange(e:any){
  
  if(e.value==1)
  {
    this.customerDetailForm.controls['receiptNos'].enable();
    this.isdisable=false;
  }
  else
  {
    this.customerDetailForm.controls['receiptNos'].disable();
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
