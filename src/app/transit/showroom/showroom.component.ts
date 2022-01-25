import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css']
})
export class ShowroomComponent implements OnInit {
  showdata:any;
  constructor(private router:Router,private service:YamahaserviceService,private formbuilder:FormBuilder,public toastservice:ToastServiceService) { }
  showroomForm:FormGroup=this.formbuilder.group({
  showRoomName:new FormControl('',[Validators.required]),
  address: new FormControl('',[Validators.required]),
  mobileNo:new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
    this.loaddata();
  }
  loaddata(){
    this.service.getshowroom().subscribe(data=>{
      this.showdata=data;
    })
  }
  submit(){
    console.log(this.showroomForm.value);
    if(this.showroomForm.valid){
      this.service.saveshowroom(this.showroomForm.value).subscribe((data:any)=>{
       if(data.statusCode==200)
       {
        this.toastservice.show(data.message, { classname: 'bg-success text-light', delay: 10000 }); 
        this.showroomForm.reset();
       }
       else{
        this.toastservice.show(data.message, { classname: 'bg-danger text-light', delay: 15000 }); 
       }
      })
    }
  }
}
