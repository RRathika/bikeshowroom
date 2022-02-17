import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
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
  constructor(private service:YamahaserviceService,private router:Router,private formbuilder:FormBuilder,public toastservice:ToastServiceService) { }
  yardForm:FormGroup=this.formbuilder.group({
    yardName:new FormControl(''),
    showRoomId:new FormControl(''),
    mobileNo:new FormControl(''),
    address:new FormControl(''),
    yardId:0 
  });
  ngOnInit(): void {
    this.loadyard();
    this.showroom();
    this.service.yard.subscribe(data=>{
      this.result=data;
      console.log(this.result);
      this.yardId=this.result.yardId;
      this.yardForm.patchValue(data);
    })
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
    this.service.getbyidyard(id).subscribe(data=>{
      this.service.yard.next(data);
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
    if(this.yardId){
      if(this.yardForm.valid)
    {
      this.service.updateyard(this.yardForm.value).subscribe((data:any)=>{
        if(data.statusCode==200){
          this.toastservice.show(data.message,{classname: 'bg-success text-light', delay: 5000});
          this.yardForm.reset();
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
          this.loadyard();
        }
        else
        {
          this.toastservice.show(data.message,{classname: 'bg-danger text-light', delay: 5000});
        }
      })
    }
    else{
      this.toastservice.show("Fill All Field",{classname:'bg-danger text-light', delay:15000});
    }
  }
  }
}
