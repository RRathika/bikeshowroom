import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-vehiclestock',
  templateUrl: './vehiclestock.component.html',
  styleUrls: ['./vehiclestock.component.css']
})
export class VehiclestockComponent implements OnInit {  
  bikemodelname:any;
  vehiclestock:any;
  showroomdata:any;
  constructor(private service:YamahaserviceService,private router:Router,public toastservice:ToastServiceService,private formbuilder:FormBuilder) { }
  stockForm:FormGroup=this.formbuilder.group({
    ShowRoomId:new FormControl('',[Validators.required]),
    VehicleModelId:new FormControl('',[Validators.required])
  });
  ngOnInit(): void {
    this.modelname();
    this.showroom();
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
    if(this.stockForm.valid){
      this.service.listvehiclestock(this.stockForm.value['ShowRoomId'],this.stockForm.value['VehicleModelId'],0).subscribe((data:any)=>{
        if(data.statusCode==200)
        {
          this.toastservice.show(data.message,{ classname: 'bg-danger text-light', delay: 10000 });
        }
        else
        {          
         this.vehiclestock=data;
        }
      })
    }
  }
}
