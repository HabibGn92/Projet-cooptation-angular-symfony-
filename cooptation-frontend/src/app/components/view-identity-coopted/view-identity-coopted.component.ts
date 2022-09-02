import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExcelService } from 'src/app/core/services/excel.service';
@Component({
  selector: 'app-view-identity-coopted',
  templateUrl: './view-identity-coopted.component.html',
  styleUrls: ['./view-identity-coopted.component.css']
})
export class ViewIdentityCooptedComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();
  @Output() ItemEvent = new EventEmitter<any>();
  @Input() angForm: FormGroup | any;
  @Input() saveClicked:boolean = false;
  @Input() FileName!:string;
  files = [];
  selectedFile!:any;
  Name!: any
 
  constructor(private excelService : ExcelService) { }

  ngOnInit(): void {}
  onCheckChange(event:any){
    this.ItemEvent.emit(event.value);
    }
  

  onFileSelected(event:any){
    this.newItemEvent.emit(event.target.files[0]);
    this.selectedFile = event.target.files[0];
    this.Name=(this.selectedFile).name
    this.files.push(this.Name as never);
  }
  downloadCV( filename :string){
    return this.excelService.downloadMyFile( filename)
  }
}
