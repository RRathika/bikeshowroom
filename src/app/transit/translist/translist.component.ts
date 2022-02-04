import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-translist',
  templateUrl: './translist.component.html',
  styleUrls: ['./translist.component.css']
})
export class TranslistComponent implements OnInit {
  list: any;
  viewdata: any;

  constructor(private router:Router,private service:YamahaserviceService) { }

  ngOnInit(): void {
    this.loaddata();
  }
  loaddata(){
    this.service.gettransit().subscribe(data=>{
      this.list=data;
    })
  }
  viewbyid(id:any){
    console.log(id);
    this.service.getbyidtransit(id).subscribe(data=>{
      this.viewdata=data;
    })    
  }
  add(){
    this.router.navigateByUrl("/dashboard/transitadd")
  }
  movepurchase(id:any){
    this.service.movetopurchase(id).subscribe(data=>{
      this.service.purchasedata.next(data);
      this.router.navigateByUrl("/dashboard/vehiclepurchase");
    })
  }
}
