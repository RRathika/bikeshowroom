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
    // this.refresh();
  }
  refresh(): void {
    // window.location.reload();
}
}
