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

  // getbike:any;
  p: number = 1;
  count: number = 3;

  constructor(private service: YamahaserviceService, private route: Router, public toastservice: ToastServiceService, private formbuilder: FormBuilder) { }
  stockForm: FormGroup = this.formbuilder.group({
    ShowRoomId: new FormControl('', [Validators.required]),
    yardId: new FormControl('', [Validators.required]),
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
    // console.log(this.stockForm.value)
    this.submitted = true;
    this.service.getStockTransferFromShowRoom(this.stockForm.value['date'], this.stockForm.value['ShowRoomId'], this.stockForm.value['yardId']).subscribe((data: any) => {
    //  console.log(data)
    //  console.log(this.vehiclestock)
      if (data.statusCode == 200) {
        this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 10000 });
        this.vehiclestock = [];
        // console.log(this.vehiclestock)
      }
      else {
        this.vehiclestock = data;
        console.log(this.vehiclestock)
      }
    })

    if (this.stockForm.valid) {
      // alert(1)
    }

    console.log(this.vehiclestock)

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
    this.route.navigateByUrl('/dashboard/showroomtoyard');
  }
}
