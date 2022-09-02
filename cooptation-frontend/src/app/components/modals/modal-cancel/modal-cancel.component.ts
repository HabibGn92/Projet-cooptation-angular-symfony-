import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-cancel',
  templateUrl: './modal-cancel.component.html',
  styleUrls: ['./modal-cancel.component.css']
})
export class ModalCancelComponent implements OnInit {

  constructor(public modal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
