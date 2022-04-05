import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
import * as XLSX from 'xlsx';
import { ViewChild } from '@angular/core';
import { data } from 'jquery';
const { read, write, utils } = XLSX;

@Component({
  selector: 'app-transitlist',
  templateUrl: './transitlist.component.html',
  styleUrls: ['./transitlist.component.css']
})
export class TransitlistComponent implements OnInit {
  //data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  splitData: any;
  jsonData: any;
  bikemodel: any;
  color: any;
  exceldata:any;
  count=0;
  variantdata:any;
  @ViewChild('myInput')
  myInputVariable: any;
  showdata:any;
  roledata:any;
  yardname: any;
  showname: any;
  submitted:boolean = false;
  stylebike:number=0;
  stylecolor:number=0;
  stylevariant:number=0;
  finaldata:any;
  vendordata:any;
  constructor(private router: Router, private service: YamahaserviceService, private formBuilder: FormBuilder, private toastService: ToastServiceService) { }
  transitForm: FormGroup = this.formBuilder.group({
    invoiceNo: new FormControl('', [Validators.required]),
    invoiceDate: new FormControl('', [Validators.required]),
    transitType: new FormControl('', [Validators.required]),
    supplierId: new FormControl('', [Validators.required]),
    transportName: new FormControl('', [Validators.required]),
    truckNo: new FormControl('', [Validators.required]),
    showRoomId:new FormControl('',[Validators.required]),
    yardId:new FormControl('',[Validators.required]),
    createTransitDetailsDTO: new FormControl
  })
  ngOnInit(): void {
    this.model();
    this.colorid();
    this.variant();
    this.showroomdata();
    this.supplier();
    this.roledata=localStorage.getItem('RoleId');
    this.showname=localStorage.getItem('ShowRoomId');
    if(this.showname!=0)
    {
    this.service.showroombyyard(this.showname).subscribe(data=>{
      if(data.statusCode==200)
      {
        this.yardname=[];
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 5000 });
      }
      else{
      this.yardname=data;
      }
    })
  }
  else{          
    this.transitForm.controls['yardId'].disable();
  }
  }
  supplier(){
    this.service.getvendor().subscribe(data=>{
      this.vendordata=data;
    })
  }
  showroomdata(){
    this.service.getshowroom().subscribe(data=>{
      this.showdata=data;
    })
  }
  model() {
    this.service.getbikemodel().subscribe(data => {
      this.bikemodel = data;
    })
  }
  colorid() {
    this.service.getcolor().subscribe(data => {
      this.color = data;
    })
  }
  variant(){
    this.service.getvariant().subscribe(data=>{
      this.variantdata=data;
    })
  }
  changeshowroom(e:any){
    let data=e.target.value;
    console.log(data);
    
    this.transitForm.controls['yardId'].enable();
    this.service.showroombyyard(data).subscribe(data=>{
      if(data.statusCode==200)
      {
        this.yardname=[];
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 5000 });
      }
      else{
      this.yardname=data;
      }
    })
  }
  onFileChange(evt: any) {
    this.count=this.count+1;   
    debugger
   
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    let workBook = null;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      // workBook = XLSX.read(data, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.finaldata = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      // console.log(this.finaldata[0][8]);
      
      if(this.finaldata[0][8]=='ChassisNo' && this.finaldata[0][9]=='EngineNo'){ 
        if(this.finaldata[0][10]=='ModelCode' && this.finaldata[0][12]=='ModelColorCode')
        {     
      this.jsonData = wb.SheetNames.reduce((initial, name) => {
        const sheet = wb.Sheets[name];
        initial = XLSX.utils.sheet_to_json(sheet);
        this.exceldata=initial;
        // console.log(this.exceldata);        
        return initial;
      },
      {});
      for (let i = 0; i < this.jsonData.length; i++) {        
        let model=this.jsonData[i].ModelCode;
        // console.log(model);        
        let colorcode = this.jsonData[i].ModelColorCode;
        let variantcode=this.jsonData[i].VariantCode;
        let variantvalue=this.variantdata.filter((value:{variantName:any;variantCode:any;variantId:any})=>{
          if(variantcode==value.variantCode){
            this.jsonData[i].variantname = value.variantName;
            this.jsonData[i].variantId = value.variantId;           
          }
          else{
            this.stylevariant=this.stylevariant + 1;
          }
         
        })
        let bikedata= this.bikemodel.filter((value: any)=>{          
          if(model==value.modelCode){                        
            this.jsonData[i].modelname = value.modelName;            
            // console.log(this.jsonData[i].modelname);
            this.jsonData[i].vehicleModelId = value.modelId;
          }
           else{
            this.stylebike=this.stylebike + 1;
          } 
        });
        let colordata= this.color.filter((value: { colorCode: any; colorName: any;colorId:any; })=>{
          if(colorcode==value.colorCode){   
            this.jsonData[i].colorname =value.colorName;
            this.jsonData[i].colorId=value.colorId;
          }  
          else{
            this.stylecolor=this.stylecolor + 1;
          }      
        });
      }
    }}
      else{
        alert('Not a valid excel sheet');
        this.myInputVariable.nativeElement.value = "";
        this.exceldata='';
      }
      // const dataString = JSON.stringify(this.jsonData);
      // console.log(this.jsonData);
     
      
      // this.splitData = this.data.slice(1);
      // console.log(this.splitData);
    };

    reader.readAsBinaryString(target.files[0]);
  }

  onChange(event: any, i: any) {
    this.jsonData[i].vehicleModelId = event.target.value;
  }
  onChange1(event: any, i: any) {
    this.jsonData[i].variantId = event.target.value;
  }
  
  submit() {     
    // console.log(this.stylevariant);
    
   this.submitted=true;   
    this.transitForm.patchValue({ createTransitDetailsDTO: this.jsonData });
   if(this.transitForm.value['showRoomId']=='')
   {
    this.transitForm.value['showRoomId']=localStorage.getItem('ShowRoomId');
   }
    // console.log(this.transitForm.value);   
    if(this.jsonData)
    { 
    if(this.transitForm.valid){
    this.service.savetransit(this.transitForm.value).subscribe((data: any) => {
      if (data.message == "Fail") {
        if(data.modelCount>0)
        {
          this.toastService.show(data.modelCount+'model name missing', { classname: 'bg-danger text-light', delay: 3000 });
        }
        if(data.colorCount>0)
        {
          this.toastService.show(data.colorCount+ 'color name missing', { classname: 'bg-danger text-light', delay: 3000 });
        }
        if(data.variantCount>0)
        {
          this.toastService.show(data.variantCount+ 'variant name missing', { classname: 'bg-danger text-light', delay: 3000 });
        }        
      }
      else {        
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 7000 });
        this.transitForm.reset();
        this.router.navigateByUrl('/dashboard/transitlist');
      }
    })
  }  
  else{
    this.toastService.show("Please fill all field", { classname: 'bg-danger text-light', delay: 3000 });
  }
}
else{
  this.toastService.show("Please upload transit file", { classname: 'bg-danger text-light', delay: 3000 });
}
  }
  clear() {
    this.transitForm.reset();
    this.count=0;
    this.myInputVariable.nativeElement.value = "";
    this.exceldata='';
    this.transitForm.patchValue({
      transitType:'' ,
      supplierId:'',
      showRoomId:'',
      yardId:'',
    })
  }
  add(){
    this.router.navigateByUrl('/dashboard/transitlist');
  }
}
