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
  p: number = 1;
  count: number = 10;
  selectedShowRoom = 0;
  selectedFromYard: any;
  selectedToYard: any;

  constructor(private service: YamahaserviceService, private route: Router, public toastservice: ToastServiceService, private formbuilder: FormBuilder) { }
  stockForm: FormGroup = this.formbuilder.group({
    ShowRoomId: new FormControl('', [Validators.required]),
    fromYardId: new FormControl('', [Validators.required]),
    toYardId: new FormControl('', [Validators.required]),
    date: new FormControl(''),
  });

  ngOnInit(): void {
    this.showroom();

    this.stockForm.controls.fromYardId.disable();
    this.stockForm.controls.toYardId.disable();
  }

  showroom() {
    this.stockForm.patchValue({
      date: ''
    });
    
    this.service.getshowroom().subscribe(data => {
      this.showroomdata = data
    })
  }

  submit() {
    console.log(this.stockForm.value['fromYardId'])
    console.log(this.stockForm.value['toYardId'])

    this.submitted = true;

    if (this.stockForm.value['fromYardId'] != undefined || this.stockForm.value['toYardId'] != undefined) {
      // alert(1)

      if (this.stockForm.value['fromYardId'] !=0 || this.stockForm.value['toYardId'] !=0 ) {
        if (this.stockForm.value['fromYardId'] == this.stockForm.value['toYardId']) {
          this.toastservice.show("From Yard & To Yard should not be same", { classname: 'bg-danger text-light', delay: 3000 });
  
        }
        else {
  
        }
  

      }

    

      console.log(this.stockForm.value)
      
      this.service.getStockTransferFromYard(this.stockForm.value['date'], this.stockForm.value['ShowRoomId'], this.stockForm.value['fromYardId'], this.stockForm.value['toYardId']).subscribe((data: any) => {
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
    this.yardname = [];
    let data = e.target.value;
    this.showroomId = data;
    this.service.showroombyyard(data).subscribe(data => {
      if (data.statusCode == 200) {
        this.yardname = [];
        this.toastservice.show("No Yard for this Showroom", { classname: 'bg-danger text-light', delay: 5000 });
        this.stockForm.controls.fromYardId.disable();
        this.stockForm.controls.toYardId.disable();
      }
      else {
        this.yardname = data;

        this.stockForm.controls.fromYardId.enable();
        this.stockForm.controls.toYardId.enable();
        this.selectedFromYard = 0;
        this.selectedToYard = 0;
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

  stockTransfer() {
    this.route.navigateByUrl('/dashboard/yardtoyard');
  }
}
