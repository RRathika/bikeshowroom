import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-stocktransfer',
  templateUrl: './stocktransfer.component.html',
  styleUrls: ['./stocktransfer.component.css']
})
export class StocktransferComponent implements OnInit {
  bikemodelname:any;
  showroomdata:any;
  chassisdata:any;
  enginedata:any;
  constructor(private service:YamahaserviceService,private formbuilder:FormBuilder,private router:Router,public toastservice:ToastServiceService) { }
  stocktransferForm:FormGroup=this.formbuilder.group({
    vehicleStockId: 0,
    date: new FormControl('',[Validators.required]),
    chassisNo: new FormControl('',[Validators.required]),
    engineNo: new FormControl('',[Validators.required]),
    fromShowRoomId: new FormControl('',[Validators.required]),
    toShowRoomId: new FormControl('',[Validators.required]),
    vehicleModelId: new FormControl('',[Validators.required]),
    userCode: "YAMAHA001"  
  })
  ngOnInit(): void {
    this.modelname();
    this.showroom();
    this.chassisno();
    this.engineno();
  }
  chassisno(){
    this.service.getchassisno().subscribe(data=>{
      this.chassisdata=data;
    })
  }
  engineno(){
    this.service.getengineno().subscribe(data=>{
      this.enginedata=data;
    })
  }
  modelname(){  
    this.service.getbikemodel().subscribe(data=>{
      this.bikemodelname=data;
    })
  }
  showroom(){
    this.service.getshowroom().subscribe(data=>{
      this.showroomdata=data
    })
  }
  submit(){
    if(this.stocktransferForm.valid)
    {
      this.service.savestocktransfer(this.stocktransferForm.value).subscribe((data:any)=>{
        if(data.statusCode==200){
          this.toastservice.show(data.message,{classname: 'bg-success text-light', delay: 10000});
          this.stocktransferForm.reset();
        }
        else
        {
          this.toastservice.show('fill all field',{classname: 'bg-danger text-light', delay: 10000})
        }
      })
    }
  }
}
