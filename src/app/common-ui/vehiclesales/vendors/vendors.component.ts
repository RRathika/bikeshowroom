import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  vendor:any;
  constructor(private router:Router,private service:YamahaserviceService,public toastService: ToastServiceService ) { }

  ngOnInit(): void {
    this.getvendor();
  }
  getvendor(){
    this.service.getvendor().subscribe(data=>{
      this.vendor=data;      
    })
  }
  show(){
    this.router.navigate(['/dashboard/vendoradd']);
  }
  Editvendor(id:any){
    this.service.getbyidvendor(id).subscribe(data=>{     
      this.service.vendor.next(data);
      this.router.navigate(['/dashboard/vendoradd']);
  })
  }
  Delete(id:any){
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
        this.service.deletevendor(id).subscribe(data=>{
          this.getvendor();
        })
        console.log('delete');
      }
      else{
      console.log('cancel');
      }
    });
  
  }
}
