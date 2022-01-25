import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { data } from 'jquery';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-advancebook',
  templateUrl: './advancebook.component.html',
  styleUrls: ['./advancebook.component.css']
})
export class AdvancebookComponent implements OnInit {
  paymentoption:any;
  varientcode:any;
  modelcode:any;
  constructor(private service:YamahaserviceService,private route:Router,private formbuilder:FormBuilder) { }
  
  advancebookForm:FormGroup=this.formbuilder.group({
  name: new FormControl('',[Validators.required]), 
  mobileNo: new FormControl('',[Validators.required]), 
  gender: new FormControl('',[Validators.required]), 
  date: new FormControl('',[Validators.required]), 
  advanceAmount:new FormControl('',[Validators.required]), 
  paymentModeId:new FormControl('',[Validators.required]), 
  variantId:new FormControl('',[Validators.required]), 
  modelId: new FormControl('',[Validators.required]) 

  });
  ngOnInit(): void {
    this.paymentmode();
    this.varient();
    this.model();
  }
  paymentmode(){
    this.service.getpaymentmode().subscribe(data=>{
      this.paymentoption=data;    
    })
  }
  varient(){
    this.service.getcolor().subscribe(data=>{
      this.varientcode=data;
    })
  }
  model(){
    this.service.getbikemodel().subscribe(data=>{
      this.modelcode=data;
    })
  }
  submit(){
    if(this.advancebookForm.valid)
    {
      this.service.saveadvancebokk(this.advancebookForm.value).subscribe(data=>{
        // if(data.statusCode==200){
        //   this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
        console.log(data);
        this.advancebookForm.reset();        
      })
    }    
  }
}
