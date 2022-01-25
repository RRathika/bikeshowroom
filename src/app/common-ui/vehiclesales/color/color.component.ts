import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colordata:any;
  bikemodeldata:any;
  variantId:any;
  result:any;
  constructor(private router:Router,private service:YamahaserviceService,private formBuilder: FormBuilder,public toastService: ToastServiceService) { }
  colorForm: FormGroup = this.formBuilder.group({
    colorId:0,
    modelId:new FormControl('',[Validators.required]),
    colorName:new FormControl('',[Validators.required]),
    colorCode:new FormControl('',[Validators.required])    
  })
  ngOnInit(): void {
    this.getcolor();
    this.getmodel();
    this.service.color.subscribe(data=>{
      this.result=data; 
      console.log(this.result);      
      this.variantId=this.result.colorId;
      if(data){        
        this.colorForm.patchValue(data);
      }
    })
  }
  getmodel(){
    this.service.getbikemodel().subscribe(data=>{
      this.bikemodeldata=data;
    })
  }
  getcolor(){
    this.service.getcolor().subscribe(data=>{
      this.colordata=data;      
    })
  }
  submit(){
    if(this.variantId){
      console.log("update");      
      this.service.updatecolor(this.colorForm?.value).subscribe(data=>{
        if(data.statusCode==200){
          this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 });   
          this.colorForm.reset();
          this.getcolor();
          }
          else{
            this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 }); 
          }        
      })
    }
    else{
      // console.log("save");
    this.service.savecolor(this.colorForm?.value).subscribe(data=>{
      if(data.statusCode==200){
      this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
      this.colorForm.reset();
      this.getcolor();   
      }
      else{
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 }); 
      }
    })
  }
  }
  Editcolor(id:any){
    this.service.getbyidcolor(id).subscribe(data=>{     
        this.service.color.next(data);
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
        this.service.deletecolor(id).subscribe(data=>{
          this.getcolor();
          console.log('delete');
        })        
      }
      else{
      console.log('cancel');
      }
    });
  }
}
