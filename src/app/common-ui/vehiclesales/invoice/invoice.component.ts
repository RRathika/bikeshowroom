import { Component, OnInit } from '@angular/core';
import { YamahaserviceService } from 'src/app/yamahaservice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private service:YamahaserviceService) { }

  ngOnInit(): void {
    this.service.printvalue.subscribe(data=>{
      console.log(data);
      
    })
    // window.print()
  }

}
