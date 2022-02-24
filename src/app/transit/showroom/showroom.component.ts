import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css']
})
export class ShowroomComponent implements OnInit {
  showdata:any;
  result: any;
  showRoomId:any;
  submitted = false;
  displayadd:boolean=false;
  p: number = 1;
  count: number = 10;
  // phoneNumber = "^(\+\d{1,3}[- ]?)?\d{10}$";
  constructor(private router:Router,private service:YamahaserviceService,private formbuilder:FormBuilder,public toastservice:ToastServiceService) { }
  showroomForm:FormGroup=this.formbuilder.group({
  showRoomName:new FormControl('',[Validators.required]),
  address: new FormControl('',[Validators.required]),
  mobileNo:new FormControl('',[Validators.required]),
  showRoomId:0
  })
  ngOnInit(): void {
    this.loaddata(); 
  }
  loaddata(){
    this.service.getshowroom().subscribe(data=>{
      this.showdata=data;
    })
  }
  submit(){
    this.submitted = true;
    if(this.showRoomId)
    {
      if(this.showroomForm.valid){
        this.service.updateshowroom(this.showroomForm.value).subscribe((data:any)=>{
         if(data.statusCode==200)
         {
          this.toastservice.show(data.message, { classname: 'bg-success text-light', delay: 5000 }); 
          this.showroomForm.reset();
          this.displayadd=false;
          this.loaddata();
         }
         else{
          this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 5000 }); 
         }
        })
      }
    }
    else{
    console.log(this.showroomForm.value);
    if(this.showroomForm.valid){
      this.service.saveshowroom(this.showroomForm.value).subscribe((data:any)=>{
       if(data.statusCode==200)
       {
        this.toastservice.show(data.message, { classname: 'bg-success text-light', delay: 5000 }); 
        this.showroomForm.reset();
        this.displayadd=false;
        this.loaddata();
       }
       else{
        this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 5000 }); 
       }
      })
    }
  }
  }
  editshowroom(id:any){
    this.displayadd=true;
    this.service.getbyidshowroom(id).subscribe(data=>{
      this.service.showroom.next(data);
      this.service.showroom.subscribe(data=>{
        this.result=data; 
        this.showRoomId=this.result.showRoomId;
      console.log(this.result);
        if(data){        
          this.showroomForm.patchValue(data);
        }
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
        this.service.deleteshowroom(id).subscribe(data=>{
          this.loaddata();
          console.log('delete');
        })        
      }
      else{
      console.log('cancel');
      }
    });
  }
  display(){    
    this.displayadd=true;
    this.service.showroom.next('');
    this.showroomForm.reset();
  }
  listdisplay(){
    this.displayadd=false;
  }
}
