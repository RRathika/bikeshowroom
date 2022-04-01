import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastServiceService } from 'src/app/toast-service.service';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  usercode: any;
  showroom: any;
  mac: any;
  roleid: any;
  constructor(private router: Router, private service: YamahaserviceService, private formbuilder: FormBuilder, private toastservice: ToastServiceService) { }
  loginForm: FormGroup = this.formbuilder.group({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    macAddress: new FormControl('')
  });
  ngOnInit(): void {
    this.macaddresss();
    localStorage.removeItem('UserCode');
    localStorage.removeItem('ShowRoomId');
    localStorage.removeItem('UserName');
    localStorage.removeItem('MacAddress');
    localStorage.removeItem('RoleId');
  }
  macaddresss() {
    this.service.getmacaddress().subscribe(data => {
      this.loginForm.patchValue({
        macAddress: data
      })
      // console.log(this.loginForm.value['macAddress']);       
    })
  }
  submit() {
    if (this.loginForm.valid) {

      // console.log(this.loginForm.value);      
      this.service.savelogin(this.loginForm.value).subscribe((data: any) => {
        // debugger
        if (data.statusCode == 400) {
          this.toastservice.show(data.message, { className: 'bg-danger text-light', delay: 5000 })
        }
        if (data.statusCode == 201) {
          this.toastservice.show(data.message, { className: 'bg-danger text-danger', delay: 5000 })
        }
        if (data.statusCode == 202) {
          this.toastservice.show(data.message, { className: 'bg-danger text-danger', delay: 5000 })
        }
        else {
          this.username = data.userName;
          this.usercode = data.userCode;
          this.showroom = data.showRoomId;
          this.mac = data.macAddress;
          this.roleid = data.roleId;
          localStorage.setItem('UserName', data.userName);
          localStorage.setItem('UserCode', data.userCode);
          localStorage.setItem('ShowRoomId', data.showRoomId);
          localStorage.setItem('MacAddress', data.macAddress);
          localStorage.setItem('RoleId', data.roleId);

          //  if(this.username == undefined && this.usercode == undefined && this.showroom == undefined && this.mac == undefined){
          if (this.username == '' && this.usercode == '' && this.showroom == '' && this.mac == '') {
            this.toastservice.show('Doesnot match your details', { className: 'bg-danger text-light', delay: 5000 });
          }
          // }
          else {
            // this.router.navigateByUrl('/dashboard');
            this.router.navigate(['/dashboard'])
              .then(() => {
                window.location.reload();
              });
          }
        }
      })
    }
    else {
      this.toastservice.show('Please Fill all Field', { className: 'bg-danger text-light', delay: 5000 })
    }

  }
}
