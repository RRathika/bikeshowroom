import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-enquirylist',
  templateUrl: './enquirylist.component.html',
  styleUrls: ['./enquirylist.component.css']
})
export class EnquirylistComponent implements OnInit {
  list: any;
  enquiryid: any;
  enquirydetailslist: any;
  result: any;
  enquiryDetailsId: any;
  flowcount: any;
  page = 1;
  pageSize = 4;
  collectionSize = 5;
  currentRate = 8;
  dataOnPage = 5;
  status: any;
  closedata:any;
  myData:any;
  enquiryStatus:any;
  constructor(private router: Router, private service: YamahaserviceService, private formbuilder: FormBuilder,public toastService:ToastServiceService) { }
  popupForm: FormGroup = this.formbuilder.group({
    enquiryId: [0],
    enquiryDetailsId: [0],
    planningDate: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });
  ngOnInit(): void {
    this.enquiry();
  }
  addshow() {
    this.router.navigate(['/dashboard/enquiryadd']);
  }
  enquiry() {
    this.service.getenquiry().subscribe(data => {
      this.list = data;
    })
  }
  popup(id: any) {
    this.enquiryDetailsId = '';
    this.enquiryid = id;
    this.enquirydetail(this.enquiryid);
  }
  enquirydetail(id: any) {
    this.service.getenquirydetailbyidall(id).subscribe((data: any) => {
      this.enquirydetailslist = data;
      //console.log(data[0].followCount);
      this.flowcount = data[0].followCount;
      this.status = data[2].statusName;
      this.enquiryStatus=data.enquiryClosingStatus;
    })
  }
  submit() {
    if (this.enquiryDetailsId) {
      console.log(this.enquiryDetailsId);
      this.popupForm.patchValue({
        enquiryDetailsId: this.enquiryDetailsId
      });
      this.service.updateenquirydetails(this.popupForm?.value).subscribe((data: any) => {
        if (data.statusCode == 200) {
          this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 });
          this.popupForm.reset();
          this.enquiryDetailsId = '';
          this.enquirydetail(this.enquiryid);
          this.enquiry();
        }
        else {
          this.toastService.show(data.message,{classname: 'bg-danger text-light', delay: 15000});
        }
      })

    }
    else {
      this.popupForm.patchValue({
        enquiryId: this.enquiryid
      });
      this.service.saveenquirydetails(this.popupForm?.value).subscribe((data:any) => {
        if (data.statusCode == 200) {
          this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 });
        this.popupForm.reset();
        this.enquirydetail(this.enquiryid);
        this.enquiry();
        }
        else{
          this.toastService.show(data.message,{classname: 'bg-danger text-light', delay: 15000});
        }
      })
    }
  }
  editdetails(detailid: any) {
    this.service.getenquirydetailbyid(detailid).subscribe(data => {
      this.service.enquirydetails.next(data);
    })
    this.service.enquirydetails.subscribe(data => {
      this.result = data;
      this.enquiryDetailsId = this.result.enquiryDetailsId;
      if (data) {
        this.popupForm.patchValue(data);
        let part = data.planningDate.split('T00:00:00');
        let parts = part[0];
        this.popupForm.patchValue({
          planningDate: parts
        })
      }
    });
  }
  clear() {
    this.popupForm.reset();
    this.enquiryDetailsId = '';
  }
  closealldata(){
    if(this.closedata!='')
    {
      this.myData = {  
        enquiryId: this.enquiryid,  
        status: this.closedata 
      };  
      this.service.updateenquiryclose(this.myData).subscribe(data=>{
        console.log("succes");        
      })  
    }    
  }
}
