import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cks-internal-project';
}
