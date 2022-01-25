import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usercode:any;
  constructor(private service:YamahaserviceService,private formbuilder:FormBuilder,private route:Router) {}
  registerForm:FormGroup=this.formbuilder.group({
    userCode: new FormControl('',[Validators.required]), 
    name: new FormControl('',[Validators.required]),
    mobileNo: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    dob: new FormControl('',[Validators.required]),
    place: new FormControl('',[Validators.required]), 
    macAddress: new FormControl('',[Validators.required])
  });
  ngOnInit(): void {
    this.loadusercode();
  }
  loadusercode(){
    this.service.getusercode().subscribe(data=>{
      this.usercode=data;
    })
  }
  submit(){

  }

}
