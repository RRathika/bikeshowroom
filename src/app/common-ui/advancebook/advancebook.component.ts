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
  showdata:any;
  role:any;
  submitted:boolean=false;
  constructor(private service:YamahaserviceService,private route:Router,private formbuilder:FormBuilder,public toastservice:ToastServiceService) { }
  
  advancebookForm:FormGroup=this.formbuilder.group({
  name: new FormControl('',[Validators.required]), 
  mobileNo: new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]), 
  gender: new FormControl('',[Validators.required]), 
  date: new FormControl('',[Validators.required]), 
  advanceAmount:new FormControl('',[Validators.required]), 
  paymentModeId:new FormControl('',[Validators.required]), 
  variantId:new FormControl('',[Validators.required]), 
  modelId: new FormControl('',[Validators.required]), 
  colorId:new FormControl('',[Validators.required]),
  showRoomId:new FormControl('',[Validators.required])
  });
  ngOnInit(): void {
    this.paymentmode();
    this.color();
    this.model();
    this.varient();
    this.showroomdata();
    this.role=localStorage.getItem('RoleId');
    this.advancebookForm.controls['colorId'].disable();
    this.advancebookForm.controls['variantId'].disable();
  }
  showroomdata(){
    this.service.getshowroom().subscribe(data=>{
      this.showdata=data;
    })
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
    this.advancebookForm.controls['colorId'].enable();
    this.service.selectmodel(model).subscribe(data=>{
      if(data.statusCode==200){  
        this.colorcode=[];
        this.varientcode=[];
        this.toastservice.show('Dont have related color Name', { classname: 'bg-danger text-light', delay: 3000 });       
      }
      else
      {
        this.colorcode=data;        
      }
    })    
  }
  colornamechange(e:any){
    this.advancebookForm.controls['variantId'].enable();
    let model=e.target.value;
    this.service.selectcolor(model).subscribe(data=>{
      if(data.statusCode==200){  
        this.varientcode=[];
        this.toastservice.show('Dont have related variant Name', { classname: 'bg-danger text-light', delay: 3000 });       
      }
      else
      {
        this.varientcode=data;
      }      
    })
  }
 
  submit(){
    if(this.role!=1){
    this.advancebookForm.patchValue({
      showRoomId:localStorage.getItem('ShowRoomId')
    })
    }
    console.log(this.advancebookForm.value);
    this.submitted=true;
    if(this.advancebookForm.valid)
    {
      this.service.saveadvancebokk(this.advancebookForm.value).subscribe(data=>{
        if(data.statusCode==200){
          this.toastservice.show(data.message, { classname: 'bg-success text-light', delay: 3000 });        
        this.advancebookForm.reset();
        }
        else{
          this.toastservice.show(data.message,{classname:'bg-danger text-light',delay:15000});
        }        
      })
    }    
  }
}
