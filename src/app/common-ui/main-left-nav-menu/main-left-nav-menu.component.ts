import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cks-main-left-nav-menu',
  templateUrl: './main-left-nav-menu.component.html',
  styleUrls: ['./main-left-nav-menu.component.css'],
})
export class MainLeftNavMenuComponent implements OnInit {
  userdata:any;
  masterclick:boolean=true;
  transclick:boolean=true;
  saleclick:boolean=true;
  stockclick:boolean=true;
  master:any;
  trans:any;
  sale:any;
  stock:any;
  constructor() {}

  ngOnInit(): void {
    this.userdata=localStorage.getItem('UserName');
  }
  openmaster(){
    console.log(this.masterclick);
    
    this.masterclick=!this.masterclick;
    if(this.masterclick==true)
    {
      this.master="menu-open";
    }
    if(this.masterclick==false)
    {
      this.master="";
    }
  }
  opentrans(){
    this.transclick=!this.transclick;
    if(this.transclick==true)
    {
      this.trans="menu-open"
    }   
    if(this.transclick==false)
    {
      this.trans="";
    } 
  }
  opensale(){
    this.saleclick=!this.saleclick;
    if(this.saleclick==true)
    {
      this.sale="menu-open"
    }    
    if(this.saleclick==false)
    {
      this.sale="";
    }
  }
  openstock(){
    this.stockclick=!this.stockclick;
    if(this.stockclick==true)
    {
      this.stock="menu-open"
    }    
    if(this.stockclick==false)
    {
      this.stock="";
    }
  }
}
