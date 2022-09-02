import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-admin-validation',
  templateUrl: './modal-admin-validation.component.html',
  styleUrls: ['./modal-admin-validation.component.css']
})
export class ModalAdminValidationComponent implements OnInit {

  @Input() next_status!:string;

  constructor(public modal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
