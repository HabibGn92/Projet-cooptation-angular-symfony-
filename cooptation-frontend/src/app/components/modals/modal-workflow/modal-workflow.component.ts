import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CooptationService } from '../../../core/services/cooptation.service';

@Component({
  selector: 'app-modal-workflow',
  templateUrl: './modal-workflow.component.html',
  styleUrls: ['./modal-workflow.component.css']
})

export class ModalWorkflowComponent implements OnInit {

@Input()  id!: number;
  cooptationHistory!: any;
  colors = [{ status: "A soumettre", color: "grey" }, { status: "En attente de validation", color: " #006dbf" }, { status: "En cours d'évaluation", color: " #006dbf" }, { status: "En cours d'évaluation - RDV MNG 1", color: " #006dbf" }, { status: "En cours d'évaluation - RDV MNG 2", color: " #006dbf" }, 
            {status:"Rejeté | Cooptation incomplète", color:" rgb(221, 12, 12)"} ,  {status:"Rejeté | Non adapté à nos métiers", color:" rgb(221, 12, 12)"}, {status:"Négatif", color:" rgb(221, 12, 12)"}, {status:"Désistement en cours de process", color:"orange"}, {status:"Désistement après signature", color:"orange"},{status:"Désistement après proposition", color:"orange"
            }, { status:"Proposition signé", color  : "rgb(99, 196, 39)"}, { status: "Contrat signé", color: "rgb(99, 196, 39)" },  { status: "Embauché | PE à confirmer", color: "rgb(99, 196, 39)" },  { status: "Embauché | PE renouvelée confirmée", color: "rgb(99, 196, 39)" },  { status: "Embauché | PE confirmée", color: "rgb(99, 196, 39)" }, { status: "Vivier", color: "rgb(251, 232, 17)" }]
  a!:string;

  constructor(public modal: NgbActiveModal, private cooptationService: CooptationService) {
  }

  ngOnInit(): void {
  this.cooptationService.getCooptationHistory(this.id).subscribe((data) => {
  this.cooptationHistory = data
    })
  }
      

  getTheColor(a: string) {
       return this.colors.filter(item => item.status === a)[0].color     
  }
}
