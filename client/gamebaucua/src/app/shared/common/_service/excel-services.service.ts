import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as GC from '@grapecity/spread-sheets';
import '@grapecity/spread-sheets-charts';

import { saveAs } from 'file-saver';
import * as Excel from '@grapecity/spread-excelio';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelServicesService {

  private spread: GC.Spread.Sheets.Workbook;
  private excelIO;

  constructor() {
    this.excelIO = new Excel.IO();
  }

  getSpread() {
    return this.spread;
  }

  setSpread(data) {
    this.spread = data;
  }

  // Download Excel File
  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  // Upload File
  onFileChange(args) {
    // tslint:disable-next-line: one-variable-per-declaration
    const self = this,
      file = args.srcElement && args.srcElement.files && args.srcElement.files[0];
    if (this.getSpread() && file) {
      this.excelIO.open(file, (json) => {
        this.spread.fromJSON(json, {});
        setTimeout(() => {
          alert('load successfully');
        }, 0);
      }, (error) => {
        alert('load fail');
      });
    }
  }

  onExportExcel(args) {
    const filename = 'exportExcel.xlsx';
    const json = JSON.stringify(this.getSpread().toJSON());
    this.excelIO.save(json, function fn(blob) {
      saveAs(blob, filename);
    });
  }
}
