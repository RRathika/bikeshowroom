import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.css']
})
export class VariantComponent implements OnInit {
  color:any;
  variant:any;
  result: any;
  variantId:any;
  igstp:any;
  cgstp:any;
  sgstp : any;
  solution:any;
  total:number=0;
  p: number = 1;
  count: number = 10;
  submitted:boolean = false;
  displayadd:boolean=false;
  currentModel:number=1;
  constructor(private router:Router,private service:YamahaserviceService,private formBuilder: FormBuilder,public toastService: ToastServiceService) { }
  variantForm: FormGroup = this.formBuilder.group({
    colorId:new FormControl('',[Validators.required]),
    variantId:0,
    variantCode:new FormControl('',[Validators.required]),
    variantName:new FormControl('',[Validators.required]),
    yearsOfWarranty:new FormControl('',[Validators.required]),
    oilChange:new FormControl('',[Validators.required]),
    currentModel:new FormControl(1),
    hsnCode:new FormControl('',[Validators.required]),
    invoiceAmount:new FormControl('',[Validators.required]),
    lifeTax:new FormControl('',[Validators.required]),
    insurance:new FormControl('',[Validators.required]),
    dealerRate:new FormControl('',[Validators.required]),
    igst:new FormControl('',[Validators.required]),
    cgst:new FormControl('',[Validators.required]),
    sgst:new FormControl('',[Validators.required]),
    total:new FormControl('',[Validators.required]),
    hrFee: 0,
    hypCharges: 0,
    extraCharges: 0,
    otherCharges: 0,
  })
  ngOnInit(): void {
    this.loadcolor();
    this.loadvariant();
    this.variantForm.controls['total'].disable();
   
  }
  loadcolor(){
    this.service.getcolor().subscribe((data:any[])=>{
      this.color=data;      
      console.log(this.color);
      
    })
  }
  loadvariant(){
    this.service.getvariant().subscribe(data=>{
      this.variant=data;
    })
  }
  Editcolor(id:any){
    this.displayadd=true;
    this.service.getbyidvariant(id).subscribe(data=>{
      this.service.variant.next(data);
      this.service.variant.subscribe(data=>{
        this.result=data; 
        // console.log(this.result);      
        this.variantId=this.result.variantId;
        // console.log(this.variantId);
        
        if(data){        
          this.variantForm.patchValue(data);
        }
      })    
    })
  }
  Delete(id:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons.fire(
    {
      showCloseButton: true,
      title: 'Are you sure?',
      text: 'You want to delete this?',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      reverseButtons: false
    }
    ).then((result) => {
      if (result.value) {
        this.service.deletevariant(id).subscribe(data=>{
          this.loadvariant();
          console.log('delete');
        })        
      }
      else{
      console.log('cancel');
      }
    });
  }
  submit(){ 
     
    if(this.variantForm.value['hrFee']==null)
    {
      this.variantForm.patchValue({
        hrFee:0
      })
    }
    if(this.variantForm.value['hypCharges']==null)
    {
      this.variantForm.patchValue({
        hypCharges:0
      })
    }
    if(this.variantForm.value['otherCharges']==null)
    {
      this.variantForm.patchValue({
        otherCharges:0
      })
    }
    if(this.variantForm.value['extraCharges']==null)
    {
      this.variantForm.patchValue({
        extraCharges:0
      })
    }
    if(this.variantForm.value['currentModel']==null)
    {
      this.variantForm.patchValue({
        currentModel:1
      })
    }
    console.log(this.variantForm.value);
    this.submitted=true;
    if(this.variantForm.valid)
    {
    if(this.variantId)
    {
      this.service.updatevariant(this.variantForm?.value).subscribe((data:any)=>{
        if(data.statusCode==200){
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
      this.variantForm.reset();
      this.displayadd=false;
      this.loadvariant();
      }
      else{
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 }); 
      }
      })
    }
    else{   
      this.variantForm.value['total']=this.total;
      this.service.savevariant(this.variantForm?.value).subscribe((data:any)=>{
        if(data.statusCode==200){
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
      this.variantForm.reset();
      this.displayadd=false;
      this.loadvariant();
      }
      else{
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 }); 
      }
      })    
  }
  }
  }
  amount(amount:any)
  {
    console.log(amount.target.value);    
    this.variantForm.patchValue({
      Total:amount.target.value()
    })
  }
  sum1()
  {
    this.solution=this.variantForm.value['invoiceAmount']+this.variantForm.value['lifeTax']+this.variantForm.value['insurance']+this.variantForm.value['hrFee']+this.variantForm.value['hypCharges']+this.variantForm.value['extraCharges']+this.variantForm.value['otherCharges'];
    this.total=this.solution;
  }
  sum2()
  {
    this.solution=this.variantForm.value['invoiceAmount']+this.variantForm.value['lifeTax']+this.variantForm.value['insurance']+this.variantForm.value['hrFee']+this.variantForm.value['hypCharges']+this.variantForm.value['extraCharges']+this.variantForm.value['otherCharges'];
    this.total=this.solution;
  }
  sum3()
  {
    this.solution=this.variantForm.value['invoiceAmount']+this.variantForm.value['lifeTax']+this.variantForm.value['insurance']+this.variantForm.value['hrFee']+this.variantForm.value['hypCharges']+this.variantForm.value['extraCharges']+this.variantForm.value['otherCharges'];
    this.total=this.solution;
  }
  sum4()
  {
    this.solution=this.variantForm.value['invoiceAmount']+this.variantForm.value['lifeTax']+this.variantForm.value['insurance']+this.variantForm.value['hrFee']+this.variantForm.value['hypCharges']+this.variantForm.value['extraCharges']+this.variantForm.value['otherCharges'];
    this.total=this.solution;
  }
  sum5()
  {
    this.solution=this.variantForm.value['invoiceAmount']+this.variantForm.value['lifeTax']+this.variantForm.value['insurance']+this.variantForm.value['hrFee']+this.variantForm.value['hypCharges']+this.variantForm.value['extraCharges']+this.variantForm.value['otherCharges'];
    this.total=this.solution;
  }
  sum6()
  {
    this.solution=this.variantForm.value['invoiceAmount']+this.variantForm.value['lifeTax']+this.variantForm.value['insurance']+this.variantForm.value['hrFee']+this.variantForm.value['hypCharges']+this.variantForm.value['extraCharges']+this.variantForm.value['otherCharges'];
    this.total=this.solution;
  }
  sum7()
  {
    this.solution=this.variantForm.value['invoiceAmount']+this.variantForm.value['lifeTax']+this.variantForm.value['insurance']+this.variantForm.value['hrFee']+this.variantForm.value['hypCharges']+this.variantForm.value['extraCharges']+this.variantForm.value['otherCharges'];
    this.total=this.solution;
  }
  igst(igstvalue:any){   
    console.log(igstvalue);    
    this.igstp=(this.variantForm.value['invoiceAmount']*(igstvalue/100));
    this.total=this.total+this.igstp;
    console.log(this.total);    
  }
  cgst(cgstvalue:any){
    console.log(cgstvalue);    
    this.igstp=(this.variantForm.value['invoiceAmount']*(cgstvalue/100));
    this.total=this.total+this.igstp;
    console.log(this.total);
  }
  sgst(sgstvalue:any){
    console.log(sgstvalue);    
    this.igstp=(this.variantForm.value['invoiceAmount']*(sgstvalue/100));
    this.total=this.total+this.igstp;
    console.log(this.total);
  }
  ngonchange2(e:any)
  {
    this.cgstp=this.variantForm.value['cgst'];
    if(this.cgstp!='')
    {
    this.cgst(this.cgstp);
    }
  }
  ngonchange3(e:any)
  {
    this.sgstp=this.variantForm.value['sgst'];
    if(this.sgstp!='')
    {
    this.cgst(this.cgstp);
    }
  }
  ngonchange1(e:any)
  {
    console.log("onchange");    
    this.igstp=this.variantForm.value['igst'];  
    if(this.igstp!='')
    {
    this.igst(this.igstp);
    }
  }
  display(){    
    this.displayadd=true;
    this.service.variant.next('');
    this.variantForm.reset();
    this.submitted=false;
  }
  listdisplay(){
    this.displayadd=false;
  }
  changemodel(e:any){
    console.log(e.target.value);   
    this.variantForm.patchValue({
      currentModel:0
    })
    console.log(this.variantForm.value['currentModel']);
    
  }
}
