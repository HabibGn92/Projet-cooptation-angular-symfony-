import { ExcelService } from './../../services/excel.service';
import { Component, OnInit,  } from '@angular/core';
import { Observable } from 'rxjs';
import { CooptationService } from '../../../core/services/cooptation.service';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {
 type ="all";
 pole$!:Observable<any[]>
  constructor(private cooptationService:CooptationService, private excelService : ExcelService) { }

  ngOnInit(): void {

    this.pole$=this.cooptationService.getUserPole();
  }
  changeType(type :string){
  this.type=type  
  }

  saveToFileSystem(response: BlobPart) {
    let newBlob = new Blob([response], {
      type: 'application/vnd.ms-excel;charset=utf-8',
    });
    const nav = window.navigator as any;
    if (window.navigator && nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(newBlob);
      return;
    }
    let data = window.URL.createObjectURL(newBlob);
    let link = document.createElement('a');
    link.href = data;
    if (this.type == "all"){  
      link.download = 'ToutesCooptations.xlsx';}
      else{
      link.download = 'CooptationsAValider.xlsx';
      }
    link.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true, view: window })
    );
    setTimeout(function () {
      window.URL.revokeObjectURL(data);
      link.remove();}, 100);
  }

  exportBoth(){
    let call ;
    if (this.type == "all"){
      call= this.excelService.exportStatusMang()
    }
   else {
    call = this.excelService.exportfilemanager()
   } 
   call.toPromise().then((response) => this.saveToFileSystem(response));
  }
}
