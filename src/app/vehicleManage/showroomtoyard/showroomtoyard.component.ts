import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-showroomtoyard',
  templateUrl: './showroomtoyard.component.html',
  styleUrls: ['./showroomtoyard.component.css']
})
export class ShowroomtoyardComponent implements OnInit {
  showroomdata: any;
  yardname: any;
  showroomId : any;
  yardId : any;
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
        this.getListByShowroomId(this.showroomId);
      }
    })
  }

  changeYard(event: any) {
    let data = event.target.value;
    this.yardId = data;
  }

  getListByShowroomId(showroomId: any) {
    this.service.listvehiclestock(showroomId,0,0).subscribe((data: any) => {
      if (data.statusCode == 200) {
        this.firstTable =[];
        this.toastservice.show("No Stocks Available", { classname: 'bg-danger text-light', delay: 3000 });
      }
      else {
        this.firstTable = data;
      }
    })
  }


  onSelect(data: any,vehicleStockId:any, chassisNo: any, engineNo: any, vehicleModelName: any,vehicleModelId:any, yardId: any) {
    if(this.yardId != undefined)
    {
      if (yardId == this.yardId) {
        this.toastservice.show("Cant move to the same yard", { classname: 'bg-danger text-light', delay: 3000 });
      }
      else {
        this.secondTable.push({
          vehicleStockId:vehicleStockId,
          chassisNo: chassisNo,
          engineNo: engineNo,
          fromShowRoomId:parseInt(this.showroomId),
          fromYardId:0,
          toYardId: parseInt(this.yardId),
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
    // console.log(serialNo,chassisNo,engineNo,vehicleModelName);
    // console.log(serialNo); 

    this.firstTable.push({
      vehicleStockId:vehicleStockId,
      chassisNo: chassisNo,
      engineNo: engineNo,
      fromShowRoomId:parseInt(this.showroomId),
      fromYardId:0,
      toYardId: parseInt(this.yardId),
      vehicleModelId:vehicleModelId,
      userCode:localStorage.getItem('UserCode'),
      vehicleModelName: vehicleModelName,
      yardId: yardId
    });


    this.secondTable = this.secondTable.filter(el => el !== serialNo);
    // this.addresses.splice(add,1);
    // console.log(this.secondTable);


    // console.log(this.secondTable);
  }

  save(){

    // if(this.secondTable)
    // {
      this.service.savestocktransfer(this.secondTable).subscribe((data:any)=>{
        if(data.statusCode==200){
          this.toastservice.show(data.message,{classname: 'bg-success text-light', delay: 3000});
         // this.stocktransferForm.reset();
        }
        // else
        // {
        //   this.toastservice.show('fill all field',{classname: 'bg-danger text-light', delay: 3000})
        // }
      })
    // }
  }

}
