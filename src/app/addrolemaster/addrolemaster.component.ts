import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from '../toast-service.service';
import { YamahaserviceService } from '../yamahaservice.service';

@Component({
  selector: 'app-addrolemaster',
  templateUrl: './addrolemaster.component.html',
  styleUrls: ['./addrolemaster.component.css']
})
export class AddrolemasterComponent implements OnInit {
  roles: any;
  getid:any;
  result: any;
  roleId:any;
  submitted = false;
  displayadd:boolean=false;
  constructor(private service:YamahaserviceService,private formbuilder:FormBuilder,public toastService:ToastServiceService,private route:Router) { }

  roleForm:FormGroup=this.formbuilder.group({
    roleId:0,
    role:new FormControl('',[Validators.required])  
  })
  ngOnInit(): void {
    this.service.rolemaster.subscribe(data=>{
      this.result=data; 
      this.roleId=this.result.roleId;
      if(data){        
        this.roleForm.patchValue(data);
      }
    })
  }
  listdisplay(){
    this.route.navigateByUrl('/dashboard/rolemaster');
  }
  submit(){
    this.submitted = true;
    if(this.roleId)
    {
      if(this.roleForm.valid){
      this.service.updaterolemaster(this.roleForm.value).subscribe((data:any)=>{ 
        if(data.statusCode==200)
        {
          this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
          this.roleForm.reset();
          this.route.navigateByUrl('/dashboard/rolemaster'); 
        } 
         else{
          this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 });
         }   
      })
    }    
    }
    else{
    if(this.roleForm.valid){
    this.service.saverolemaster(this.roleForm.value).subscribe((data:any)=>{ 
      if(data.statusCode==200)
      {
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
        this.roleForm.reset();
      } 
       else{
        this.toastService.show(data.message, { classname: 'bg-danger text-light', delay: 15000 });
       }   
    })
  }  
  }
  }

}
