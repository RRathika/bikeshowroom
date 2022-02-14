import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-yard',
  templateUrl: './yard.component.html',
  styleUrls: ['./yard.component.css']
})
export class YardComponent implements OnInit {
   yarddata:any;
  constructor(private service:YamahaserviceService,private router:Router,private formbuilder:FormBuilder,public toastservice:ToastServiceService) { }
  yardForm:FormGroup=this.formbuilder.group({
    yardName:new FormControl(''),
    showroomNameId:new FormControl(''),
    mobileNo:new FormControl(''),
    address:new FormControl('') 
  });
  ngOnInit(): void {
    this.loadyard();
  }
  loadyard(){}
  submit(){

  }
}
