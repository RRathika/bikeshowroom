import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  p: number = 1;
  count: number = 10;
  selectedQuantity=0;
  submitted:boolean=false;
  constructor(private service:YamahaserviceService,private formBuilder:FormBuilder,private router:Router,public toastservice:ToastServiceService) { }
  purchaselistForm:FormGroup=this.formBuilder.group({
    fromdate:'',
    todate:'',
    month:0,
    showRoomId:new FormControl('',[Validators.required]),    
    yard:new FormControl('')
  })
  ngOnInit(): void {
    this.showroom=localStorage.getItem('ShowRoomId');
    this.roleid=localStorage.getItem('RoleId');
    this.purchaselistForm.controls['yard'].disable();
    this.loaddata(this.showroom);
    this.loadyard();
    this.showroomdata();
  }
  loaddata(show:any){
    // let from="01-01-0001";
    // let to="01-01-0001";  
    this.service.getvehiclepurchase(show,0,0,'','').subscribe(data=>{
      if(data.statusCode==200)
      {
        this.toastservice.show(data.message,{classname:'bg-success text-light', delay: 3000});
        this.vehiclepurchase=[];
      }
      else
      {
      this.vehiclepurchase=data;      
    }
    })
  }
  choosedate(){
    this.purchaselistForm.controls['month'].disable();
    this.purchaselistForm.patchValue({
      month:0
    })
  }
  changemonth(e:any){
    // console.log(e.target.value);
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
    this.purchaselistForm.controls['yard'].enable();
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
    if(this.purchaselistForm.value['yard']=='')
    {
      this.purchaselistForm.patchValue({
        yard:0
      })
    }
    
    if(this.purchaselistForm.value['fromdate']==null)
    {
      this.purchaselistForm.patchValue({
        fromdate:''
      })
    }
    if(this.purchaselistForm.value['todate']==null)
    {
      this.purchaselistForm.patchValue({
        todate:''
      })
    }
    this.submitted=true;
    if(this.purchaselistForm.valid){
      if(this.purchaselistForm.value['month']==undefined)
    {
    this.service.getvehiclepurchase(this.purchaselistForm.value['showRoomId'],this.purchaselistForm.value['yard'],0,this.purchaselistForm.value['fromdate'],this.purchaselistForm.value['todate']).subscribe(data=>{
      if(data.statusCode==200)
      {
        // this.toastservice.show(data.message,{classname:'bg-success text-light', delay: 3000});
        this.vehiclepurchase='';
        this.purchaselistForm.reset();
        this.submitted=false;
        this.purchaselistForm.controls['fromdate'].enable();
        this.purchaselistForm.controls['todate'].enable();
        this.purchaselistForm.controls['yard'].disable();
        this.purchaselistForm.controls['month'].enable();
        this.purchaselistForm.patchValue({
          yard:'',
          month:0,
          showRoomId:''
        })
      }
      else
      {
      this.vehiclepurchase=data;
      this.purchaselistForm.reset();
      this.submitted=false;
      this.purchaselistForm.controls['fromdate'].enable();
        this.purchaselistForm.controls['todate'].enable();
        this.purchaselistForm.controls['yard'].disable();
        this.purchaselistForm.controls['month'].enable();
      this.purchaselistForm.patchValue({
        yard:'',
        month:0,
        showRoomId:''
      })
    }
    })
  }
  else if(this.purchaselistForm.value['yard']== 0){
    this.service.getvehiclepurchase(this.purchaselistForm.value['showRoomId'],this.purchaselistForm.value['yard'],this.purchaselistForm.value['month'],'','').subscribe(data=>{
      if(data.statusCode==200)
      {
        // this.toastservice.show(data.message,{classname:'bg-success text-light', delay: 3000});
        this.vehiclepurchase='';
        this.purchaselistForm.reset();
        this.submitted=false;
        this.purchaselistForm.controls['fromdate'].enable();
        this.purchaselistForm.controls['todate'].enable();
        this.purchaselistForm.controls['yard'].disable();
        this.purchaselistForm.controls['month'].enable();
        this.purchaselistForm.patchValue({
          yard:'',
          month:0,
          showRoomId:''
        })
      }
      else
      {
      this.vehiclepurchase=data;
      this.purchaselistForm.reset();
      this.submitted=false;
      this.purchaselistForm.controls['fromdate'].enable();
        this.purchaselistForm.controls['todate'].enable();
        this.purchaselistForm.controls['yard'].disable();
        this.purchaselistForm.controls['month'].enable();
      this.purchaselistForm.patchValue({
        yard:'',
        month:0,
        showRoomId:''
      })
    }
    })
  }
  else
  {
    this.service.getvehiclepurchase(this.purchaselistForm.value['showRoomId'],this.purchaselistForm.value['yard'],this.purchaselistForm.value['month'],this.purchaselistForm.value['fromdate'],this.purchaselistForm.value['todate']).subscribe(data=>{
      if(data.statusCode==200)
      {
        // this.toastservice.show(data.message,{classname:'bg-success text-light', delay: 3000});
        this.vehiclepurchase='';
        this.purchaselistForm.reset();
        this.submitted=false;
        this.purchaselistForm.controls['fromdate'].enable();
        this.purchaselistForm.controls['todate'].enable();
        this.purchaselistForm.controls['yard'].disable();
        this.purchaselistForm.controls['month'].enable();
        this.purchaselistForm.patchValue({
          yard:'',
          month:0,
          showRoomId:''
        })
      }
      else
      {
      this.vehiclepurchase=data;
      this.purchaselistForm.reset();
      this.submitted=false;
      this.purchaselistForm.controls['fromdate'].enable();
        this.purchaselistForm.controls['todate'].enable();
        this.purchaselistForm.controls['yard'].disable();
        this.purchaselistForm.controls['month'].enable();
      this.purchaselistForm.patchValue({
        yard:'',
        month:0,
        showRoomId:''
      })
    }
    })
  }
  }
}
  viewbyid(id:any)
  {
    this.service.getvehiclepurchasebyid(id).subscribe(data=>{
      this.purchasebyid=data;      
    })
  }
  add()
  {
    this.service.purchasedata.next('');
    this.router.navigateByUrl('/dashboard/vehiclepurchaseadd')
  }
}
