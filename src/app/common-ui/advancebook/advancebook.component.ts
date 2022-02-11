import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastServiceService } from 'src/app/toast-service.service';
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
  colorcode:any;
  selectedObject:any;
  constructor(private service:YamahaserviceService,private route:Router,private formbuilder:FormBuilder,public toastservice:ToastServiceService) { }
  
  advancebookForm:FormGroup=this.formbuilder.group({
  name: new FormControl('',[Validators.required]), 
  mobileNo: new FormControl('',[Validators.required]), 
  gender: new FormControl('',[Validators.required]), 
  date: new FormControl('',[Validators.required]), 
  advanceAmount:new FormControl('',[Validators.required]), 
  paymentModeId:new FormControl('',[Validators.required]), 
  variantId:new FormControl('',[Validators.required]), 
  modelId: new FormControl('',[Validators.required]), 
  colorId:new FormControl('',[Validators.required])
  });
  ngOnInit(): void {
    this.paymentmode();
    this.color();
    this.model();
    this.varient();
  }
  paymentmode(){
    this.service.getpaymentmode().subscribe(data=>{
      this.paymentoption=data;    
    })
  }
  color(){
    this.service.getcolor().subscribe(data=>{
      this.colorcode=data;
    })
  }
  model(){
    this.service.getbikemodel().subscribe(data=>{
      this.modelcode=data;
    })
  }
  varient(){
    this.service.getvariant().subscribe(data=>{
      this.varientcode=data;
    })
  }
  modelnamechange(e:any){
    let model=e.target.value;
    this.service.selectmodel(model).subscribe(data=>{
      if(data.statusCode==200){  
        this.colorcode=[];
        this.varientcode=[];
        this.toastservice.show('Dont have related color', { classname: 'bg-danger text-light', delay: 10000 });       
      }
      else
      {
        this.colorcode=data;        
      }
    })    
  }
  colornamechange(e:any){
    let model=e.target.value;
    this.service.selectcolor(model).subscribe(data=>{
      if(data.statusCode==200){  
        this.varientcode=[];
        this.toastservice.show('Dont have related variant', { classname: 'bg-danger text-light', delay: 10000 });       
      }
      else
      {
        this.varientcode=data;
      }      
    })
  }
 
  submit(){
    if(this.advancebookForm.valid)
    {
      this.service.saveadvancebokk(this.advancebookForm.value).subscribe(data=>{
        if(data.statusCode==200){
          this.toastservice.show(data.message, { classname: 'bg-success text-light', delay: 10000 });        
        this.advancebookForm.reset();
        }
        else{
          this.toastservice.show(data.message,{classname:'bg-danger text-light',delay:15000});
        }        
      })
    }    
  }
}
