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
  page = 1;
  pageSize = 10;
  pagingNumber = 0;
  constructor(private service:YamahaserviceService,private router: Router,private formBuilder: FormBuilder,public toastService: ToastServiceService) { }
  bikemodelForm: FormGroup = this.formBuilder.group({
    modelId:0,
    vehicleType:new FormControl('',[Validators.required]),
    modelName:new FormControl('',[Validators.required]),
    modelCode:new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
    this.getbikemodel();
    this.service.bikemodel.subscribe(response=>{
      this.result=response; 
      this.modelId=this.result.modelId;
      if(response){        
        this.bikemodelForm.patchValue(response);
      }
    })
    
  }
  getbikemodel(){
      this.service.getbikemodel().subscribe(data=>{
        this.getbike=data;
        this.page = 1;
        this.pagingNumber = 0;
        this.pagingNumber = Math.ceil(this.getbike.length / (this.pageSize / 10));    
      })
  }
  submit(){
    if(this.modelId){
      this.service.updatebikemodel(this.bikemodelForm?.value).subscribe(data=>{
        this.statusCode=data.statusCode;
      if(this.statusCode==200){
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
        this.bikemodelForm.reset();
        this.getbikemodel()
      }
      else{
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 }); 
      }    
      })
    }
    else{
    this.service.savebikemodel(this.bikemodelForm?.value).subscribe(data=>{
      this.statusCode=data.statusCode;
      if(this.statusCode==200){
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
        this.bikemodelForm.reset();
        this.getbikemodel()
      }
      else{
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 }); 
      }    
    })
  }
  }
  bikemodeledit(id:any){
     this.service.getbyidmodel(id).subscribe(data=>{
      this.service.bikemodel.next(data);    
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
        })        
      }
      else{
      console.log('cancel');
      }
    });  
  }
}
