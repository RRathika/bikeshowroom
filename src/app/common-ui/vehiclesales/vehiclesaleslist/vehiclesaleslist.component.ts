import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-vehiclesaleslist',
  templateUrl: './vehiclesaleslist.component.html',
  styleUrls: ['./vehiclesaleslist.component.css']
})
export class VehiclesaleslistComponent implements OnInit {

  alldata:any;
  roleid:any;
  showdata:any;
  yard:any;
  list:any;
  showroom:any;
  viewdata:any;
  constructor(private service:YamahaserviceService,private route:Router,private formBuilder:FormBuilder,public toastservice:ToastServiceService) { }
  saleForm:FormGroup=this.formBuilder.group({
    fromdate:'',
    todate:'',
    showRoomId:new FormControl(''),    
    yard:new FormControl('')
  })
  ngOnInit(): void {
    // this.loaddata();
    this.roleid=localStorage.getItem('RoleId');
    this.showroom=localStorage.getItem('ShowRoomId');
    this.loadshowroom();
    this.loadyard();
  }
  loadshowroom(){
    this.service.getshowroom().subscribe(data=>{
      this.showdata=data;
    })
  }
  loadyard(){
    this.service.getyard().subscribe(data=>{
      this.yard=data;
    })
  }
  // loaddata(){
  //   this.service.getsales().subscribe(data=>{
  //     this.alldata=data;
  //   })
  // }
  add(){
    this.route.navigateByUrl('/dashboard/addvehiclesale');
  }
  showroomchange(e:any){    
    let name=e.target.value;
    this.service.showroombyyard(name).subscribe(data=>{
      this.yard=data;
    });
  }
  viewbyid(id:any){
    this.service.getbysale(id).subscribe(data=>{
      this.viewdata=data;
      console.log(this.viewdata);
      
    })
  }
  submit(){    
    console.log(this.saleForm.value);
    if(this.showroom!=0)
    {
      this.saleForm.value['showRoomId']=this.showroom;
    }
    if(this.saleForm.value['yard']=='')
    {
      this.saleForm.value['yard']=0;
    }
    this.service.getsales(this.saleForm.value['showRoomId'],this.saleForm.value['yard'],this.saleForm.value['fromdate'],this.saleForm.value['todate']).subscribe(data=>{
      if(data.statusCode==200)
      {
        this.toastservice.show(data.message,{classname:'bg-success text-light', delay: 10000});
        this.list=[];
        this.saleForm.reset();
      }
      else
      {
      this.list=data;
      this.saleForm.reset();
    }
    })
  }
}
