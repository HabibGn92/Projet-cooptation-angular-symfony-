import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CooptedEntityService } from 'src/app/core/services/coopted-entity.service';

@Component({
  selector: 'app-information-coopte-form',
  templateUrl: './information-coopte-form.component.html',
  styleUrls: ['./information-coopte-form.component.css']
})
export class InformationCoopteFormComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Input() cooptationForm!: FormGroup;
  @Input() saveClicked: boolean = false;
  CooptedEntityTable!: any;
  DepartementTable!: any;
  @Input() poles: any;
  constructor( private CooptedEntityService: CooptedEntityService) { }

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


}
