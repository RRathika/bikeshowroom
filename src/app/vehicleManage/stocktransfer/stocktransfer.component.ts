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
  selectedDevice:any;
  show: any;
  role: any;
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
    this.show=localStorage.getItem('ShowRoomId');
    this.role=localStorage.getItem('RoleId');
    this.modelname();
    this.showroom();
    this.chassisno(this.role,this.show);
    this.engineno(this.role,this.show);
  }
  chassisno(role:any,show:any){
    this.service.getchassisno(role,show).subscribe((data:any)=>{
      this.chassisdata=data;
    })
  }
  engineno(role:any,show:any){
    this.service.getengineno(role,show).subscribe(data=>{
      this.enginedata=data;
    })
  }
  modelname(){  
    this.service.getbikemodel().subscribe((data:any[])=>{
      this.bikemodelname=data;
    })
  }
  showroom(){
    this.service.getshowroom().subscribe((data:any)=>{
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
  chassisnoSelected(e:any)
  {
    let value=e.target.value;
    this.service.selectchassisno(value).subscribe((data:any)=>{
      this.stocktransferForm.patchValue({
        engineNo:data.engineNo,
        vehicleModelId:data.vehicleModelId,
        fromShowRoomId:data.fromShowRoomId
      })
    })   
  }
  enginenoSelected(e:any){
    let value=e.target.value;
    this.service.selectengineno(value).subscribe((data:any)=>{
      this.stocktransferForm.patchValue({
        chassisNo:data.chassisNo,
        vehicleModelId:data.vehicleModelId,
        fromShowRoomId:data.fromShowRoomId
      })
    }) 
  }
}
