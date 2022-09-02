import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-reject',
  templateUrl: './modal-reject.component.html',
  styleUrls: ['./modal-reject.component.css']
})
export class ModalRejectComponent implements OnInit {

  constructor(public modal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
