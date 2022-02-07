import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-vehiclepurchaselist',
  templateUrl: './vehiclepurchaselist.component.html',
  styleUrls: ['./vehiclepurchaselist.component.css']
})
export class VehiclepurchaselistComponent implements OnInit {
  vehiclepurchase:any;
  purchasebyid:any;
  constructor(private service:YamahaserviceService,private router:Router,public toastservice:ToastServiceService) { }

  ngOnInit(): void {
    this.loaddata();
  }
  loaddata(){
    this.service.getvehiclepurchase().subscribe(data=>{
      this.vehiclepurchase=data;      
    })
  }
  viewbyid(id:any)
  {
    this.service.getvehiclepurchasebyid(id).subscribe(data=>{
      this.purchasebyid=data;      
    })
  }
  add()
  {}
}
