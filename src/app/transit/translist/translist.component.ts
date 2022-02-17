import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-translist',
  templateUrl: './translist.component.html',
  styleUrls: ['./translist.component.css']
})
export class TranslistComponent implements OnInit {
  list: any;
  viewdata: any;
  showroom:any;
  roleid:any;
  showdata:any;
  constructor(private router:Router,private service:YamahaserviceService,public toastservice:ToastServiceService) { }

  ngOnInit(): void {
    this.showroom=localStorage.getItem('ShowRoomId');
    this.roleid=localStorage.getItem('RoleId')
    this.loaddata( this.showroom,this.roleid);
    this.showroomdata();
  }
  showroomchange(e:any){
    let name=e.target.value;
    this.service.gettransit(name,this.roleid).subscribe(data=>{
      if(data.statusCode==200)
      {
        this.toastservice.show(data.message,{classname:'bg-success text-light', delay: 10000})
        this.list=[];
      }
      else
      {
      this.list=data;
    }
    })
  }
  showroomdata(){
    this.service.getshowroom().subscribe(data=>{
      this.showdata=data;
    })
  }
  loaddata(show:any,id:any){    
    this.service.gettransit(show,id).subscribe(data=>{
      if(data.statusCode==200)
      {
        this.toastservice.show(data.message,{classname:'bg-success text-light', delay: 10000});
        this.list=[];
      }
      else
      {
      this.list=data;
    }
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
      this.router.navigateByUrl("/dashboard/vehiclepurchaseadd");
    })
  }
}
