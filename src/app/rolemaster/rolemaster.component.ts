import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastServiceService } from '../toast-service.service';
import { YamahaserviceService } from '../yamahaservice.service';

@Component({
  selector: 'app-rolemaster',
  templateUrl: './rolemaster.component.html',
  styleUrls: ['./rolemaster.component.css']
})
export class RolemasterComponent implements OnInit {
  roles: any;
  getid:any;
  result: any;
  roleId:any;
  submitted = false;
  displayadd:boolean=false;
  p: number = 1;
  count: number = 10;
  constructor(private service:YamahaserviceService,private formbuilder:FormBuilder,public toastService:ToastServiceService,private route:Router) {}
 
  ngOnInit(): void {
    this.getdata();  
  }
  getdata(){
   
    this.service.getrolemaster().subscribe(data=>{
      this.roles=data;
      console.log(this.roles);      
    })
  }
 
  click(id:any){
    this.getid=id;
  }
  edit(id:any){
    this.displayadd=true;    
    this.service.rolegetbyId(id).subscribe(data=>{
      this.service.rolemaster.next(data); 
      this.route.navigateByUrl('/dashboard/addrole')
    })
  
  }
  delete(id:any){
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
        this.service.deleterolemaster(id).subscribe(data=>{
          this.getdata()
        })        
      }
      else{
      console.log('cancel');
      }
    });  
  }
  display(){  
    this.route.navigateByUrl('/dashboard/addrole')
  }
  
}
