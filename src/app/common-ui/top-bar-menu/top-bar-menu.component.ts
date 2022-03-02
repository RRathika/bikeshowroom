import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cks-top-bar-menu',
  templateUrl: './top-bar-menu.component.html',
  styleUrls: ['./top-bar-menu.component.css']
})
export class TopBarMenuComponent implements OnInit {
show:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.show=localStorage.getItem('RoleId');
  }

  logout(){
    localStorage.removeItem('UserCode');
    localStorage.removeItem('ShowRoomId');
    localStorage.removeItem('UserName');
    localStorage.removeItem('MacAddress');
    localStorage.removeItem('RoleId')
    this.router.navigateByUrl('');
  }
}
