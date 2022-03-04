import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-vehiclepurchase',
  templateUrl: './vehiclepurchase.component.html',
  styleUrls: ['./vehiclepurchase.component.css']
})
export class VehiclepurchaseComponent implements OnInit {
   
  textboxdisplay:any;
  purchase:any;
  bikemodel: any;
  color: any;
  count=0;
  jsonData: any;
  exceldata: any;
  final:any;
  total=0;
  netamount=0;
  @ViewChild('myInput')
  myInputVariable: any;
  variantdata:any;
  showname: any;
  yardname: any;
  roledata: any;
  showdata:any;
  constructor(private router:Router,private service:YamahaserviceService,private formbuilder:FormBuilder,public toastservice:ToastServiceService) { }
  vehiclepurchaseForm:FormGroup=this.formbuilder.group({
  receivedDate:  new FormControl('', [Validators.required]),
  invoiceNo:  new FormControl('', [Validators.required]),
  invoiceDate:  new FormControl('', [Validators.required]),
  paymentModeId:  new FormControl('', [Validators.required]),
  purchaseType:  new FormControl('', [Validators.required]),
  showRoomId:  new FormControl('',[Validators.required]),
  yardId : new FormControl('',[Validators.required]),
  supplierName:  new FormControl('', [Validators.required]),
  suppierAddress:  new FormControl('', [Validators.required]),
  supplierGST:  new FormControl('', [Validators.required]),
  totalVehicleCost:  new FormControl('', [Validators.required]),
  igstPercentage:  new FormControl(''),
  discountPercentage:  new FormControl(''),
  freight:  new FormControl(''),
  additionalDiscount:  new FormControl(''),
  insurance:  new FormControl(''),
  total:  new FormControl('', [Validators.required]),
  cardDetails:  new FormControl(''),
  checkDetails:  new FormControl(''),
  netAmount:  new FormControl('', [Validators.required]),
  transitId:new FormControl,
  createVehiclePurchaseDetailsDTO:  new FormControl});
  ngOnInit(): void {
    this.showroomdata();
    this.roledata=localStorage.getItem('RoleId');
    this.showname=localStorage.getItem('ShowRoomId');
    if(this.showname!=0)
    {
    this.service.showroombyyard(this.showname).subscribe(data=>{
      if(data.statusCode==200)
      {
        this.yardname=[];
        this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 5000 });
      }
      else{
      this.yardname=data;
      }
    })
  }
    if(this.service.purchasedata.value!='')
    {
      this.count=this.count+1;
    this.service.purchasedata.subscribe((data:any)=>{
      console.log(data.viewTransitDetailsDTO);
      this.vehiclepurchaseForm.patchValue({
        transitId:data.transitId
      })
      console.log(this.vehiclepurchaseForm.value['transitId']);
      this.purchase=data.viewTransitDetailsDTO;
      for (let i = 0; i < this.purchase.length; i++) { 
        this.purchase[i].keyNo='';
      }
    })
    }
    else
    {
      this.vehiclepurchaseForm.patchValue({
        transitId:0
      })
      console.log(this.vehiclepurchaseForm.value['transitId']);
    }
    this.modelid();
    this.colorid();
    this.variantid();
  }
  modelid() {
    this.service.getbikemodel().subscribe(data => {
      this.bikemodel = data;
    })
  }
  showroomdata(){
    this.service.getshowroom().subscribe(data=>{
      this.showdata=data;
    })
  }
  colorid() {
    this.service.getcolor().subscribe(data => {
      this.color = data;
    })
  }
  variantid(){
    this.service.getvariant().subscribe(data=>{
      this.variantdata=data;
    })
  }
  changeshowroom(e:any){
    let data=e.target.value;
    this.service.showroombyyard(data).subscribe(data=>{
      if(data.statusCode==200)
      {
        this.yardname=[];
        this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 5000 });
      }
      else{
      this.yardname=data;
      }
    })
  }
  onchange(e:any)
  {
    if(e.target.value==1)
    {
      this.textboxdisplay="cash";
    }
    if(e.target.value==2)
    {
      console.log(e.target.value);
      this.textboxdisplay="card";
    }
    if(e.target.value==3)
    {
      console.log(e.target.value);
      this.textboxdisplay="cheque";      
    }

  }
  onFileChange(evt: any) {
    this.count=this.count+1;
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    let workBook = null;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });     
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];      
      this.jsonData = wb.SheetNames.reduce((initial, name) => {
        const sheet = wb.Sheets[name];
        initial = XLSX.utils.sheet_to_json(sheet);
        this.exceldata=initial;
        console.log(this.exceldata);        
        return initial;
      }, {});
      for (let i = 0; i < this.jsonData.length; i++) {
        this.jsonData[i].keyNo='';       
        let model=this.jsonData[i].ModelCode;
        let colorcode = this.jsonData[i].ModelColorCode;
        let variantcode=this.jsonData[i].VariantCode;
        let variantvalue=this.variantdata.filter((value:{variantName:any;variantCode:any;variantId:any})=>{
          if(variantcode==value.variantCode){
            this.jsonData[i].variantname = value.variantName;
            this.jsonData[i].variantId = value.variantId;
            console.log(this.jsonData[i].variantname);
          }
        })
        let bikedata= this.bikemodel.filter((value: any)=>{
          if(model==value.modelCode){                      
            this.jsonData[i].modelname = value.modelName;
            this.jsonData[i].vehicleModelId = value.modelId;
            console.log(this.jsonData[i].modelname);
          }          
        });
        let colordata= this.color.filter((value: { colorCode: any; colorName: any;colorId:any; })=>{
          if(colorcode==value.colorCode){   
            this.jsonData[i].colorname =value.colorName;
            this.jsonData[i].colorId=value.colorId;
          }
         
        });
      }    
    };

    reader.readAsBinaryString(target.files[0]);
  }
  onChange(event: any, i: any) {
    if(this.vehiclepurchaseForm.value['transitId']==0)
    {
    this.jsonData[i].keyNo = event.target.value;
    }
    else{
    this.purchase[i].keyNo=event.target.value;
    }
  }
  vehiclecost(e:any)
  {       
    this.total=e.target.value;
    this.netamount=Math.round(this.total);
    console.log(this.total);    
  }
  igst(e:any)
  {
    const igst=e.target.value;
    const igstamount=this.total*(igst/100);
    this.total=+this.total + +igstamount;
    this.netamount=Math.round(this.total);
    console.log(this.total);
  }
  insurance(e:any)
  {
    const insurance=e.target.value;
    this.total=+this.total + +insurance;
    this.netamount=Math.round(this.total);
    console.log(this.total);
  }
  freight(e:any)
  {
    const freight=e.target.value;
    this.total=+this.total + +freight;
    this.netamount=Math.round(this.total);
    console.log(this.total);
  }
  discount(e:any)
  {
    const discount=e.target.value;
    this.total=+this.total-(+this.total*(discount/100));
    this.netamount=Math.round(this.total);
    console.log(this.total);
  }
  discountamount(e:any)
  {
    const discountamount=e.target.value;
    this.total=+this.total - +discountamount;
    this.netamount=Math.round(this.total);
    console.log(this.total);
  }
  submit(){
    if(this.vehiclepurchaseForm.value['showRoomId']=='')
   {
    this.vehiclepurchaseForm.value['showRoomId']=localStorage.getItem('ShowRoomId');
   }
    this.vehiclepurchaseForm.patchValue({
      total:this.total,
      netAmount:this.netamount
    })
    if(this.vehiclepurchaseForm.value['transitId']==0)
    {
    this.vehiclepurchaseForm.patchValue({ createVehiclePurchaseDetailsDTO: this.jsonData});
    if(this.vehiclepurchaseForm.valid)
    {
      this.service.savepurchase(this.vehiclepurchaseForm.value).subscribe((data:any)=>{
        if(data.statusCode)
        {
        this.toastservice.show(data.message,{ classname: 'bg-success text-light', delay: 3000 });
        this.clear();
        }
        else{
          this.toastservice.show(data.message,{ classname: 'bg-danger text-light', delay: 5000 });
        }
      })
    }
    else
    {
      this.toastservice.show("please Fill all Field",{ classname: 'bg-danger text-light', delay: 5000 })
    }
    }
    else
    {
      this.vehiclepurchaseForm.patchValue({ createVehiclePurchaseDetailsDTO:this.purchase});
      if(this.vehiclepurchaseForm.valid)
      {
        this.service.savepurchase(this.vehiclepurchaseForm.value).subscribe((data:any)=>{
          if(data.statusCode)
          {
          this.toastservice.show(data.message,{ classname: 'bg-success text-light', delay: 3000 });
          this.clear();
          }
          else{
            this.toastservice.show(data.message,{ classname: 'bg-danger text-light', delay: 5000 });
          }
        })
      }
      else
      {
        this.toastservice.show("please Fill all Field",{ classname: 'bg-danger text-light', delay: 5000 })
      }
    }
  }
  clear() {
    this.vehiclepurchaseForm.reset();
    this.count=0;
    this.myInputVariable.nativeElement.value = "";
  }
}
