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
  constructor(private service:YamahaserviceService,private formbuilder:FormBuilder,private route:Router,public toastservice:ToastServiceService) {}
  registerForm:FormGroup=this.formbuilder.group({
    userCode: new FormControl('',[Validators.required]), 
    userName: new FormControl('',[Validators.required]),
    mobileNo: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    dob: new FormControl('',[Validators.required]),
    place: new FormControl('',[Validators.required]), 
    macAddress: new FormControl('',[Validators.required]),
    roleId:new FormControl('',[Validators.required])
  });
  ngOnInit(): void {
    this.loadrole();
     if(this.service.user.value=='')
    {
    this.loadusercode();
    this.loadmacaddress();
    }
    else{
    this.service.user.subscribe(response=>{
      this.result=response; 
     this.userId=this.result.userId;
     this.usercode=this.result.userCode;
      if(response){        
        this.registerForm.patchValue(response);
      }
    })
  }
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
  loadmacaddress(){
    this.service.getmacaddress().subscribe(data=>{
      this.macadd=data;
      this.registerForm.patchValue({
        macAddress: this.macadd});
    })
  }
  submit(){
    
    // console.log(this.registerForm.value);
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
