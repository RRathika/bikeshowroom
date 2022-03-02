import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
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
  yard:any;
  p: number = 1;
  count: number = 10;
  constructor(private router:Router,private formBuilder:FormBuilder,private service:YamahaserviceService,public toastservice:ToastServiceService) { }
  translistForm:FormGroup=this.formBuilder.group({
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
    this.showroomdata();
    this.loadyard();
    this.translistForm.controls['yard'].disable();
  }
  submit(){
    console.log(this.translistForm.value);
    if(this.showroom!=0)
    {
      this.translistForm.value['showRoomId']=this.showroom;
    }
    this.service.gettransit(this.translistForm.value['showRoomId'],this.translistForm.value['yard'],this.translistForm.value['month'],this.translistForm.value['fromdate'],this.translistForm.value['todate']).subscribe(data=>{
      debugger
      if(data.statusCode==200)
      {
        // this.toastservice.show(data.message,{classname:'bg-success text-light', delay: 10000});
        this.list='';
        this.translistForm.reset();
      }
      else
      {
      this.list=data;
      this.translistForm.reset();
    }
    })
  }
  changemonth(e:any){
    console.log(e.target.value);
    this.translistForm.controls['fromdate'].disable();
    this.translistForm.controls['todate'].disable();
    this.translistForm.value['fromdate']='';
    this.translistForm.value['todate']='';
  }
  loadyard(){
    if(this.showroom!=0)
    {
    this.service.showroombyyard(this.showroom).subscribe(data=>{
      this.yard=data;
    })
  }
  }
  showroomchange(e:any){
    let name=e.target.value;
    this.service.showroombyyard(name).subscribe(data=>{
      this.yard=data;
    });
    this.translistForm.controls['yard'].enable();
  }
  showroomdata(){
    this.service.getshowroom().subscribe(data=>{
      this.showdata=data;
    })
  }
  loaddata(show:any){ 
    let from="01-01-0001 00:00:00";
    let to="01-01-0001 00:00:00";  
    this.service.gettransit(show,0,0,from,to).subscribe(data=>{
      if(data.statusCode==200)
      {
        // this.toastservice.show(data.message,{classname:'bg-success text-light', delay: 10000});
        this.list='';
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
  datechoose(){
    this.translistForm.controls['month'].disable();
  }
}
