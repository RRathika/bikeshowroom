import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cks-main-left-nav-menu',
  templateUrl: './main-left-nav-menu.component.html',
  styleUrls: ['./main-left-nav-menu.component.css'],
})
export class MainLeftNavMenuComponent implements OnInit {
  userdata:any;
  constructor() {}

  ngOnInit(): void {
    this.userdata=localStorage.getItem('UserName');
  }
}
