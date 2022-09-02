import { ExcelService } from './../../services/excel.service';
import { CooptationService } from '../../services/cooptation.service';
import { Component, OnInit, ViewChild, Type, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { ActivatedRoute, Router } from '@angular/router';
import { Columns } from './columns';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalWorkflowComponent } from 'src/app/components/modals/modal-workflow/modal-workflow.component';
import { ModalConfirmComponent } from '../../../components/modals/modal-confirm/modal-confirm.component'

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Suppression de la cooptation</h4>
      <button
        type="button"
        class="close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><strong>Êtes-vous sûr(e)?</strong></p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-danger"
        (click)="modal.dismiss('cancel click')"
      >
        Annuler
      </button>
      <button
        type="button"
        class="btn btn-success"
        (click)="modal.close('Ok click')"
      >
        Ok
      </button>
    </div>
  `,
})

export class NgbdModalConfirm {

  constructor(public modal: NgbActiveModal) { }

}



const MODALS: { [name: string]: Type<any> } = {
  delete: NgbdModalConfirm,
  workflow: ModalWorkflowComponent,
  
};
export interface StatutFilters {
  name: string;
  options: string[];
  defaultValue: string;
}

@Component({
  selector: 'app-cooptation-table',
  templateUrl: './cooptation-table.component.html',
  styleUrls: ['./cooptation-table.component.css'],
})
export class CooptationTableComponent implements OnInit {


  filterForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    status: new FormControl(),
    date: new FormControl()
  });

  cooptation!: any;
  displayedColumns: string[] = ['nom', 'prenom', 'date', 'statut', 'action'];
  status: string[] = ['Tous les statuts', 'A soumettre', 'En attente de validation', 'Rejeté | Cooptation incomplète', 'Rejeté | Non adapté à nos métiers', 'En cours d\'évaluation', 'Désistement en cours de process', 'Négatif', 'En cours d\'évaluation - RDV MNG 1', 'En cours d\'évaluation - RDV MNG 2', 'Vivier', 'Contrat signé','Proposition signé', 'Désistement après proposition', 'Désistement après signature', 'Embauché | PE à confirmer', 'Embauché | PE renouvelée confirmée', 'Embauché | PE confirmée'];
  statutFilters: StatutFilters[] = [];
  defaultValue = "Tous les statuts";
  cooptationHistory!: any;
  filterDictionary = new Map<string, string>();
  allCooptations: any;

  dataSourceFilters!: MatTableDataSource<Columns>;
  colors = [{ status: "A soumettre", color: "grey" }, { status: "En attente de validation", color: " #006dbf" }, { status: "En cours d'évaluation", color: " #006dbf" }, { status: "En cours d'évaluation - RDV MNG 1", color: " #006dbf" }, { status: "En cours d'évaluation - RDV MNG 2", color: " #006dbf" }, 
            {status:"Rejeté | Cooptation incomplète", color:" rgb(221, 12, 12)"} ,  {status:"Rejeté | Non adapté à nos métiers", color:" rgb(221, 12, 12)"}, {status:"Négatif", color:" rgb(221, 12, 12)"}, {status:"Désistement en cours de process", color:"orange"}, {status:"Désistement après signature", color:"orange"},{status:"Désistement après proposition", color:"orange"
  },  { status: "Contrat signé", color: "rgb(99, 196, 39)" },  { status: "Embauché | PE à confirmer", color: "rgb(99, 196, 39)" },  { status: "Embauché | PE renouvelée confirmée", color: "rgb(99, 196, 39)" },  { status: "Embauché | PE confirmée", color: "rgb(99, 196, 39)" }, { status: "Vivier", color: "rgb(251, 232, 17)" }]
    a!:string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  




  constructor(private cooptationService: CooptationService, private _modalService: NgbModal, private alertService: AlertService, private excelService: ExcelService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllCooptations();
    this.statutFilters.push({ name: 'Statut', options: this.status, defaultValue: this.defaultValue });

  }
 


  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
    (click)="modal.close('Ok click')">Ok</button>`;

  open(name: string, id: number) {
    
    if (name == "delete") {
      this._modalService.open(MODALS[name]).result.then((result => {
        if (result === 'Ok click') {
          this.onDeleteCooptation(id);
        }
      }), (reason => { }));
    }
    else if (name == "workflow") {
      const modalRef = this._modalService.open(MODALS[name])
      modalRef.componentInstance.id = id;
    
    }
  }


  applyCoopFilter(key: any) {
    this.filterDictionary.set(key, this.filterForm.get(key)?.value);
    let jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSourceFilters.filterPredicate = function (record, filter) {
      let map = new Map(JSON.parse(filter));
      let isMatch = false;
      for (let [key, value] of map) {
        let recordValue: any;
        if (key == "status") {
          recordValue = (record[key as keyof Columns] as any);
          isMatch = (value == "Tous les statuts" || recordValue.trim().toLowerCase().includes((value as String).trim().toLowerCase()))
        }
        if (key == "firstname") {
          recordValue = record['cooptation']['firstname'] as keyof Columns;
          isMatch = (value == "*" || recordValue.trim().toLowerCase().includes((value as String).trim().toLowerCase()))
        }

        if (key == "lastname") {
          recordValue = record['cooptation']['lastname'] as keyof Columns;
          isMatch = (value == "*" || recordValue.trim().toLowerCase().includes((value as String).trim().toLowerCase()))
        }

        if (key == 'date') {
          recordValue = new Date((record['cooptation']['date']) as keyof Columns);
          let dateValue: Date = new Date(value as string);
          dateValue.setDate(dateValue.getDate() + 1);
          recordValue.setUTCHours(0, 0, 0, 0);
          dateValue.setUTCHours(0, 0, 0, 0);

          isMatch = recordValue.getTime() === dateValue.getTime();
        }

        if (!isMatch) return false;
      }

      return isMatch;


    }
    this.dataSourceFilters.filter = jsonString;
  }

  compareDates(date1: Date, date2: Date) {
    //remove time
    date1.setUTCHours(0, 0, 0, 0);
    date2.setUTCHours(0, 0, 0, 0);

    return date1.getTime() === date2.getTime();
  }

  getAllCooptations() {
    this.cooptationService.getCooptation().subscribe((data: any) => {
      this.dataSourceFilters = new MatTableDataSource(data);
      this.allCooptations = data;
      this.dataSourceFilters.paginator = this.paginator;
      return data
    })
  }


  onDeleteCooptation(id: number) {
    this.cooptationService.deleteCooptations(id).subscribe((res: any) => {
      if (res === "deleted") {
        this.alertService.success('Cooptation supprimée');
        
      } else if (res === "cooptation not found") {
        this.alertService.danger("Cooptation inexistante !");
      }
      else if (res === "error") {
        this.alertService.warning('Impossible de supprimer !');
      }
      this.getAllCooptations();
    }
    ,()=>{
      this.alertService.danger("Veuillez réessayer ultérieurement");
    }
    );
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
      link.download = 'Cooptations.xlsx';
      link.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true, view: window })
      );
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();}, 100);
  }

  generateExcel() {
    this.excelService.exportfile().toPromise().then((response) => this.saveToFileSystem(response));
  }

  onViewEdit(id: number) {

    this.router.navigateByUrl(`cooptation/${id}`);

  }

  onSubmitCooptation(cooptation_id:number){
    this.cooptationService.changeStatus(cooptation_id,2).subscribe(() => {
      this.getAllCooptations();
      this.alertService.success('Cooptation soumise');
    });

  }

  getTheColor(a: string) {
       return this.colors.filter(item => item.status === a)[0].color 
      
}

OnSubmit(id :number){
  this._modalService.open(ModalConfirmComponent).result.then((result)=>{
    if (result=='Save'){
      this.onSubmitCooptation(id);
    }
  },(reason => { }))
}

}



