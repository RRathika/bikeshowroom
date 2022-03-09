import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-listyardtransfer',
  templateUrl: './listyardtransfer.component.html',
  styleUrls: ['./listyardtransfer.component.css']
})
export class ListyardtransferComponent implements OnInit {
  vehiclestock: any;
  showroomdata: any;
  yardname: any;
  showroomId: any;
  fromYardId: any;
  toYardId: any;
  submitted: boolean = false;

  constructor(private service: YamahaserviceService, private route: Router, public toastservice: ToastServiceService, private formbuilder: FormBuilder) { }
  stockForm: FormGroup = this.formbuilder.group({
    ShowRoomId: new FormControl('', [Validators.required]),
    fromYardId: new FormControl('', [Validators.required]),
    toYardId: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.showroom();
  }

  showroom() {
    this.service.getshowroom().subscribe(data => {
      this.showroomdata = data
    })
  }

  submit() {
    console.log(this.stockForm.value)
    this.submitted = true;
    // this.service.getStockTransfer(this.stockForm.value['date'], this.stockForm.value['ShowRoomId'], this.stockForm.value['fromYardId'], this.stockForm.value['toYardId']).subscribe((data: any) => {
    this.service.getStockTransfer(this.stockForm.value['date'], this.stockForm.value['ShowRoomId'], this.stockForm.value['yardId']).subscribe((data: any) => {
      if (data.statusCode == 200) {
        this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 10000 });
      }
      else {
        this.vehiclestock = data;
      }
    })

    if (this.stockForm.valid) {
      // alert(1)
    }
  }

  changeShowroom(e: any) {
    this.yardname = [];
    let data = e.target.value;
    this.showroomId = data;
    this.service.showroombyyard(data).subscribe(data => {
      if (data.statusCode == 200) {
        this.yardname = [];
        this.toastservice.show("No Yard for this Showroom", { classname: 'bg-danger text-light', delay: 5000 });
      }
      else {
        this.yardname = data;
      }
    })
  }

  getStockTransfer(showroomId: any) {
    this.service.getStockTransfer(showroomId, 0, 0).subscribe((data: any) => {
      if (data.statusCode == 200) {
        this.toastservice.show("No Stocks Available", { classname: 'bg-danger text-light', delay: 10000 });
      }
      else {
      }
    })
  }


  stockTransfer(){
    this.route.navigateByUrl('/dashboard/yardtoyard');
  }
}
