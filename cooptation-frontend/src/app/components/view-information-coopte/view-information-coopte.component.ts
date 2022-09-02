import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CooptedEntityService } from 'src/app/core/services/coopted-entity.service';
import { ExcelService } from 'src/app/core/services/excel.service';

@Component({
  selector: 'app-view-information-coopte',
  templateUrl: './view-information-coopte.component.html',
  styleUrls: ['./view-information-coopte.component.css']
})
export class ViewInformationCoopteComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Input() cooptationForm!: FormGroup;
  @Input() saveClicked: boolean = false;
  CooptedEntityTable!: any;
  DepartementTable!: any;
  @Input() poles: any;
  disabled =true ;
  constructor(private formBuilder: FormBuilder, private CooptedEntityService: CooptedEntityService,private excelService : ExcelService) { }

  ngOnInit(): void {
    this.OnCooptedEntity();
    this.OnDepartement();
  }
  OnCooptedEntity() {
    this.CooptedEntityService.getAllCooptedEntity().subscribe(data => { this.CooptedEntityTable = data });
  }


  OnDepartement() {
    this.CooptedEntityService.getAllDepartements().subscribe(data => { this.DepartementTable = data });

  }


  sendForm(value: boolean) {
    this.newItemEvent.emit(value);
  }

  OnSelect(Entity: any) {
    this.CooptedEntityService.getAllDepartements().subscribe((res: any) => {
      this.poles = res.filter((e: any) => e.coopted_entity?.id == Entity?.value)
    });
    this.newItemEvent.emit(true);
  }

  onEntityChange(event:any){
    console.log(event.target.value);
    return true;
  }
 
}
