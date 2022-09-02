import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-validate',
  templateUrl: './modal-validate.component.html',
  styleUrls: ['./modal-validate.component.css']
})
export class ModalValidateComponent implements OnInit {

  constructor(public modal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
