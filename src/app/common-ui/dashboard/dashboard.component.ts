import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
// body:any;
  constructor() { }

  ngOnInit(): void {
    // this.body=document.getElementsByTagName('body')[0].className;
    // console.log(this.body);
  }

}
