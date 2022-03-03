import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  showdata: any;
  result: any;
  financeDetailId: any;
  p: number = 1;
  count: number = 10;
  submitted:boolean = false;
  displayadd:boolean=false;
  currentModel:number=1;
  constructor(private router: Router, private service: YamahaserviceService, private formbuilder: FormBuilder, public toastservice: ToastServiceService) { }
  financeForm: FormGroup = this.formbuilder.group({
    financeName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required]),
    financeDetailId: 0
  })

  ngOnInit(): void {
    this.loaddata();
   
  }

  loaddata() {
    this.service.getfinance().subscribe((data: any) => {
      this.showdata = data;
    })
  }
  submit() {
    if (this.financeDetailId) {
      if (this.financeForm.valid) {
        this.service.updateFinanceDetail(this.financeForm.value).subscribe((data: any) => {
          if (data.statusCode == 200) {
            this.toastservice.show(data.message, { classname: 'bg-success text-light', delay: 3000 });
            this.financeForm.reset();
            this.displayadd=false;
            this.loaddata();
          }
          else {
            this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 5000 });
          }
        })
      }
    }
    else {
      if (this.financeForm.valid) {
        this.service.saveFinanceDetail(this.financeForm.value).subscribe((data: any) => {
          if (data.statusCode == 200) {
            this.toastservice.show(data.message, { classname: 'bg-success text-light', delay: 3000 });
            this.financeForm.reset();
            this.displayadd=false;
            this.loaddata();
          }
          else {
            this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 5000 });
          }
        })
      }
    }
  }
  editFinance(id: any) {
    this.displayadd=true;
    this.service.getFinanceDetailById(id).subscribe(data => {
      this.service.finance.next(data);
      this.service.finance.subscribe(data => {
        this.result = data;
        this.financeDetailId = this.result.financeDetailId;
        if (data) {
          this.financeForm.patchValue(data);
        }
      })
    })
  }
  delete(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons.fire(
      {
        showCloseButton: true,
        title: 'Are you sure?',
        text: 'You want to delete this?',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        reverseButtons: false
      }
    ).then((result: any) => {
      if (result.value) {
        this.service.deleteFinanceDetail(id).subscribe(data => {
          this.loaddata();
          if (data.statusCode == 200) {
            this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 5000 });
          }
        })
      }
    });
  }
  display(){    
    this.displayadd=true;
    this.service.variant.next('');
    this.financeForm.reset();
    this.submitted=false;
  }
  listdisplay(){
    this.displayadd=false;
  }
}
