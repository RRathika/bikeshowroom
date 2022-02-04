import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
import * as XLSX from 'xlsx';
import { ViewChild } from '@angular/core';
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
  @ViewChild('myInput')
  myInputVariable: any;
  constructor(private router: Router, private service: YamahaserviceService, private formBuilder: FormBuilder, private toastService: ToastServiceService) { }
  transitForm: FormGroup = this.formBuilder.group({
    invoiceNo: new FormControl('', [Validators.required]),
    invoiceDate: new FormControl('', [Validators.required]),
    transitType: new FormControl('', [Validators.required]),
    stockType: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
    transportName: new FormControl('', [Validators.required]),
    truckNo: new FormControl('', [Validators.required]),
    createTransitDetailsDTO: new FormControl,
    status: 0,
    isActive: 0
  })
  ngOnInit(): void {
    this.variant();
    this.modelid();
  }
  variant() {
    this.service.getbikemodel().subscribe(data => {
      this.bikemodel = data;
    })
  }
  modelid() {
    this.service.getcolor().subscribe(data => {
      this.color = data;
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
        console.log(this.exceldata);        
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
        let bikedata= this.bikemodel.filter((value: any)=>{
          if(model==value.modelCode){
            // alert('yes')            
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
    console.log(this.transitForm.value);
    if(this.transitForm.valid){
    this.service.savetransit(this.transitForm.value).subscribe((data: any) => {
      if (data.statusCode == 200) {
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 });
        this.transitForm.reset();
        this.router.navigateByUrl('/dashboard/transitlist');
      }
      else {
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 });
      }
    })
  }
  else{
    this.toastService.show("Please fill all field", { classname: 'bg-danger text-light', delay: 15000 });
  }
  }
  clear() {
    this.transitForm.reset();
    this.count=0;
    this.myInputVariable.nativeElement.value = "";
  }
}
