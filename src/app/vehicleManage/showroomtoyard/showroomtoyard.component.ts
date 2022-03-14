import { Component, OnInit } from '@angular/core';
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
  showroomId: any;
  yardId: any;
  public firstTable: any[] = [];
  public secondTable: any[] = [];
  yardBtnDisabled: boolean = true;
  selectedShowRoom:any;
  selectedYard:any;
  constructor(private service: YamahaserviceService, private route: Router, private toastService: ToastServiceService) { }

  ngOnInit(): void {
    this.showroom();
    // this.selectedShowRoom =0;
  }

  showroom() {
    this.service.getshowroom().subscribe((data: any) => {
      this.showroomdata = data
    })
    this.selectedShowRoom =0;
  }

  changeShowroom(e: any) {
    this.selectedYard =0;
   
    this.yardname = [];
    this.firstTable = [];
    this.secondTable = [];
    this.yardId = '';
    let data = e.target.value;
    this.showroomId = data;
    this.service.showroombyyard(data).subscribe(data => {
      if (data.statusCode == 200) {
        this.yardname = [];
        this.yardBtnDisabled = true;
        this.toastService.show("No Yard for this Showroom", { classname: 'bg-danger text-light', delay: 5000 });
      }
      else {
        this.yardBtnDisabled = false;
        this.yardname = data;
        this.getListByShowroomId(this.showroomId);
      }
    })
  }

  changeYard(event: any) {
    let data = event.target.value;
    this.yardId = data;
    this.yardBtnDisabled = true;
  }

  getListByShowroomId(showroomId: any) {
    this.service.listvehiclestock(showroomId, 0, 0).subscribe((data: any) => {
      if (data.statusCode == 200) {
        this.firstTable = [];
        this.toastService.show("No Stocks Available", { classname: 'bg-danger text-light', delay: 3000 });
      }
      else {
        this.firstTable = data;
      }
    })
  }

  onSelect(data: any, vehicleStockId: any, chassisNo: any, engineNo: any, vehicleModelName: any, vehicleModelId: any, yardId: any, yardName: any, event: any) {
    if (this.yardId != undefined && this.yardId != '') {
      if (yardId == this.yardId) {
        this.toastService.show("Cant move to the same yard", { classname: 'bg-danger text-light', delay: 3000 });
      }
      else {
        this.secondTable.push({
          vehicleStockId: vehicleStockId,
          chassisNo: chassisNo,
          engineNo: engineNo,
          fromShowRoomId: parseInt(this.showroomId),
          fromYardId: 0,
          toYardId: parseInt(this.yardId),
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
      this.toastService.show("Choose Yard", { classname: 'bg-danger text-light', delay: 1000 });
    }
  }

  onDelect(serialNo: any, vehicleStockId: any, chassisNo: any, engineNo: any, vehicleModelName: any, vehicleModelId: any, yardId: any, yardName: any) {
    this.firstTable.push({
      vehicleStockId: vehicleStockId,
      chassisNo: chassisNo,
      engineNo: engineNo,
      fromShowRoomId: parseInt(this.showroomId),
      fromYardId: 0,
      toYardId: parseInt(this.yardId),
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
        this.toastService.show("Stock transfered sucessfully", { classname: 'bg-success text-light', delay: 3000 });
        this.changeShowroom(this.showroomId);
        this.showroom();
      }
    })
  }

  listTransfer() {
    this.route.navigateByUrl('/dashboard/listshowroomtransfer');
  }

}
