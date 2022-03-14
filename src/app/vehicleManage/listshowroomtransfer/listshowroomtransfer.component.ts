import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-listshowroomtransfer',
  templateUrl: './listshowroomtransfer.component.html',
  styleUrls: ['./listshowroomtransfer.component.css']
})
export class ListshowroomtransferComponent implements OnInit {
  vehiclestock: any;
  showroomdata: any;
  yardname: any;
  showroomId: any;
  yardId: any;
  submitted: boolean = false;
  p: number = 1;
  count: number = 10;
  selectedShowRoom = 0;
  selectedYard: any;

  constructor(private service: YamahaserviceService, private route: Router, public toastservice: ToastServiceService, private formbuilder: FormBuilder) { }
  stockForm: FormGroup = this.formbuilder.group({
    ShowRoomId: new FormControl('', [Validators.required]),
    yardId: new FormControl('', [Validators.required]),
    date: new FormControl(''),
  });

  ngOnInit(): void {
    this.showroom();
    this.stockForm.controls.yardId.disable();
  }

  showroom() {
    this.service.getshowroom().subscribe(data => {
      this.showroomdata = data
    })
  }

  submit() {
    console.log(this.stockForm.value['yardId'])
    this.submitted = true;
    if (this.stockForm.valid && this.stockForm.value['yardId'] != undefined && this.stockForm.value['yardId'] != 0) {

      this.service.getStockTransferFromShowRoom(this.stockForm.value['date'], this.stockForm.value['ShowRoomId'], this.stockForm.value['yardId']).subscribe((data: any) => {
        if (data.statusCode == 200) {
          this.vehiclestock = '';
        }
        else {
          this.vehiclestock = data;
        }
      })
    }

  }

  changeShowroom(e: any) {

    this.stockForm.patchValue({
      date: ''
    });

    this.yardname = [];
    let data = e.target.value;
    this.showroomId = data;
    this.service.showroombyyard(data).subscribe(data => {
      if (data.statusCode == 200) {
        this.yardname = [];
        this.stockForm.controls.yardId.disable();
        this.toastservice.show("No Yard for this Showroom", { classname: 'bg-danger text-light', delay: 5000 });
      }
      else {
        this.stockForm.controls.yardId.enable();
        this.selectedYard = 0;
        this.yardname = data;
      }
    })
  }

  stockTransfer() {
    this.route.navigateByUrl('/dashboard/showroomtoyard');
  }

  // getStockTransfer(showroomId: any) {
  //   this.service.getStockTransfer(showroomId, 0, 0).subscribe((data: any) => {
  //     if (data.statusCode == 200) {
  //       this.toastservice.show("No Stocks Available", { classname: 'bg-danger text-light', delay: 10000 });
  //     }
  //   })
  // }

}
