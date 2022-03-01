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
  p: number = 1;
  count: number = 10;
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
          console.log('delete');
        })        
      }
      else{
      console.log('cancel');
      }
    });
  }
  submit(){
    this.submitted=true;
    if(this.yardId){
      if(this.yardForm.valid)
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
    if(this.yardForm.valid)
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
  }
  listdisplay(){
    this.displayadd=false;
  }
}
