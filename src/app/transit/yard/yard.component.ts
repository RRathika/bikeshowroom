import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-yard',
  templateUrl: './yard.component.html',
  styleUrls: ['./yard.component.css']
})
export class YardComponent implements OnInit {
   yarddata:any;
   showroomdata:any;
   result:any;
   yardId:any;
   submitted:boolean = false;
  displayadd:boolean=false;
  showcheck:boolean=false;
  p: number = 1;
  count: number = 10;
  selectedQuantity = 0;
  constructor(private service:YamahaserviceService,private router:Router,private formbuilder:FormBuilder,public toastservice:ToastServiceService) { }
  yardForm:FormGroup=this.formbuilder.group({
    yardName:new FormControl('',[Validators.required]),
    showRoomId:new FormControl('',[Validators.required]),
    mobileNo:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    address:new FormControl('',[Validators.required]),
    yardId:0 
  });
  ngOnInit(): void {
    this.loadyard();
    this.showroom();   
  }
  loadyard(){
    this.service.getyard().subscribe(data=>{
      this.yarddata=data;
    })
  }
  showroom(){
    this.service.getshowroom().subscribe(data=>{
      this.showroomdata=data;
    })
  }
  edityard(id:any){
    this.displayadd=true;
    this.service.getbyidyard(id).subscribe(data=>{
      this.service.yard.next(data);
      this.service.yard.subscribe(data=>{
        this.result=data;
        console.log(this.result);
        if(this.result.showRoomId > 0){          
        this.showcheck=false; 
        }
        this.yardId=this.result.yardId;
        this.yardForm.patchValue(data);
      })
    })
  }
  delete(id:any){
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
        this.service.deleteyard(id).subscribe(data=>{
          this.loadyard();
          if(data.statusCode==200)
          {
          this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 5000 });
          }
        })        
      }
      else{
      console.log('cancel');
      }
    });
  }
  showroomchange(e:any){
  this.showcheck=false;
  }
  submit(){
    this.submitted=true;
    if(this.yardForm.value['showRoomId'] == 0){
      this.showcheck = true;
    }
    
    if(this.yardId){
      if(this.yardForm.valid && this.yardForm.value['showRoomId']!=0)
    {
      this.service.updateyard(this.yardForm.value).subscribe((data:any)=>{
        if(data.statusCode==200){
          this.toastservice.show(data.message,{classname: 'bg-success text-light', delay: 5000});
          this.yardForm.reset();
          this.displayadd=false;
          this.loadyard();
        }
        else
        {
          this.toastservice.show(data.message,{classname: 'bg-danger text-light', delay: 5000});
        }
      })
    }
    }
    else{
    if(this.yardForm.valid && this.yardForm.value['showRoomId']!=0)
    {
      this.service.saveyard(this.yardForm.value).subscribe((data:any)=>{
        if(data.statusCode==200){
          this.toastservice.show(data.message,{classname: 'bg-success text-light', delay: 5000});
          this.yardForm.reset();
          this.displayadd=false;
          this.loadyard();
        }
        else
        {
          this.toastservice.show(data.message,{classname: 'bg-danger text-light', delay: 5000});
        }
      })
    }    
  }
  }
  display(){    
    this.displayadd=true;
    this.service.yard.next('');
    this.yardForm.reset();
    this.submitted=false;
    this.selectedQuantity = 0;
  }
  listdisplay(){
    this.displayadd=false;
  }
}
