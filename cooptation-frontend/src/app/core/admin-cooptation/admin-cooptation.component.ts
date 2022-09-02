import { ExcelService } from './../services/excel.service';
import { CooptationService } from '../services/cooptation.service';
import { Component, Input, OnInit, ViewChild, Type } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { Columns } from '../cooptation-list/cooptation-table/columns';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalAdminValidationComponent } from 'src/app/components/modals/modal-admin-validation/modal-admin-validation.component';
import { ModalWorkflowComponent } from 'src/app/components/modals/modal-workflow/modal-workflow.component';





const MODALS: { [name: string]: Type<any> } = {
  workflow: ModalWorkflowComponent
};

export interface StatutFilters {
  name: string;
  options: string[];
  defaultValue: string;
}

@Component({
  selector: 'app-admin-cooptation',
  templateUrl: './admin-cooptation.component.html',
  styleUrls: ['./admin-cooptation.component.css']
})
export class AdminCooptationComponent implements OnInit {

  filterForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    status: new FormControl(),
    date: new FormControl()
  });
  cooptation!: any;
  displayedColumns: string[] = ['nom', 'prenom', 'date', 'statut', 'action'];

  dataSource: MatTableDataSource<any>;
  status: string[] = ['Tous les statuts','Rejeté | Cooptation incomplète', 'Rejeté | Non adapté à nos métiers', 'En cours d\'évaluation', 'Désistement en cours de process', 'Négatif', 'En cours d\'évaluation - RDV MNG 1', 'En cours d\'évaluation - RDV MNG 2', 'Vivier', 'Contrat signé','Proposition signé', 'Désistement après proposition', 'Désistement après signature', 'Embauché | PE à confirmer', 'Embauché | PE renouvelée confirmée', 'Embauché | PE confirmée'];
  statutFilters: StatutFilters[] = [];
  defaultValue = "Tous les statuts";
  cooptationHistory!: any;
  filterDictionary = new Map<string, string>();
  allCooptations: any;

  dataSourceFilters!: MatTableDataSource<Columns>;

  colors = [{ status: "A soumettre", color: "grey" }, { status: "En attente de validation", color: " #006dbf" }, { status: "En cours d'évaluation", color: " #006dbf" }, { status: "En cours d'évaluation - RDV MNG 1", color: " #006dbf" }, { status: "En cours d'évaluation - RDV MNG 2", color: " #006dbf" }, 
            {status:"Rejeté | Cooptation incomplète", color:" rgb(221, 12, 12)"} ,  {status:"Rejeté | Non adapté à nos métiers", color:" rgb(221, 12, 12)"}, {status:"Négatif", color:" rgb(221, 12, 12)"}, {status:"Désistement en cours de process", color:"orange"}, {status:"Désistement après signature", color:"orange"},{status:"Désistement après proposition", color:"orange"
  }, { status:"Proposition signé", color  : "rgb(99, 196, 39)"}, { status: "Contrat signé", color: "rgb(99, 196, 39)" },  { status: "Embauché | PE à confirmer", color: "rgb(99, 196, 39)" },  { status: "Embauché | PE renouvelée confirmée", color: "rgb(99, 196, 39)" },  { status: "Embauché | PE confirmée", color: "rgb(99, 196, 39)" }, { status: "Vivier", color: "rgb(251, 232, 17)" }]
    statut!:string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor( private cooptationService:CooptationService, private _modalService: NgbModal,private alertService: AlertService ,private excelService : ExcelService, private router: Router) {
    
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {
    this.getCooptationByManager();
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (record,filter) {
      return record.nom.toLocaleLowerCase() == filter.toLocaleLowerCase();
    }
    this.statutFilters.push({ name: 'Statut', options: this.status, defaultValue: this.defaultValue });
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getCooptationByManager() { 
    this.cooptationService.getCooptationByManager().subscribe((data: any) => {
      this.dataSourceFilters = new MatTableDataSource(data);
      this.allCooptations = data;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort;
      this.dataSourceFilters.paginator = this.paginator;
      return data
      
    })}
    onDeleteCooptation(id: number) {
      this.cooptationService.deleteCooptations(id).subscribe((res:any)=> {
        if(res==="deleted"){
          this.alertService.success('cooptation supprimée avec sucèes');
        }else if(res==="cooptation not found") {
          this.alertService.danger("cooptation n'a pas toujours existé !");
        }
        else if(res==="error"){
          this.alertService.warning('impossible de supprimer !');
        }
        this.getCooptationByManager();
      }
      );
    }

    withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
    (click)="modal.close('Ok click')">Ok</button>`;
  

    onChangeStatusClick(cooptation_id:number,status_id:string,status:string){
      const modalRef = this._modalService.open(ModalAdminValidationComponent);
      modalRef.componentInstance.next_status = status;
      modalRef.result.then((result => {
        if (result === 'valider') {
          this.cooptationService.changeStatus(cooptation_id,parseInt(status_id)).subscribe(()=>{
            this.alertService.success('Cooptation mise à jour');
            this.getCooptationByManager();
          });
        }
      }), (reason => { }));
    }

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
        modalRef.componentInstance.id = id
        modalRef.result.then((result => {
          if (result) {
          }
        }), (reason => {}));
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
          recordValue = record['cooptation']['status'] as keyof Columns;
          isMatch = (value == "Tous les statuts" || recordValue.trim().toLowerCase().includes((value as String).trim().toLowerCase()))
        }
        if (key == "firstname") {
          recordValue = record['cooptation']['firstname'] as keyof Columns;
          isMatch = (value == "firstname" || recordValue.trim().toLowerCase().includes((value as String).trim().toLowerCase()))
        }
        if (key == "lastname") {
          recordValue = record['cooptation']['lastname'] as keyof Columns;
          isMatch = (value == "lastname" || recordValue.trim().toLowerCase().includes((value as String).trim().toLowerCase()))
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
      link.download = 'CooptationARevoir.xlsx';
      link.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true, view: window })
      );
      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();}, 100);
    }
  
    generateExcelAdmin() {
      this.excelService.exportfilemanager().toPromise().then((response) => this.saveToFileSystem(response));
    }


    getTheColor(statut: string) {
          return this.colors.filter(x => x.status === statut)[0].color 
        
    }

    downloadCV( filename :string){
      return this.excelService.downloadMyFile( filename)
    }

ViewCoop(id: number) {
  this.router.navigateByUrl(`cooptation/view/${id}`);

}

}
