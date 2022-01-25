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
  constructor(private router:Router,private service:YamahaserviceService,private formBuilder: FormBuilder,public toastService: ToastServiceService) { }
  variantForm: FormGroup = this.formBuilder.group({
    colorId:new FormControl('',[Validators.required]),
    variantId:0,
    variantName:new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
    this.loadcolor();
    this.loadvariant();
    this.service.variant.subscribe(data=>{
      this.result=data; 
      console.log(this.result);      
      this.variantId=this.result.variantId;
      if(data){        
        this.variantForm.patchValue(data);
      }
    })
  }
  loadcolor(){
    this.service.getcolor().subscribe(data=>{
      this.color=data;      
    })
  }
  loadvariant(){
    this.service.getvariant().subscribe(data=>{
      this.variant=data;
    })
  }
  Editcolor(id:any){
    this.service.getbyidvariant(id).subscribe(data=>{
      this.service.variant.next(data);
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
    if(this.variantId)
    {
      this.service.updatevariant(this.variantForm?.value).subscribe((data:any)=>{
        if(data.statusCode==200){
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
      this.variantForm.reset();
      this.loadvariant();
      }
      else{
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 }); 
      }
      })
    }
    else{
    if(this.variantForm.valid){
      this.service.savevariant(this.variantForm?.value).subscribe((data:any)=>{
        if(data.statusCode==200){
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
      this.variantForm.reset();
      this.loadvariant();
      }
      else{
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 }); 
      }
      })
    }
  }
  }
}
