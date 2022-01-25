import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
@Component({
  selector: 'app-vendoradd',
  templateUrl: './vendoradd.component.html',
  styleUrls: ['./vendoradd.component.css']
})
export class VendoraddComponent implements OnInit {
  result:any;
  vendorId: any;
  constructor(private router:Router,private service:YamahaserviceService,private formBuilder:FormBuilder,public toastService: ToastServiceService ) { }
  vendorForm: FormGroup = this.formBuilder.group({
    vendorId:0,
    date:new FormControl('',[Validators.required]),
    companyName:new FormControl('',[Validators.required]),
    companyAddress:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required]),
    country:new FormControl('',[Validators.required]),
    zipCode:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required]),
    fax:new FormControl('',[Validators.required]),
    insured:new FormControl('',[Validators.required]),
    bonded:new FormControl('',[Validators.required]),
    licensed:new FormControl('',[Validators.required]),
    licenseNumber:new FormControl('',[Validators.required]),
    products:new FormControl('',[Validators.required]),
    services:new FormControl('',[Validators.required]),
    additionalComments:new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
    this.service.vendor.subscribe(data=>{
      this.result=data; 
      // console.log(this.result);      
      this.vendorId=this.result.vendorId;
      if(data){        
        this.vendorForm.patchValue(data);
        let part=data.date.split('T00:00:00');     
        let parts=part[0];
        this.vendorForm.patchValue({
          date:parts
        })
      }
    })
  }
  submit(){ 
    if(this.vendorId){
      this.service.updatevendor(this.vendorForm?.value).subscribe(data=>{
        if(data.statusCode==200)
        {
          this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
          this.vendorForm.reset();
        }
        else{
          this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 }); 
        }
      })
    }
    else{
    this.service.savevendor(this.vendorForm?.value).subscribe(data=>{
      if(data.statusCode==200)
      {
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
        this.vendorForm.reset();
      }
      else{
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 }); 
      }
      // this.vendorForm.reset();
    })
  }
  }
}
