import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-yardtoyard',
  templateUrl: './yardtoyard.component.html',
  styleUrls: ['./yardtoyard.component.css']
})
export class YardtoyardComponent implements OnInit {

  showroomdata: any;
  yardname: any;
  showroomId : any;
  fromYardId : any;
  toYardId : any;
  public firstTable: any[] = [];
  public secondTable: any[] = [];
  // isshow:boolean=false;
  constructor(private service: YamahaserviceService, private formbuilder: FormBuilder, private router: Router, public toastservice: ToastServiceService, private toastService: ToastServiceService) { }

  ngOnInit(): void {
    this.showroom();
    
  }

  showroom() {
    this.service.getshowroom().subscribe((data: any) => {
      this.showroomdata = data
    })
  }

  changeShowroom(e: any) {
    this.yardname = [];
    let data = e.target.value;
    this.showroomId = data;
    this.service.showroombyyard(data).subscribe(data => {
      if (data.statusCode == 200) {
        this.yardname = [];
        this.toastService.show("No Yard for this Showroom", { classname: 'bg-danger text-light', delay: 5000 });
      }
      else {
        this.yardname = data;
      }
    })
  }

  changeFromYard(event: any) {
    let data = event.target.value;
    this.fromYardId = data;
      this.getListByShowroomId(this.showroomId,this.fromYardId);

  }

  changeToYard(event: any) {
    let data = event.target.value;
    this.toYardId = data;
  }

  getListByShowroomId(showroomId: any,yardId:any) {
    this.service.listvehiclestock(showroomId,0, yardId).subscribe((data: any) => {
      if (data.statusCode == 200) {
        this.firstTable =[];
        this.toastservice.show("No Stocks Available", { classname: 'bg-danger text-light', delay: 10000 });
      }
      else {
        this.firstTable = data;
      }
    })
  }


  onSelect(data: any,vehicleStockId:any, chassisNo: any, engineNo: any, vehicleModelName: any,vehicleModelId:any, yardId: any) {
    if(this.toYardId != undefined && this.fromYardId != undefined)
    {
      if (yardId == this.toYardId) {
        this.toastservice.show("Cant move to the same yard", { classname: 'bg-danger text-light', delay: 10000 });
      }
      else {
        this.secondTable.push({
          vehicleStockId:vehicleStockId,
          chassisNo: chassisNo,
          engineNo: engineNo,
          fromShowRoomId:parseInt(this.showroomId),
          fromYardId:0,
          toYardId: parseInt(this.toYardId),
          vehicleModelId:vehicleModelId,
          userCode:localStorage.getItem('UserCode'),
          vehicleModelName: vehicleModelName,
          yardId: yardId
        });
    
        this.firstTable = this.firstTable.filter((el: any) => el !== data);
      }
    }


  }


  onDelect(serialNo: any,vehicleStockId:any, chassisNo: any, engineNo: any, vehicleModelName: any,vehicleModelId:any, yardId: any) {

    this.firstTable.push({
      vehicleStockId:vehicleStockId,
      chassisNo: chassisNo,
      engineNo: engineNo,
      fromShowRoomId:parseInt(this.showroomId),
      fromYardId:0,
      toYardId: parseInt(this.toYardId),
      vehicleModelId:vehicleModelId,
      userCode:localStorage.getItem('UserCode'),
      vehicleModelName: vehicleModelName,
      yardId: yardId
    });


    this.secondTable = this.secondTable.filter(el => el !== serialNo);
    // this.addresses.splice(add,1);


  }

  save(){

    // if(this.secondTable)
    // {
      this.service.savestocktransfer(this.secondTable).subscribe((data:any)=>{
        if(data.statusCode==200){
          this.toastservice.show(data.message,{classname: 'bg-success text-light', delay: 10000});
         // this.stocktransferForm.reset();
        }
        // else
        // {
        //   this.toastservice.show('fill all field',{classname: 'bg-danger text-light', delay: 10000})
        // }
      })
    // }
  }

}
