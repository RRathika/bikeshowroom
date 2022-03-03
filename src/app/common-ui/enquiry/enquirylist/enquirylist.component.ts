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
  closedata :any='';
  myData:any;
  enquiryStatus:any;
  showroom: any;
  roleid: any;
  showdata:any;
  submitted:boolean=false;
  p: number = 1;
  count: number = 10;
  constructor(private router: Router, private service: YamahaserviceService, private formbuilder: FormBuilder,public toastService:ToastServiceService) { }
  popupForm: FormGroup = this.formbuilder.group({
    enquiryId: [0],
    enquiryDetailsId: [0],
    planningDate: new FormControl('', [Validators.required]),
    remarks: new FormControl('', [Validators.required])
  });
  ngOnInit(): void {
    this.showroom=localStorage.getItem('ShowRoomId');
    this.roleid=localStorage.getItem('RoleId')
    this.enquiry();
    this.showroomdata();
  }
  showroomdata(){
    this.service.getshowroom().subscribe(data=>{
      this.showdata=data;
    })
  }
  showroomchange(e:any){
    let name=e.target.value;
    this.service.getenquiry(this.roleid,name).subscribe(data=>{
      if(data.statusCode==200)
      {
        // this.toastService.show(data.message,{classname:'bg-success text-light', delay: 3000})
        this.list='';
      }
      else
      {
      this.list=data;
    }
    })
  }
  addshow() {
    this.router.navigate(['/dashboard/enquiryadd']);
  }
  enquiry() {
    this.service.getenquiry(this.roleid,this.showroom).subscribe(data => {
      this.list = data;
    })
  }
  popup(id: any) {
    this.enquiryDetailsId = '';
    this.enquiryid = id;    
    this.enquirydetail(this.enquiryid);
  }
  enquirydetail(id: any) {    
    console.log(this.service.enquirydetails['_value']='');
    this.popupForm.reset();
    this.service.getenquirydetailbyidall(id).subscribe((data: any) => {
      if(data.statusCode==200)
      {
        this.enquirydetailslist=''; 
      }
      else{
      this.enquirydetailslist = data;
      this.flowcount=data[0].isActive;    
      } 
    })
  }
  submit() { 
    this.submitted=true;   
    if (this.enquiryDetailsId) {
      console.log(this.enquiryDetailsId);
      this.popupForm.patchValue({
        enquiryDetailsId: this.enquiryDetailsId
      });
      
      if(this.popupForm.valid)
      {  
      this.service.updateenquirydetails(this.popupForm?.value).subscribe((data: any) => {
        if (data.statusCode == 200) {
          this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 3000 });
          this.popupForm.reset();
          this.enquiryDetailsId = '';
          this.enquirydetail(this.enquiryid);
          this.enquiry();
        }
        else {
          this.toastService.show(data.message,{classname: 'bg-danger text-light', delay: 5000});
        }
      })
    }
    }
    else {
      this.popupForm.patchValue({
        enquiryId: this.enquiryid
      });
      if(this.popupForm.valid){
      this.service.saveenquirydetails(this.popupForm?.value).subscribe((data:any) => {
        if (data.statusCode == 200) {
          this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 3000 });
        this.popupForm.reset();
        this.enquirydetail(this.enquiryid);
        this.enquiry();
        }
        else{
          this.toastService.show(data.message,{classname: 'bg-danger text-light', delay: 5000});
        }
      })
    }
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
        console.log(data);        
        let part = data.planningDate.split('T00:00:00');
        let parts = part[0];
        this.popupForm.patchValue({
          planningDate: parts,
           remarks:this.result.remarks
        })
      }
    });
  }
  clear() {
    this.popupForm.reset();
    this.enquiryDetailsId = '';
  }
  closealldata(){
    if(this.closedata==1 || this.closedata==2)
    {
      console.log(this.closedata);
      this.myData = {  
        enquiryId: this.enquiryid,  
        status: this.closedata 
      };  
      this.service.updateenquiryclose(this.myData).subscribe((data:any)=>{
        if (data.statusCode == 200) {   
          // this.enquirydetail(this.enquiryid);      
          this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 3000 });          
        } 
        else{
          this.toastService.show(data.message,{classname: 'bg-danger text-light', delay: 5000});
        }    
      })  
    }
    else
    {
      this.toastService.show('Please Select the reson for enquiry closing',{classname: 'bg-danger text-light', delay: 5000});
    }    
  }
}
