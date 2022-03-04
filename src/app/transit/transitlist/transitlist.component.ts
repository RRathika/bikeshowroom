import { Component, ElementRef, OnInit } from '@angular/core';
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
  constructor(private router: Router, private service: YamahaserviceService, private formBuilder: FormBuilder, private toastService: ToastServiceService) { }
  transitForm: FormGroup = this.formBuilder.group({
    invoiceNo: new FormControl('', [Validators.required]),
    invoiceDate: new FormControl('', [Validators.required]),
    transitType: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
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
      //this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.jsonData = wb.SheetNames.reduce((initial, name) => {
        const sheet = wb.Sheets[name];
        initial = XLSX.utils.sheet_to_json(sheet);
        this.exceldata=initial;
        // console.log(this.exceldata);        
        return initial;
      }, {});
      // const dataString = JSON.stringify(this.jsonData);
      // console.log(this.jsonData);
      for (let i = 0; i < this.jsonData.length; i++) {
        // this.jsonData[i].modelname = '';
        // this.jsonData[i].colorname = '';
        // this.jsonData[i].vehicleModelId='';
        // this.jsonData[i].colorId='';
        let model=this.jsonData[i].ModelCode;
        let colorcode = this.jsonData[i].ModelColorCode;
        let variantcode=this.jsonData[i].VariantCode;
        let variantvalue=this.variantdata.filter((value:{variantName:any;variantCode:any;variantId:any})=>{
          if(variantcode==value.variantCode){
            this.jsonData[i].variantname = value.variantName;
            this.jsonData[i].variantId = value.variantId;
            // console.log(this.jsonData[i].variantname);
          }
        })
        let bikedata= this.bikemodel.filter((value: any)=>{
          if(model==value.modelCode){
            // alert('yes')            
            this.jsonData[i].modelname = value.modelName;
            this.jsonData[i].vehicleModelId = value.modelId;
            // console.log(this.jsonData[i].modelname);
          }          
        });
        let colordata= this.color.filter((value: { colorCode: any; colorName: any;colorId:any; })=>{
          if(colorcode==value.colorCode){   
            this.jsonData[i].colorname =value.colorName;
            this.jsonData[i].colorId=value.colorId;
          }         
        });
      }
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
    this.transitForm.patchValue({ createTransitDetailsDTO: this.jsonData });
   if(this.transitForm.value['showRoomId']=='')
   {
    this.transitForm.value['showRoomId']=localStorage.getItem('ShowRoomId');
   }
    console.log(this.transitForm.value);    
    // if(this.transitForm.valid){
    this.service.savetransit(this.transitForm.value).subscribe((data: any) => {
      if (data.statusCode == 200) {
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 3000 });
        this.transitForm.reset();
        this.router.navigateByUrl('/dashboard/transitlist');
      }
      else {
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 5000 });
      }
    })
  // }
  // else{
  //   this.toastService.show("Please fill all field", { classname: 'bg-danger text-light', delay: 5000 });
  // }
  }
  clear() {
    this.transitForm.reset();
    this.count=0;
    this.myInputVariable.nativeElement.value = "";
  }
}
