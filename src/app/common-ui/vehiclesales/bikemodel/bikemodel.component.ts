import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
// import { data } from 'jquery';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bikemodel',
  templateUrl: './bikemodel.component.html',
  styleUrls: ['./bikemodel.component.css']
})
export class BikemodelComponent implements OnInit {
  getbike:any;
  statusCode:any;
  result:any;
  modelId:any;
  p: number = 1;
  count: number = 10;
  submitted:boolean = false;
  displayadd:boolean=false;
  selectedQuantity=0
  constructor(private service:YamahaserviceService,private router: Router,private formBuilder: FormBuilder,public toastService: ToastServiceService) { }
  bikemodelForm: FormGroup = this.formBuilder.group({
    modelId:0,
    vehicleType:new FormControl('',[Validators.required]),
    modelName:new FormControl('',[Validators.required]),
    modelCode:new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
    this.getbikemodel(); 
    
  }
  getbikemodel(){
      this.service.getbikemodel().subscribe(data=>{
        this.getbike=data;
         
      })
  }
  submit(){
    this.submitted=true;
    if(this.bikemodelForm.valid)
    {
    if(this.modelId){
      this.service.updatebikemodel(this.bikemodelForm?.value).subscribe(data=>{
        this.statusCode=data.statusCode;
      if(this.statusCode==200){
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 3000 }); 
        this.bikemodelForm.reset();
        this.displayadd=false;
        this.getbikemodel()
      }
      else{
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 5000 }); 
      }    
      })
    }
    else{
    this.service.savebikemodel(this.bikemodelForm?.value).subscribe(data=>{
      this.statusCode=data.statusCode;
      if(this.statusCode==200){
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 3000 }); 
        this.bikemodelForm.reset();
        this.displayadd=false;
        this.getbikemodel()
      }
      else{
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 5000 }); 
      }    
    })
  }
}
  }
  bikemodeledit(id:any){
    this.displayadd=true;
     this.service.getbyidmodel(id).subscribe(data=>{
      this.service.bikemodel.next(data);    
      this.service.bikemodel.subscribe(response=>{
        this.result=response; 
        this.modelId=this.result.modelId;
        if(response){        
          this.bikemodelForm.patchValue(response);
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
        this.service.deletebikemodel(id).subscribe(data=>{
          this.getbikemodel();
          if(data.statusCode==200)
          {
          this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 5000 });
          }
        })        
      }
      else{
      console.log('cancel');
      }
    });  
  }
  display(){    
    this.displayadd=true;
    this.service.bikemodel.next('');
    this.bikemodelForm.reset();
    this.submitted=false;
  }
  listdisplay(){
    this.displayadd=false;
  }
}
