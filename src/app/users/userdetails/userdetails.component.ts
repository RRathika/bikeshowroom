import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YamahaserviceService } from 'src/app/yamahaservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  userdata:any;
   p: number = 1;
  count: number = 10;
  constructor(private router:Router,private service:YamahaserviceService) { }

  ngOnInit(): void {
    this.loaduser();  
  }
  loaduser(){
    this.service.getuserdetails().subscribe(data=>{
      this.userdata=data;
    })
  }
  add(){    
    this.service.user['_value']='';
    this.router.navigateByUrl('/dashboard/register');
  }
  viewbyid(id:any){
    this.service.getuserbyid(id).subscribe((data:any)=>{
      this.service.user.next(data);
      this.router.navigateByUrl('/dashboard/register');
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
        this.service.deleteuserdata(id).subscribe(data=>{
          this.loaduser()
        })        
      }
      else{
      console.log('cancel');
      }
    });  
  }

}
