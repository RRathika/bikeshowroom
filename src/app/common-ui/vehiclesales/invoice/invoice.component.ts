import { Component, OnInit } from '@angular/core';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
 inno:any;
 indate:any;
 areaname:any;city:any;
 name:any;
 indata:any;
  constructor(private service:YamahaserviceService) { }

  ngOnInit(): void {
   this.callprint()
    // window.print()
  }
  callprint(){
    this.service.printvalue.subscribe(data=>{
      this.indata=data; 
      console.log(this.indata);      
      // window.print();     
    })
    // this.indata={
    //   "invoiceNo": "20220005",
    //   "invoiceDate": "2022-02-23T04:45:06.793Z",
    //   "receiptNos": 55,
    //   "customerName": "fgfg fgfg",
    //   "presentDoorNo": "ghg",
    //   "presentAreaName": "ghg",
    //   "presentCity": "ghg",
    //   "presentDistrict": "ghg",
    //   "mobileNo": 545645454,
    //   "financeName": "Finance1",
    //   "financeAddress": "ngl",
    //   "financeMobileNo": 9874565896,
    //   "chassisNo": "dfdf",
    //   "engineNo": "fdf",
    //   "keyNo": 1111,
    //   "vehicleModelName": "Dio",
    //   "colorName": "Blue",
    //   "variantName": "sky blue",
    //   "hsnCode": 1111,
    //   "vehicleCost": 545,
    //   "tax": 0,
    //   "invoiceAmount": 5454,
    //   "rupees": "dsds"}
    // console.log(this.form);
    // this.indate=this.form.createVehicleCustomerDetailsDTO.invoiceDate;
    // this.name=this.form.createVehicleCustomerDetailsDTO.firstName+' '+this.form.createVehicleCustomerDetailsDTO.lastName;
    window.print();
  }
}
