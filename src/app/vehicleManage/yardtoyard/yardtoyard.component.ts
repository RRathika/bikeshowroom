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
  showroomId: any;
  fromYardId: any = '';
  toYardId: any = '';
  public firstTable: any[] = [];
  public secondTable: any[] = [];
  yardBtnDisabled: boolean = false;
  constructor(private service: YamahaserviceService, private formbuilder: FormBuilder, private route: Router, public toastservice: ToastServiceService, private toastService: ToastServiceService) { }

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
    this.firstTable = [];
    this.secondTable = [];
    this.fromYardId = '';
    this.toYardId = '';
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
    this.secondTable = [];
    let data = event.target.value;
    this.fromYardId = data;
    if (this.fromYardId != 'Select') {
      this.yardBtnDisabled = false;
      this.getListByShowroomId(this.showroomId, this.fromYardId);
    }
    else {
      this.firstTable = [];
      this.secondTable = [];
    }
  }

  changeToYard(event: any) {
    this.secondTable = [];
    let data = event.target.value;
    this.toYardId = data;
    if (this.toYardId != 'Select') {
      if (this.fromYardId == this.toYardId) {
        this.toastservice.show("From Yard & To Yard should not be same", { classname: 'bg-danger text-light', delay: 3000 });
      }
      else {
        this.yardBtnDisabled = true;
      }
    }
  }

  getListByShowroomId(showroomId: any, yardId: any) {
    this.service.listvehiclestock(showroomId, 0, yardId).subscribe((data: any) => {
      if (data.statusCode == 200) {
        this.firstTable = [];
        this.toastservice.show("No Stocks Available", { classname: 'bg-danger text-light', delay: 3000 });
      }
      else {
        this.firstTable = data;
      }
    })
  }

  onSelect(data: any, vehicleStockId: any, chassisNo: any, engineNo: any, vehicleModelName: any, vehicleModelId: any, yardId: any, yardName: any) {
    if (this.toYardId != undefined && this.toYardId != '' && this.toYardId != 'Select' && this.fromYardId != undefined) {
      if (yardId == this.toYardId) {
        this.toastservice.show("Cant move to the same yard", { classname: 'bg-danger text-light', delay: 3000 });
      }
      else {
        this.secondTable.push({
          vehicleStockId: vehicleStockId,
          chassisNo: chassisNo,
          engineNo: engineNo,
          fromShowRoomId: parseInt(this.showroomId),
          fromYardId: parseInt(this.fromYardId),
          toYardId: parseInt(this.toYardId),
          vehicleModelId: vehicleModelId,
          userCode: localStorage.getItem('UserCode'),
          vehicleModelName: vehicleModelName,
          yardId: yardId,
          yardName: yardName
        });
        this.firstTable = this.firstTable.filter((el: any) => el !== data);
      }
    }
    else {
      this.toastservice.show("Choose to Yard ", { classname: 'bg-danger text-light', delay: 3000 });
    }
  }

  onDelect(serialNo: any, vehicleStockId: any, chassisNo: any, engineNo: any, vehicleModelName: any, vehicleModelId: any, yardId: any, yardName: any) {
    this.firstTable.push({
      vehicleStockId: vehicleStockId,
      chassisNo: chassisNo,
      engineNo: engineNo,
      fromShowRoomId: parseInt(this.showroomId),
      fromYardId: parseInt(this.fromYardId),
      toYardId: parseInt(this.toYardId),
      vehicleModelId: vehicleModelId,
      userCode: localStorage.getItem('UserCode'),
      vehicleModelName: vehicleModelName,
      yardId: yardId,
      yardName: yardName
    });
    this.secondTable = this.secondTable.filter(el => el !== serialNo);
  }

  save() {
    this.service.savestocktransfer(this.secondTable).subscribe((data: any) => {
      if (data.statusCode == 200) {
        this.toastservice.show("Stock transfered sucessfully", { classname: 'bg-success text-light', delay: 3000 });
      }
      this.changeShowroom(this.showroomId);
      this.showroom();
    })
  }

  listTransfer() {
    this.route.navigateByUrl('/dashboard/listyardtransfer');
  }
}
