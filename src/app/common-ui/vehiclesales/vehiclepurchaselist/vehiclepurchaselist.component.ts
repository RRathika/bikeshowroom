import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  showroom: any;
  roleid: any;
  yard:any;
  showdata:any;
  constructor(private service:YamahaserviceService,private formBuilder:FormBuilder,private router:Router,public toastservice:ToastServiceService) { }
  purchaselistForm:FormGroup=this.formBuilder.group({
    fromdate:'',
    todate:'',
    month:0,
    showRoomId:new FormControl(''),    
    yard:new FormControl('')
  })
  ngOnInit(): void {
    this.showroom=localStorage.getItem('ShowRoomId');
    this.roleid=localStorage.getItem('RoleId')
    this.loaddata(this.showroom);
    this.loadyard();
    this.showroomdata();
  }
  loaddata(show:any){
    let from="01-01-0001";
    let to="01-01-0001";  
    this.service.getvehiclepurchase(show,0,0,from,to).subscribe(data=>{
      if(data.statusCode==200)
      {
        this.toastservice.show(data.message,{classname:'bg-success text-light', delay: 10000});
        this.vehiclepurchase=[];
      }
      else
      {
      this.vehiclepurchase=data;      
    }
    })
  }
  changemonth(e:any){
    console.log(e.target.value);
    this.purchaselistForm.controls['fromdate'].disable();
    this.purchaselistForm.controls['todate'].disable();
    this.purchaselistForm.value['fromdate']='';
    this.purchaselistForm.value['todate']='';
  }
  showroomdata(){
    this.service.getshowroom().subscribe(data=>{
      this.showdata=data;
    })
  }
  showroomchange(e:any){
    let name=e.target.value;
    this.service.showroombyyard(name).subscribe(data=>{
      this.yard=data;
    });
  }
  loadyard(){
    if(this.showroom!=0)
    {
    this.service.showroombyyard(this.showroom).subscribe(data=>{
      this.yard=data;
    })
  }
  }
  submit(){
    console.log(this.purchaselistForm.value);
    if(this.showroom!=0)
    {
      this.purchaselistForm.value['showRoomId']=this.showroom;
    }
    this.service.getvehiclepurchase(this.purchaselistForm.value['showRoomId'],this.purchaselistForm.value['yard'],this.purchaselistForm.value['month'],this.purchaselistForm.value['fromdate'],this.purchaselistForm.value['todate']).subscribe(data=>{
      if(data.statusCode==200)
      {
        this.toastservice.show(data.message,{classname:'bg-success text-light', delay: 10000});
        this.vehiclepurchase=[];
        this.purchaselistForm.reset();
      }
      else
      {
      this.vehiclepurchase=data;
      this.purchaselistForm.reset();
    }
    })
  }
  viewbyid(id:any)
  {
    this.service.getvehiclepurchasebyid(id).subscribe(data=>{
      this.purchasebyid=data;      
    })
  }
  add()
  {
    this.router.navigateByUrl('/dashboard/vehiclepurchaseadd')
  }
}
