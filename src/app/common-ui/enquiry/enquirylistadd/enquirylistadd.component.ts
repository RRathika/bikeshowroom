import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { enquiryForm } from 'src/app/interfacelist/enquiryForm';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-enquirylistadd',
  templateUrl: './enquirylistadd.component.html',
  styleUrls: ['./enquirylistadd.component.css']
})

export class EnquirylistaddComponent implements OnInit {
  
  planingdate: any;
  remark: any;
  showdata:any;
  roledata: any;
  show:any;
  constructor(private route: Router, private service: YamahaserviceService, private formBuilder: FormBuilder,public toastService: ToastServiceService) { }
  enquiryaddForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),   
    mobileNo: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    interestedIn: new FormControl('', [Validators.required]),
    planningDate: new FormControl('', [Validators.required]),
    remarks:new FormControl('',[Validators.required]),
    showRoomId:new FormControl('')
  })
  createForm:FormGroup=this.formBuilder.group({
    enquiryId: [0],
    planningDate:new FormControl('', [Validators.required]),
    remarks:new FormControl('', [Validators.required])
  })
  MainForm: FormGroup = this.formBuilder.group({
    createEnquiryDTO: new FormControl(this.enquiryaddForm),
    createEnquiryDetailsDTO: new FormControl(this.createForm)
  })

  ngOnInit(): void { 
    this.loadshowroom();
    this.roledata=localStorage.getItem('RoleId');
    this.show=localStorage.getItem('ShowRoomId');
  }
  loadshowroom(){
    this.service.getshowroom().subscribe(data=>{
      this.showdata=data;
    })
  }
  submit() {    
    if(this.roledata!=1)
    {
      this.enquiryaddForm.patchValue({showRoomId:this.show});
    }
    else
    {
      this.enquiryaddForm.value['showRoomId']
    }
    this.planingdate = this.enquiryaddForm.value['planningDate'];
    this.remark=this.enquiryaddForm.value['remarks'];
    // console.log(this.planingdate,this.remark);    
    this.onpatchValueClick(this.planingdate,this.remark)
    this.enquiryaddForm?.removeControl('planningDate'); 
    this.enquiryaddForm?.removeControl('remarks');  
    this.MainForm.patchValue({ createEnquiryDetailsDTO: this.createForm.value, createEnquiryDTO: this.enquiryaddForm.value })
    if(this.MainForm.valid)
    {
      debugger
    this.service.saveenquiry(this.MainForm?.value).subscribe((data:any)=>{
      if(data.statusCode==200){      
      this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 });
      this.route.navigateByUrl('/dashboard/enquirylist');
      }
      else{
        this.toastService.show(data.message,{classname: 'bg-danger text-light', delay: 15000});
      } 
    })   
  }
    // console.log(this.MainForm.value);
    
  }
  onpatchValueClick(date:any,remark:any)
  {
    this.createForm.patchValue({
      planningDate: date,
      remarks:remark
    });
  }
  viewlist(){
    this.route.navigateByUrl('/dashboard/enquirylist')
  }
}
