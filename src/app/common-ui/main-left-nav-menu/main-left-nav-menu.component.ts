import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cks-main-left-nav-menu',
  templateUrl: './main-left-nav-menu.component.html',
  styleUrls: ['./main-left-nav-menu.component.css'],
})
export class MainLeftNavMenuComponent implements OnInit {
  userdata:any;
  masterclick:boolean=false;
  transclick:boolean=false;
  saleclick:boolean=false;
  stockclick:boolean=false;
  master:any;
  trans:any;
  sale:any;
  stock:any;
  constructor() {}

  ngOnInit(): void {
    this.userdata=localStorage.getItem('UserName');
  }
  openmaster(){
    this.masterclick=!this.masterclick;
    if(this.masterclick==true)
    {
      this.master="menu-open";
    }
  }
  opentrans(){
    this.transclick=!this.transclick;
    if(this.transclick==true)
    {
      this.trans="menu-open"
    }    
  }
  opensale(){
    this.saleclick=!this.saleclick;
    if(this.saleclick==true)
    {
      this.sale="menu-open"
    }    
  }
  openstock(){
    this.stockclick=!this.stockclick;
    if(this.stockclick==true)
    {
      this.stock="menu-open"
    }    
  }
}
