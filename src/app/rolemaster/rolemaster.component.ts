import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private service:YamahaserviceService,private formbuilder:FormBuilder,public toastService:ToastServiceService) { }
  roleForm:FormGroup=this.formbuilder.group({
    roleId:0,
    role:new FormControl('',[Validators.required])  
  })
  ngOnInit(): void {
    this.getdata();
    this.service.rolemaster.subscribe(data=>{
      this.result=data; 
      this.roleId=this.result.roleId;
      if(data){        
        this.roleForm.patchValue(data);
      }
    })
  }
  getdata(){
    this.service.getrolemaster().subscribe(data=>{
      this.roles=data;
      console.log(this.roles);      
    })
  }
  submit(){
    if(this.roleId)
    {
      this.service.updaterolemaster(this.roleForm.value).subscribe((data:any)=>{ 
        if(data.statusCode==200)
        {
          this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
          this.roleForm.reset();
          this.getdata(); 
        } 
         else{
          this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 });
         }   
      })
    }
    else{
    this.service.saverolemaster(this.roleForm.value).subscribe((data:any)=>{ 
      if(data.statusCode==200)
      {
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
        this.roleForm.reset();
        this.getdata(); 
      } 
       else{
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 });
       }   
    })
  }
  }
  click(id:any){
    this.getid=id;
  }
  edit(id:any){
    this.service.rolegetbyId(id).subscribe(data=>{
      this.service.rolemaster.next(data);
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
}
