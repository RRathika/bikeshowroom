import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  vendordata: any;
  result: any;
  vendorId: any;
  submitted: boolean = false;
  displayadd: boolean = false;
  p: number = 1;
  count: number = 10;
  constructor(private service: YamahaserviceService, private router: Router, private formBuilder: FormBuilder, public toastservice: ToastServiceService) { }
  vendorForm: FormGroup = this.formBuilder.group({
    vendorId: 0,
    companyName: new FormControl('', [Validators.required]),
    gstNo: new FormControl(''),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    place: new FormControl(''),
    pinCode: new FormControl('', Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$"))
  })

  ngOnInit(): void {
    this.loadVendor();
  }

  loadVendor() {
    this.service.getvendor().subscribe(data => {
      this.vendordata = data;
    })
  }

  editvendor(id: any) {
    this.displayadd = true;
    this.service.getbyidvendor(id).subscribe(data => {
      this.service.vendor.next(data);
      this.service.vendor.subscribe(data => {
        this.result = data;
        this.vendorId = this.result.vendorId;
        this.vendorForm.patchValue(data);
        if (this.vendorForm.value.pinCode == 0) {
          this.vendorForm.patchValue({ pinCode: '' })
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
    ).then((result) => {
      if (result.value) {
        this.service.deletevendor(id).subscribe(data => {
          this.loadVendor();
          console.log('delete');
        })
      }
      else {
        console.log('cancel');
      }
    });
  }

  submit() {
    this.submitted = true;
    if (this.vendorId) {
      if (this.vendorForm.valid) {
        if (this.vendorForm.value.pinCode == '' || this.vendorForm.value.pinCode == null) {
          this.vendorForm.patchValue({ pinCode: 0 })
        }
        if (this.vendorForm.value.place == '' || this.vendorForm.value.place == null) {
          this.vendorForm.patchValue({ place: '' })
        }
        if (this.vendorForm.value.gstNo == '' || this.vendorForm.value.gstNo == null) {
          this.vendorForm.patchValue({ gstNo: '' })
        }
        this.service.updatevendor(this.vendorForm.value).subscribe((data: any) => {
          if (data.statusCode == 200) {
            this.toastservice.show("Vendor Updated Successfully", { classname: 'bg-success text-light', delay: 5000 });
            this.vendorForm.reset();
            this.displayadd = false;
            this.loadVendor();
          }
          else {
            this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 5000 });
          }
        })
      }
    }
    else {
      if (this.vendorForm.valid) {
        if (this.vendorForm.value.pinCode == null) {
          this.vendorForm.patchValue({ pinCode: 0 })
        }
        if (this.vendorForm.value.place == null) {
          this.vendorForm.patchValue({ place: '' })
        }
        if (this.vendorForm.value.gstNo == null) {
          this.vendorForm.patchValue({ gstNo: '' })
        }
        this.service.savevendor(this.vendorForm.value).subscribe((data: any) => {
          if (data.statusCode == 200) {
            this.toastservice.show("Vendor Saved Successfully", { classname: 'bg-success text-light', delay: 5000 });
            this.vendorForm.reset();
            this.displayadd = false;
            this.loadVendor();
          }
          else {
            this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 5000 });
          }
        })
      }
    }
  }

  display() {
    this.displayadd = true;
    this.service.vendor.next('');
    this.vendorForm.reset();
    this.submitted = false;
  }

  listdisplay() {
    this.displayadd = false;
  }

}
