import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usercode:any;
  macadd: any;
  result:any;
  userId: any;
  role:any;
  showroom:any;
  submitted:boolean=false;
  constructor(private service:YamahaserviceService,private formbuilder:FormBuilder,private route:Router,public toastservice:ToastServiceService) {}
  registerForm:FormGroup=this.formbuilder.group({
    userCode: new FormControl('',[Validators.required]), 
    userName: new FormControl('',[Validators.required]),
    mobileNo: new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    gender: new FormControl('',[Validators.required]),
    dob: new FormControl('',[Validators.required]),
    place: new FormControl('',[Validators.required]), 
    macAddress: new FormControl('',[Validators.required]),
    roleId:new FormControl('',[Validators.required]),
    showRoomId:new FormControl('',[Validators.required])
  });
  ngOnInit(): void {
    this.loadrole();
    this.loadshowroom();
    this.registerForm.controls['showRoomId'].disable();
     if(this.service.user.value=='')
    {
    this.loadusercode();
    this.loadmacaddress();
    }
    else{
    this.service.user.subscribe(response=>{
      this.result=response; 
     this.userId=this.result.userCode;
     this.usercode=this.result.userCode;
      if(response){        
        this.registerForm.patchValue(response);
      }
    })
  }
  }
  loadshowroom(){
    this.service.getshowroom().subscribe(data=>{
      this.showroom=data;
    })
  }
  loadrole(){
    this.service.getrolemaster().subscribe(data=>{
      this.role=data;
    })
  }
  loadusercode(){
    this.service.getusercode().subscribe(data=>{
      this.usercode=data;
      this.registerForm.patchValue({
        userCode: this.usercode}); 
    })
  }
  changeshowroom(e:any){
    if(e.target.value!=1){
      this.registerForm.controls['showRoomId'].enable();
    }
    else{
      this.registerForm.controls['showRoomId'].disable();
      this.registerForm.value['showRoomId']=0;
    }
  }
  loadmacaddress(){
    this.service.getmacaddress().subscribe(data=>{
      this.macadd=data;
      this.registerForm.patchValue({
        macAddress: this.macadd});
    })
  }
  submit(){
    this.submitted=true
    if(this.service.user.value=='')
    {
    if(this.registerForm.valid){
    this.service.saveregister(this.registerForm.value).subscribe((data:any)=>{
      if(data.statusCode==200)
      {
        alert("This is your password: "+data.message);
        this.registerForm.reset();
      }
      else{
        this.toastservice.show(data.message,{classname: 'bg-danger text-light', delay: 15000});
      }      
    })
  }
}
else
{
  // console.log(this.registerForm.value);
  if(this.registerForm.valid){
    this.service.updateuserdetail(this.registerForm.value).subscribe((data:any)=>{
      if(data.statusCode==200)
      {
        this.toastservice.show(data.message,{classname: 'bg-success text-light', delay: 15000});
        this.registerForm.reset();
      }
      else{
        this.toastservice.show(data.message,{classname: 'bg-danger text-light', delay: 15000});
      }      
    })
  }
}
  }

}
