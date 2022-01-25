import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehiclepurchase',
  templateUrl: './vehiclepurchase.component.html',
  styleUrls: ['./vehiclepurchase.component.css']
})
export class VehiclepurchaseComponent implements OnInit {
  vehiclepurchaseForm:any;
  isDisabled='true';
  constructor() { }

  ngOnInit(): void {
  }
  submit(){}
}
